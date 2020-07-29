﻿using NLog;
using System;
using System.Threading;
using System.Windows.Forms;

namespace LiveWallpaperCore
{
    class Program
    {
        [STAThread]
        static void Main(string[] args)
        {
            Application.SetHighDpiMode(HighDpiMode.SystemAware);
            Application.Run(new AppContext());
        }
    }
}
