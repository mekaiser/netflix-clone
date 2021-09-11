import React from "react";
import "./YTFrameContainer.css";

function YTFrameContainer() {
  return (
    <div className="yt__iframe__container" tabIndex="-1" role="dialog" aria-label="youtube iframe container just got opened">
      <div className="yt__iframe__div">
        <div className="yt__iframe__div__inner">
          <div className="yt__iframe__wrap">
          <iframe
            width="460"
            height="230"
            src="https://www.youtube.com/embed/M7lc1UVf-VE?autoplay=1&cc_load_policy=1&controls=1&disablekb=0&enablejsapi=0&fs=1&iv_load_policy=1&loop=0&rel=0&showinfo=1&start=0&wmode=transparent&theme=dark&mute=0"
            frameborder="0"
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
            tabIndex="-1"
          ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
}

export default YTFrameContainer;
