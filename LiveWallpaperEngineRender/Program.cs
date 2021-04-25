using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace LiveWallpaperEngineRender
{
    public class LaunchOptions
    {
        /// <summary>
        /// ���ڳ�ʼ��λ��
        /// </summary>
        public int WindowLeft { get; set; }
        /// <summary>
        /// ���ڳ�ʼ��λ��
        /// </summary>
        public int WindowTop { get; set; }
    }

    static class Program
    {
        static LaunchOptions _launchArgs;
        static Dictionary<string, RenderForm> _allWindows = new Dictionary<string, RenderForm>();
        static DateTime lastReadConsoleTime = DateTime.Now;

        /// <summary>
        ///  The main entry point for the application.
        /// </summary>
        [STAThread]
        static void Main(string[] args)
        {
            _launchArgs = Util.ParseArguments<LaunchOptions>(args);

            Application.SetHighDpiMode(HighDpiMode.SystemAware);
            Application.EnableVisualStyles();
            Application.SetCompatibleTextRenderingDefault(false);

            ListenConsole();

            foreach (var screen in Screen.AllScreens)
            {
                var form = CreateForm(_launchArgs);
                form.HandleCreated += Form_HandleCreated;
                string screenDeviceName = screen.DeviceName;
                if (!_allWindows.ContainsKey(screenDeviceName))
                    _allWindows.Add(screenDeviceName, null);

                _allWindows[screenDeviceName] = form;
                form.Show();
            }

            Form mainForm = _allWindows.First().Value;
            Application.Run(mainForm);
        }

        private static void Form_HandleCreated(object sender, EventArgs e)
        {
            Form currentForm = sender as Form;
            currentForm.HandleCreated -= Form_HandleCreated;

            InitlizedPayload payload = new InitlizedPayload();

            foreach (var item in _allWindows)
            {
                //������Ļû��ʼ��
                if (!item.Value.IsHandleCreated)
                    return;

                payload.WindowHandles.Add(item.Key, item.Value.Handle.ToInt64());
            }

            SendToParent(new RenderProtocol(payload)
            {
                Command = ProtocolDefinition.Initlized
            });
        }

        private static void SendToParent(RenderProtocol renderProtocol)
        {
            var json = JsonSerializer.Serialize(renderProtocol);
            Console.WriteLine(json);
        }

        private static RenderForm CreateForm(LaunchOptions launchArgs)
        {
            var result = new RenderForm()
            {
                Left = launchArgs.WindowLeft,
                Top = launchArgs.WindowTop,
                StartPosition = FormStartPosition.Manual
            };
            return result;
        }

        private static async void ListenConsole()
        {
            while (true)
            {
                if (DateTime.Now - lastReadConsoleTime < TimeSpan.FromSeconds(1))
                    await Task.Delay(1000);

                var json = await Console.In.ReadLineAsync();
                if (!string.IsNullOrEmpty(json))
                {
                    var protocol = JsonSerializer.Deserialize<RenderProtocol>(json);

                    switch (protocol.Command)
                    {
                        case ProtocolDefinition.PlayVideo:
                            var playPayload = protocol.GetPayLoad<PlayVideoPayload>();
                            foreach (var item in playPayload.Screen)
                            {
                                _allWindows[item].PlayVideo(playPayload.FilePath);
                            }
                            break;
                        case ProtocolDefinition.StopVideo:
                            var stopPayload = protocol.GetPayLoad<StopVideoPayload>();
                            foreach (var item in stopPayload.Screen)
                            {
                                _allWindows[item].StopVideo();
                            }
                            break;
                    }
                }
                else
                {
                    //�������ʱ�żӵ�������
                    lastReadConsoleTime = DateTime.Now;
                }
            }
        }
    }
}
