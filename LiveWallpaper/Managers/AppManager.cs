﻿using Caliburn.Micro;
using DZY.Util.Common.Helpers;
using DZY.Util.WPF.ViewModels;
using DZY.Util.WPF.Views;
using Hardcodet.Wpf.TaskbarNotification;
using JsonConfiger;
using LiveWallpaper.Settings;
using LiveWallpaper.WallpaperManagers;
using MultiLanguageForXAML;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Reflection;
using System.Threading;
using System.Threading.Tasks;
using System.Windows;
using Windows.Storage;
using LiveWallpaperEngineAPI;
using LiveWallpaperEngine;

namespace LiveWallpaper.Managers
{
    public class AppManager
    {
        private static readonly NLog.Logger logger = NLog.LogManager.GetCurrentClassLogger();
        private static DesktopBridgeStartupManager _desktopBridgeStartupManager = null;

        /// <summary>
        /// 默认配置
        /// </summary>
        public static string SettingDefaultFile { get; private set; }

        /// <summary>
        /// 配置描述文件
        /// </summary>
        public static string SettingDescFile { get; private set; }

        /// <summary>
        /// 程序入口目录
        /// </summary>
        public static string ApptEntryDir { get; private set; }
        /// <summary>
        /// 配置文件地址
        /// </summary>
        public static string SettingPath { get; private set; }
        /// <summary>
        /// 应用程序数据
        /// </summary>
        public static string AppDataPath { get; private set; }
        /// <summary>
        /// 注册数据
        /// </summary>
        public static string PurchaseDataPath { get; private set; }
        /// <summary>
        /// 数据保存目录
        /// </summary>
        public static string AppDataDir { get; private set; }
        /// <summary>
        /// UWP真实AppDatam目录
        /// </summary>
        private static string _UWPRealAppDataDir;
        public static string UWPRealAppDataDir
        {
            get
            {
                DesktopBridge.Helpers helpers = new DesktopBridge.Helpers();
                if (!helpers.IsRunningAsUwp())
                    return null;

                if (string.IsNullOrEmpty(_UWPRealAppDataDir))
                {
                    //使用时再读取，防止初始化等待太久
                    _UWPRealAppDataDir = Path.Combine(ApplicationData.Current.LocalCacheFolder.Path, "Roaming\\LiveWallpaper");
                }
                return _UWPRealAppDataDir;
            }
        }
        /// <summary>
        /// 本地壁纸路径
        /// </summary>
        public static string LocalWallpaperDir { get; private set; }

        public static List<Wallpaper> Wallpapers { get; private set; }

        public static SettingObject Setting { get; private set; }

        public static AppData AppData { get; private set; }
        public static IntPtr MainHandle { get; internal set; }
        public static bool SettingInitialized { get; private set; }

        public static PurchaseViewModel GetPurchaseViewModel()
        {
            //StoreHelper store = new StoreHelper(MainHandle);
            var vm = new PurchaseViewModel();
            vm.Initlize(new string[] { "Durable" }, new string[] { "9N5XR16ZVS8M", "9NMV8XM83L0W", "9NWRT6CM2ZK4" });
            string VIPGroup = "864039359";
            vm.VIPContent = new VIPContent($"巨应工作室VIP QQ群：{VIPGroup}", VIPGroup, "https://shang.qq.com/wpa/qunwpa?idkey=24010e6212fe3c7ba6f79f5f91e6b216c6708d7a47abceb6f7e26890c3b15944");
            return vm;
        }

        public static void InitMuliLanguage()
        {
            //多语言
            Xaml.CustomMaps.Add(typeof(TaskbarIcon), TaskbarIcon.ToolTipTextProperty);
            //中国人大多都会英语，老大大多不会中文。对国际友人好一点，默认显示英语 -。-##
            LanService.Init(new JsonDB(GetLangaugesFilePath()), true, "en");
        }

        public static string GetLangaugesFilePath()
        {
            //不能用Environment.CurrentDirectory，开机启动目录会出错
            ApptEntryDir = Path.GetDirectoryName(Assembly.GetEntryAssembly().Location);
            string path = Path.Combine(ApptEntryDir, "Res\\Languages");
            return path;
        }

        public static async void InitlizeSetting()
        {
            if (SettingInitialized)
                return;

            //开机启动
            _desktopBridgeStartupManager = new DesktopBridgeStartupManager("LiveWallpaper");

            //配置相关
            SettingDefaultFile = Path.Combine(AppDomain.CurrentDomain.SetupInformation.ApplicationBase, "Res\\setting.default.json");
            SettingDescFile = Path.Combine(AppDomain.CurrentDomain.SetupInformation.ApplicationBase, "Res\\setting.desc.json");

            var appData = Environment.GetFolderPath(Environment.SpecialFolder.ApplicationData);
            AppDataDir = $"{appData}\\LiveWallpaper";
            SettingPath = $"{AppDataDir}\\Config\\setting.json";
            AppDataPath = $"{AppDataDir}\\appData.json";
            PurchaseDataPath = $"{AppDataDir}\\purchaseData.json";

            await CheckDefaultSetting();

            //应用程序数据
            AppData = await JsonHelper.JsonDeserializeFromFileAsync<AppData>(AppDataPath);
            if (AppData == null)
            {
                AppData = new AppData();
                await ApplyAppDataAsync();
            }

            Setting = await JsonHelper.JsonDeserializeFromFileAsync<SettingObject>(SettingPath);
            LocalWallpaperDir = Setting.General.WallpaperSaveDir;
            SettingInitialized = true;
        }

