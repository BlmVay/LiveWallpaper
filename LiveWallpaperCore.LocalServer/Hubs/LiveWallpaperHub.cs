﻿using Giantapp.LiveWallpaper.Engine;
using LiveWallpaperCore.LocalServer.Models;
using LiveWallpaperCore.LocalServer.Models.AppStates;
using LiveWallpaperCore.LocalServer.Store;
using LiveWallpaperCore.LocalServer.Utils;
using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LiveWallpaperCore.LocalServer.Hubs
{
    public class LiveWallpaperHub : Hub
    {
        public Task<List<Wallpaper>> GetWallpapers()
        {
            return WallpaperStore.GetWallpapers();
        }
        public async Task<ShowWallpaperResult> ShowWallpaper(string path)
        {
            try
            {
                var result = await WallpaperStore.ShowWallpaper(path);
                return result;
            }
            catch (Exception ex)
            {
                return new ShowWallpaperResult()
                {
                    Ok = false,
                    Error = ShowWallpaperResult.ErrorType.Exception,
                    Message = ex?.Message
                };
            }
        }

        public async Task<SetupPlayerResult> SetupPlayer(string path)
        {
            var raiseLimiter = new RaiseLimiter();
            SetupPlayerResult result = await WallpaperStore.SetupPlayer(path, null, (p) =>
            {
                raiseLimiter.Execute(async () =>
                 {
                     System.Diagnostics.Debug.WriteLine($"{p.ProgressPercentage} {p.ActionType}");
                     await Clients.All.SendAsync("SetupPlayerProgressChanged", p);
                 }, 1000);
            });

            await raiseLimiter.WaitExit();
            return result;
        }

        public async Task SendMessage(string user, string message)
        {
            await Clients.All.SendAsync("ReceiveMessage", user, message);
        }

        public async Task Test()
        {
            await Clients.All.SendAsync("ReceiveMessage", "tTest", "test2");
        }

        public string MethodOneSimpleParameterSimpleReturnValue(string p1)
        {
            Console.WriteLine($"'MethodOneSimpleParameterSimpleReturnValue' invoked. Parameter value: '{p1}");
            return p1;
        }
    }
}
