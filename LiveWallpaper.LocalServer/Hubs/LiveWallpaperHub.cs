﻿using Giantapp.LiveWallpaper.Engine;
using Giantapp.LiveWallpaper.Engine.Renders;
using LiveWallpaper.LocalServer.Models;
using LiveWallpaper.LocalServer.Utils;
using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using Windows.Storage;
using Xabe.FFmpeg;
using Xabe.FFmpeg.Exceptions;
using static LiveWallpaper.LocalServer.Utils.FileDownloader;

namespace LiveWallpaper.LocalServer.Hubs
{
    public class LiveWallpaperHub : Hub
    {
        readonly HubEventEmitter _hubEventEmitter;

        //string _lastConnectionId;
        //private RaiseLimiter _lastSetupPlayerRaiseLimiter = new RaiseLimiter();

        public LiveWallpaperHub(HubEventEmitter hubEventEmitter)
        {
            _hubEventEmitter = hubEventEmitter;
        }

        public async Task<BaseApiResult<List<WallpaperModel>>> GetWallpapers()
        {
            await AppManager.WaitInitialized();
            var result = await WallpaperApi.GetWallpapers(AppManager.UserSetting.Wallpaper.WallpaperSaveDir);
            return result;
        }

        public async Task<BaseApiResult<List<string>>> GetThumbnails(string videoPath)
        {
            if (string.IsNullOrEmpty(videoPath))
                return BaseApiResult<List<string>>.ErrorState(ErrorType.Failed, "path cannot be null");
            try
            {
                //FFmpeg.SetExecutablesPath(AppManager.FFmpegSaveDir);
                List<string> result = new List<string>();
                //最多截图四张截图
                for (int i = 1; i < 5; i++)
                {
                    string name = videoPath.GetHashCode().ToString();
                    int seconds = i * i + 5;
                    string distPath = Path.GetTempPath() + $"{name}_{seconds}.png";
                    if (!File.Exists(distPath))
                    {
                        var mediaInfo = await FFmpeg.GetMediaInfo(videoPath);
                        //秒超过总长度
                        if (seconds > mediaInfo.Duration.TotalSeconds)
                            break;
                        IConversion conversion = await FFmpeg.Conversions.FromSnippet.Snapshot(videoPath, distPath, TimeSpan.FromSeconds(seconds));
                        _ = await conversion.Start();
                    }

                    result.Add(WebUtility.UrlEncode(distPath));
                }

                return BaseApiResult<List<string>>.SuccessState(result);
            }
            catch (FFmpegNotFoundException)
            {
                return BaseApiResult<List<string>>.ErrorState(ErrorType.NoFFmpeg);
            }
            catch (Exception ex)
            {
                return BaseApiResult<List<string>>.ExceptionState(ex);
            }
        }

        public async Task<BaseApiResult<WallpaperModel>> ShowWallpaper(string path)
        {
            var model = await WallpaperApi.ShowWallpaper(path);
            await AppManager.SaveCurrentWalpapers();
            return model;
        }
        public async Task<BaseApiResult> ExploreFile(string path)
        {
            try
            {
                var appData = Environment.GetFolderPath(Environment.SpecialFolder.LocalApplicationData);

                //uwp 真实存储路径不一样
                //https://stackoverflow.com/questions/48849076/uwp-app-does-not-copy-file-to-appdata-folder
                if (path.Contains(appData))
                {
                    string realAppData = Path.Combine(ApplicationData.Current.LocalCacheFolder.Path, "Local");
                    path = path.Replace(appData, realAppData);
                }
                await Task.Run(() => Process.Start("Explorer.exe", $" /select, {path}"));
            }
            catch (Exception ex)
            {
                return BaseApiResult.ExceptionState(ex);
            }
            return BaseApiResult.SuccessState();
        }

        //public BaseApiResult SetupPlayerByPath(string wallpaperPath, string customDownloadUrl)
        //{
        //    var wpType = WallpaperApi.GetWallpaperType(wallpaperPath);
        //    return SetupPlayer(wpType, customDownloadUrl);
        //}

