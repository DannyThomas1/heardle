/* eslint-disable */
import Script from "next/script";
import React, { useEffect, useState } from "react";
import loadscript from "load-script";

interface Player {
  isPaused: (x: (b: boolean) => void) => void;
  play: () => void;
  pause: () => void;
}

function Player() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [player, setPlayer] = useState<Player>();

  useEffect(() => {
    loadscript("https://w.soundcloud.com/player/api.js", () => {
      const widgetIFrame = document.getElementById("sc-widget");
      const widget = (window as any)?.SC?.Widget(widgetIFrame);
      setPlayer(widget);

      widget.bind((window as any)?.SC.Widget.Events.READY, function () {
        widget.bind((window as any)?.SC.Widget.Events.PLAY, () => {
          setIsPlaying(true);
        });

        widget.bind(
          (window as any)?.SC.Widget.Events.PAUSE,
          (playerIsPaused: boolean) => {
            if (playerIsPaused) setIsPlaying(false);
          }
        );
      });
    });
  }, []);

  // adjust playback in SC player to match isPlaying state
  useEffect(() => {
    if (!player) return; // player loaded async - make sure available

    player.isPaused((playerIsPaused: boolean) => {
      if (isPlaying && playerIsPaused) {
        player.play();
      } else if (!isPlaying && !playerIsPaused) {
        player.pause();
      }
    });
  }, [isPlaying]);

  return (
    <div>
      <iframe
        id="sc-widget"
        src="https://w.soundcloud.com/player/?url=https://api.soundcloud.com/users/1539950/favorites"
        width={0}
        height={0}
      ></iframe>

      {isPlaying ? "playing" : "paused"}
      <button onClick={() => setIsPlaying((prev) => !prev)}>Play</button>
    </div>
  );
}

export default Player;
