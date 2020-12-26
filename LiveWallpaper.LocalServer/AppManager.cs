﻿using Common.Helpers;
using Giantapp.LiveWallpaper.Engine;
using LiveWallpaper.LocalServer.Models;
using LiveWallpaper.LocalServer.Utils;
using System;
using System.IO;
using System.Reflection;
using System.Threading.Tasks;

namespace LiveWallpaper.LocalServer
{
    public class AppManager
    {
        private static readonly NLog.Logger logger = NLog.LogManager.GetCurrentClassLogger();
        private static string _runningDataFilePath;
        private static string _userSettingFilePath;
        private static IStartupManager _startupManager = null;

        public static string FFmpegSaveDir
        {
            get
            {
                string distDir = Path.Combine(UserSetting.General.ThirdpartToolsDir, "FFmpeg");
                return distDir;
            }
        }

        private static FileDownloader _FFMpegDownloader = null;
        public static FileDownloader FFMpegDownloader
        {
            get
            {
                if (_FFMpegDownloader == null)
                {
                    _FFMpegDownloader = new FileDownloader
                    {
                        DistDir = FFmpegSaveDir
                    };
                }

                return _FFMpegDownloader;
            }
        }

        #region properties
        public const string AppName = "LiveWallpaper";
        public static string AppDataDir { get; private set; }
        public static RunningData RunningData { get; private set; }
        public static UserSetting UserSetting { get; private set; }
        public static bool Initialized { get; private set; }
        #endregion

        public static async Task Initialize(int hostPort)
        {
            //MyDocuments这个路径不会虚拟化，方便从Dart端读取
            _runningDataFilePath = $"{Environment.GetFolderPath(Environment.SpecialFolder.MyDocuments)}\\{AppName}\\runningData.json";
            _userSettingFilePath = $"{Environment.GetFolderPath(Environment.SpecialFolder.LocalApplicationData)}\\{AppName}\\Config\\userSetting.json";

            try
            {
                //应用程序数据
                RunningData = await JsonHelper.JsonDeserializeFromFileAsync<RunningData>(_runningDataFilePath);
                if (RunningData == null)
                {
                    //生成默认运行数据
                    RunningData = new RunningData();
                }
                //更新端口号
                RunningData.HostPort = hostPort;
                await JsonHelper.JsonSerializeAsync(RunningData, _runningDataFilePath);

                await LoadUserSetting();
                //开机启动
                DesktopBridge.Helpers helpers = new DesktopBridge.Helpers();
                if (helpers.IsRunningAsUwp())
                    _startupManager = new DesktopBridgeStartupManager(AppName);
                else
                {
                    string path = Assembly.GetEntryAssembly().Location.Replace(".dll", ".exe");
                    _startupManager = new DesktopStartupHelper(AppName, path);
                }

                var result = await WallpaperApi.SetOptions(UserSetting.Wallpaper);
            }
            catch (Exception ex)
            {
                logger.Error($"WallpaperStore constructor Ex:{ex}");
            }
            finally
            {
                Initialized = true;
            }
        }

        public static async Task WaitInitialized()
        {
            while (!Initialized)
                await Task.Delay(1000);
        }

        internal static async Task LoadUserSetting()
        {
            UserSetting = await JsonHelper.JsonDeserializeFromFileAsync<UserSetting>(_userSettingFilePath);
            if (UserSetting == null)
                UserSetting = new UserSetting();
            UserSetting.Wallpaper.FixScreenOptions();
        }

        internal static async Task SaveUserSetting(UserSetting setting)
        {
            try
            {
                await _startupManager.Set(setting.General.StartWithSystem);
                await JsonHelper.JsonSerializeAsync(setting, _userSettingFilePath);
                //更细内存对象
                UserSetting = setting;
                //检查开机启动
                if (setting?.General?.StartWithSystem != null)
                    setting.General.StartWithSystem = await _startupManager.Check();

                if (_FFMpegDownloader != null)
                {
                    _FFMpegDownloader.DistDir = FFmpegSaveDir;
                }
            }
            catch (Exception ex)
            {
                System.Diagnostics.Debug.WriteLine(ex);
            }
        }


    }
}