        public BaseApiResult SetupFFmpeg(string url)
        {
            if (AppManager.FFMpegDownloader.IsBusy)
                return BaseApiResult.BusyState();

            AppManager.FFMpegDownloader.PrgoressEvent += FileDownloader_SetupFFmpegPrgoressEvent;
            return AppManager.FFMpegDownloader.SetupFile(url);
        }

        private async void FileDownloader_SetupFFmpegPrgoressEvent(object sender, FileDownloader.ProgressArgs e)
        {
            var client = _hubEventEmitter.AllClient();

            await client.SendAsync("SetupFFmpegProgressChanged", new { e.Completed, e.Total, e.Percent, e.TypeStr, e.Successed });

            if (e.Type == ProgressArgs.ActionType.Completed)
            {
                AppManager.FFMpegDownloader.PrgoressEvent -= FileDownloader_SetupFFmpegPrgoressEvent;
            }
        }

        public Task<BaseApiResult> StopSetupFFmpeg()
        {
            return AppManager.FFMpegDownloader.StopSetupFile();
        }

        public BaseApiResult SetupPlayer(WallpaperType wpType, string url)
        {
            if (string.IsNullOrEmpty(url))
                return BaseApiResult.ErrorState(ErrorType.Failed, "The parameter cannot be null");

            if (AppManager.PlayerDownloader.IsBusy)
                return BaseApiResult.BusyState();

            AppManager.PlayerDownloader.PrgoressEvent += PlayerDownloader_PrgoressEvent;
            string folder = null;
            switch (wpType)
            {
                case WallpaperType.Video:
                    folder = VideoRender.PlayerFolderName;
                    break;
            }
            AppManager.PlayerDownloader.DistDir = Path.Combine(AppManager.UserSetting.Wallpaper.ExternalPlayerFolder, folder);
            return AppManager.PlayerDownloader.SetupFile(url);
        }

        private async void PlayerDownloader_PrgoressEvent(object sender, ProgressArgs e)
        {
            var client = _hubEventEmitter.AllClient();

            await client.SendAsync("SetupPlayerProgressChanged", new { e.Completed, e.Total, e.Percent, e.TypeStr, e.Successed });

            if (e.Type == ProgressArgs.ActionType.Completed)
            {
                AppManager.PlayerDownloader.PrgoressEvent -= PlayerDownloader_PrgoressEvent;
            }
        }

        public Task<BaseApiResult> StopSetupPlayer()
        {
            return AppManager.PlayerDownloader.StopSetupFile();
        }
        //public BaseApiResult SetupPlayer(WallpaperType wpType, string customDownloadUrl)
        //{
        //    string url = customDownloadUrl;
        //    if (string.IsNullOrEmpty(url))
        //        url = WallpaperApi.PlayerUrls.FirstOrDefault(m => m.Type == wpType).DownloadUrl;

        //    void WallpaperManager_SetupPlayerProgressChangedEvent(object sender, SetupPlayerProgressChangedArgs e)
        //    {
        //        _lastSetupPlayerRaiseLimiter.Execute(async () =>
        //        {
        //            try
        //            {
        //                System.Diagnostics.Debug.WriteLine($"{e.ProgressPercentage} {e.ActionType}");
        //                //向所有客户端推送，刷新后也能显示
        //                var client = _hubEventEmitter.AllClient();
        //                await client.SendAsync("SetupPlayerProgressChanged", e);
        //            }
        //            catch (Exception ex)
        //            {
        //                System.Diagnostics.Debug.WriteLine(ex);
        //            }
        //        }, 1000);
        //    }

        //    _lastSetupPlayerRaiseLimiter = new RaiseLimiter();
        //    WallpaperApi.SetupPlayerProgressChangedEvent -= WallpaperManager_SetupPlayerProgressChangedEvent;
        //    WallpaperApi.SetupPlayerProgressChangedEvent += WallpaperManager_SetupPlayerProgressChangedEvent;
        //    var result = WallpaperApi.SetupPlayer(wpType, url, (async _ =>
        //    {
        //        //设置完成
        //        await _lastSetupPlayerRaiseLimiter.WaitExit();
        //        WallpaperApi.SetupPlayerProgressChangedEvent -= WallpaperManager_SetupPlayerProgressChangedEvent;
        //    }));