        public static async void Run()
        {
            //再次读取配置
            await ApplySetting(Setting);

            //加载壁纸
            RefreshLocalWallpapers();

            ShowCurrentWallpapers();
        }

        public static async void CheckUpates(IntPtr mainHandler)
        {
            StoreHelper store = new StoreHelper(mainHandler);
            var icon = IoC.Get<TaskbarIcon>();

#if DEBUG
            return;
#endif

            await store.DownloadAndInstallAllUpdatesAsync(() =>
            {
                var result = MessageBox.Show("是否更新。", "检测到新版本", MessageBoxButton.OKCancel);
                return result == MessageBoxResult.OK;
            }, (progress) =>
            {
                if ((int)progress.PackageUpdateState >= 3)
                    icon.ShowBalloonTip("温馨提示", $"如果更新失败，请关闭软件打开应用商店手动更新。", BalloonIcon.Info);
            });
        }


        //检查是否有配置需要重新生成
        private static async Task CheckDefaultSetting()
        {
            var tmpSetting = await JsonHelper.JsonDeserializeFromFileAsync<object>(SettingPath);
            var defaultData = await JsonHelper.JsonDeserializeFromFileAsync<object>(SettingDefaultFile);
            tmpSetting = JCrService.CheckDefault(tmpSetting as JObject, defaultData as JObject);
            //生成覆盖默认配置
            await JsonHelper.JsonSerializeAsync(tmpSetting, SettingPath);
        }

        private static void ShowCurrentWallpapers()
        {
            if (AppData.Wallpapers == null)
                return;

            foreach (var item in AppData.Wallpapers)
            {
                var w = Wallpapers.FirstOrDefault(m => m.AbsolutePath == item.Path);
                if (w == null)
                    continue;

                logger.Info($"ShowCurrentWallpapers {w.AbsolutePath} , {item.DisplayIndex}");
                _ = LiveWallpaperEngineAPI.WallpaperManager.Instance.ShowWallpaper(new WallpaperModel()
                {
                    Path = w.AbsolutePath
                }, ConveterToScrennIndexs(item.DisplayIndex));
            }
        }

        private static uint[] ConveterToScrennIndexs(int displayIndex)
        {
            uint[] screenIndexs;
            if (displayIndex < 0)
                screenIndexs = System.Windows.Forms.Screen.AllScreens.Select((m, i) => (uint)i).ToArray();
            else
                screenIndexs = new uint[] { (uint)displayIndex };
            return screenIndexs;
        }

        internal static async Task ShowWallpaper(Wallpaper w, int index)
        {
            await WallpaperManager.Instance.ShowWallpaper(new WallpaperModel()
            {
                Path = w.AbsolutePath
            }, ConveterToScrennIndexs(index));
            if (AppData.Wallpapers == null)
                AppData.Wallpapers = new List<DisplayWallpaper>();

            var exist = AppData.Wallpapers.FirstOrDefault(m => m.DisplayIndex == index);
            if (exist == null)
            {
                exist = new DisplayWallpaper() { DisplayIndex = index, Path = w.AbsolutePath };
                AppData.Wallpapers.Add(exist);
            }

            exist.Path = w.AbsolutePath;

            await ApplyAppDataAsync();
        }

        internal static void Dispose()
        {
            WallpaperManager.Instance.Dispose();
        }

        public static void RefreshLocalWallpapers()
        {
            Wallpapers = new List<Wallpaper>();

            if (!SettingInitialized)
                return;

            try
            {
                if (!Directory.Exists(LocalWallpaperDir))
                    Directory.CreateDirectory(LocalWallpaperDir);

                var wallpapers = Wallpaper.GetWallpapers(LocalWallpaperDir);
                foreach (var item in wallpapers)
                {
                    Wallpapers.Add(item);
                }
            }
            catch (Exception ex)
            {
                logger.Error(ex);
            }
        }

        public static async Task ApplyAppDataAsync()
        {
            await JsonHelper.JsonSerializeAsync(AppData, AppDataPath);
        }

        public static async Task ReApplySetting()
        {
            var setting = await JsonHelper.JsonDeserializeFromFileAsync<SettingObject>(SettingPath);
            Setting = setting;
            await ApplySetting(setting);
        }

        public static async Task ApplySetting(SettingObject setting)
        {
            LocalWallpaperDir = Setting.General.WallpaperSaveDir;
            string cultureName = setting.General.CurrentLan;
            if (cultureName == null)
                cultureName = Thread.CurrentThread.CurrentUICulture.Name;

            Thread.CurrentThread.CurrentUICulture = new System.Globalization.CultureInfo(cultureName);
            await LanService.UpdateLanguage();
            try
            {
                await _desktopBridgeStartupManager.Set(setting.General.StartWithWindows);
            }
            catch (Exception ex)
            {
                System.Diagnostics.Debug.WriteLine(ex);
            }
            setting.General.StartWithWindows = await _desktopBridgeStartupManager.Check();

            var screenSetting = System.Windows.Forms.Screen.AllScreens.Select(m => new ScreenOption()
            {
                ScreenIndex = (uint)System.Windows.Forms.Screen.AllScreens.ToList().IndexOf(m),
                WhenAppMaximized = LiveWallpaperEngine.ActionWhenMaximized.Pause,
            }).ToList();

            var liveWallpaperOptions = new LiveWallpaperOptions();
            liveWallpaperOptions.AppMaximizedEffectAllScreen = true;
            liveWallpaperOptions.AudioScreenIndex = setting.Wallpaper.AudioSource;
            liveWallpaperOptions.ScreenOptions.AddRange(screenSetting);

            await WallpaperManager.Instance.SetOptions(liveWallpaperOptions);
        }
    }
}
