import Player from "@vimeo/player";
import throttle from "lodash.throttle";

const iframe = document.getElementById("vimeo-player");
const player = new Player(iframe);

player.on(
  "timeupdate",
  throttle(function (data) {
    localStorage.setItem("videoplayer-current-time", data.seconds);
  }, 1000)
);

const savedTime = localStorage.getItem("videoplayer-current-time");
if (savedTime) {
  player.setCurrentTime(savedTime).catch(function (error) {
    console.error("Error occurred while setting video time: ", error);
  });
}
