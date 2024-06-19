import React, { useEffect } from "react";
import logoStarWars from "../../assets/logos/logo-star-wars.png";
import musicStarWars from "../../assets/sounds/intro.mp3";
import videoStarWars from "../../assets/galaxy.mp4";
import "./Home.css";
import { useNavigate } from "react-router-dom";
import { PathEnum } from "../PathsEnum";

const Home: React.FC = () => {
  const navigate = useNavigate();

  const startQuiz = () => {
    navigate(PathEnum.QUESTION);
  };

  const seeRanking = () => {
    navigate(PathEnum.RANKING);
  }

  useEffect(() => {
    setTimeout(() => {
      const promise = document?.querySelector("audio")?.play();

      if (promise !== undefined) {
        promise
          .then((_) => {
            // Autoplay started!
          })
          .catch((error) => {
            // Autoplay was prevented.
            // Show a "Play" button so that user can start playback.
          });
      }
    }, 1000);
    // playMusic();
  }, []);

  return (
    <div className="container">
      <div className="opening-stars">
        <video id="background-video" autoPlay={true} loop={true} muted={true}>
          <source src={videoStarWars} type="video/mp4" />
        </video>
        {/* 
        <audio
          id="background-audio"
          autoPlay={true}
          loop={true}
          muted={false}
          onCanPlay={() => document?.querySelector("audio")?.play()}
        >
          <source src={musicStarWars} type="audio/mp3" />
        </audio> */}
        <iframe
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
        ></iframe>

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
            style={{marginTop: "32px"}}
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
