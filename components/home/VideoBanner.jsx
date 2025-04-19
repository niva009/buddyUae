'use client';

import React, { useState, useEffect } from "react";
import { Volume2, VolumeX } from "lucide-react";

export default function VideoBanner() {
  const [mute, setMute] = useState(true);

  useEffect(() => {
    import("aos").then((AOS) => AOS.init());
  }, []);

  return (
    <div className="mt-4 relative w-full px-4 md:px-8 lg:px-48">
      <div className="absolute z-50 top-4 px-3 lg:px-7 py-3 lg:py-7">
        {mute ? (
          <div onClick={() => setMute(false)}>
            <VolumeX className="text-white cursor-pointer" />
          </div>
        ) : (
          <div onClick={() => setMute(true)}>
            <Volume2 className="text-white cursor-pointer" />
          </div>
        )}
      </div>
      <video
        src="/home/video.mp4"
        autoPlay
        loop
        muted={mute}
        playsInline
        className="w-full h-auto object-cover !z-1"
      />
    </div>
  );
}