        //    return result;
        //}

        //public Task<BaseApiResult> StopSetupPlayer()
        //{
        //    return WallpaperApi.StopSetupPlayer();
        //}

        public async Task<BaseApiResult<UserSetting>> GetUserSetting()
        {
            await AppManager.WaitInitialized();
            await AppManager.LoadUserSetting();
            return new BaseApiResult<UserSetting>()
            {
                Ok = true,
                Data = AppManager.UserSetting
            };
        }

        public async Task<BaseApiResult> SetUserSetting(UserSetting setting)
        {
            await AppManager.WaitInitialized();
            try
            {
                var result = await WallpaperApi.SetOptions(setting.Wallpaper);
                //成功设置后保存，防止有异常导致启动崩溃
                await AppManager.SaveUserSetting(setting);
                return result;
            }
            catch (Exception ex)
            {
                return BaseApiResult.ExceptionState(ex);
            }
        }

        public async Task<BaseApiResult<RunningData>> GetRunningData()
        {
            await AppManager.WaitInitialized();
            return new BaseApiResult<RunningData>()
            {
                Ok = true,
                Data = AppManager.RunningData
            };
        }
        public async Task<BaseApiResult<string>> GetDraftDir()
        {
            string lastDraftPath = AppManager.RunningData.LastDraftPath;
            if (!string.IsNullOrEmpty(lastDraftPath))
            {
                string projectPath = Path.Combine(lastDraftPath, "project.json");
                if (!File.Exists(projectPath) && Directory.Exists(lastDraftPath))
                {
                    await Task.Run(() =>
                    {
                        var files = Directory.GetFiles(lastDraftPath);
                        foreach (var file in files)
                        {
                            try
                            {
                                //删除老文件
                                File.Delete(file);
                            }
                            catch (Exception ex)
                            {
                                Debug.WriteLine(ex);
                                continue;
                            }
                        }
                    });
                    //返回上一次的临时目录，防止创建太多无用目录
                    return BaseApiResult<string>.SuccessState(lastDraftPath);
                }
            }

            var r = WallpaperApi.GetDraftDir(AppManager.UserSetting.Wallpaper.WallpaperSaveDir);
            AppManager.RunningData.LastDraftPath = r;
            await AppManager.SaveRunningData(AppManager.RunningData);

            return BaseApiResult<string>.SuccessState(r);
        }
        public async Task<BaseApiResult> UpdateProjectInfo(string destDir, WallpaperProjectInfo info)
        {
            try
            {
                await WallpaperApi.UpdateProjectInfo(destDir, info);
                return BaseApiResult.SuccessState();
            }
            catch (Exception ex)
            {
                return BaseApiResult.ExceptionState(ex);
            }
        }
        //删除整个壁纸目录
        public async Task<BaseApiResult> DeleteWallpaper(string path)
        {
            string dir = Path.GetDirectoryName(path);
            //不能删除非壁纸目录的文件
            if (!dir.Contains(AppManager.UserSetting.Wallpaper.WallpaperSaveDir))
                return BaseApiResult.ErrorState(ErrorType.Failed);
            return await WallpaperApi.DeleteWallpaper(path);
        }
        //删除特定文件
        public async Task<BaseApiResult> DeleteFile(string path)
        {
            string dir = Path.GetDirectoryName(path);
            //不能删除非壁纸目录的文件
            if (!dir.Contains(AppManager.UserSetting.Wallpaper.WallpaperSaveDir))
                return BaseApiResult.ErrorState(ErrorType.Failed);

            try
            {
                await Task.Run(() =>
                {
                    if (File.Exists(path))
                        File.Delete(path);
                });

                return BaseApiResult.SuccessState();

            }
            catch (Exception ex)
            {
                return BaseApiResult.ExceptionState(ex);
            }
        }
    }
}
