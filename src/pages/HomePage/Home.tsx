import React, { useEffect, useState } from "react";
import logoStarWars from "../../assets/logos/logo-star-wars.png";
import musicStarWars from "../../assets/sounds/intro.mp3";
import videoStarWars from "../../assets/galaxy.mp4";
import "./Home.css";
import { useNavigate } from "react-router-dom";
import { PathEnum } from "../PathsEnum";
import { ReactComponent as SpeakerLogo } from "../../assets/icons/Speaker_Icon.svg";
import { ReactComponent as MutedLogo } from "../../assets/icons/Mute_Icon.svg";

const Home: React.FC = () => {
  const navigate = useNavigate();

  const startQuiz = () => {
    const audioButton = document?.querySelector("audio");
    audioButton?.pause();
    navigate(PathEnum.QUESTION);
  };

  const seeRanking = () => {
    navigate(PathEnum.RANKING);
  };

  const [soundOn, setSoundOn] = useState(false);

  useEffect(() => {
    const audioButton = document?.querySelector("audio");
    if (soundOn) {
      audioButton?.play();
    } else {
      audioButton?.pause();
    }
  }, [soundOn]);

  return (
    <div className="container">
      <div className="opening-stars">
        <div className="soundLogo" onClick={() => setSoundOn((prev) => !prev)}>
          {soundOn ? <SpeakerLogo /> : <MutedLogo />}
        </div>
        <video id="background-video" autoPlay={true} loop={true} muted={true}>
          <source src={videoStarWars} type="video/mp4" />
        </video>

        <audio id="background-audio" autoPlay={true} loop={true}>
          <source src={musicStarWars} type="audio/mp3" />
        </audio>
        {/* <iframe
          style={{ display: "none" }}
          id="video-player"
          className="audio"
          width="560"
          height="315"
          src="https://player.vimeo.com/video/309741585"
          //   frameborder="0"
          //   webkitallowfullscreen
          //   mozallowfullscreen
          //   allowfullscreen
          allow="autoplay"
        ></iframe> */}

        <div className="opening-stars-logo">
          <img
            className="opening-logo"
            src={logoStarWars}
            alt="Star Wars Logo"
          />
        </div>

        <div className="crawl-text" id="btnStart">
          <button
            type="button"
            className="btn btn-warning btn-lg"
            onClick={(e) => startQuiz()}
          >
            Commencer
          </button>
          <button
            type="button"
            className="btn btn-outline-warning"
            style={{ marginTop: "32px" }}
            onClick={(e) => seeRanking()}
          >
            Classement
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
