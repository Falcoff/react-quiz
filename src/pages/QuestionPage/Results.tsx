import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PathEnum } from "../PathsEnum";
import { AnswerType } from "../../core/models/Question";

import r2d2sad from "../../assets/sounds/r2d2-concerned.mp3";

import r2d2Rire from "../../assets/sounds/r2d2-rire.mp3";

import r2d2 from "../../assets/sounds/r2d2.mp3";

import "./results.css";

const Results = ({
  score,
  questionsLength,
}: {
  score: number;
  questionsLength: number;
}) => {
  const navigate = useNavigate();

  const seeRanking = () => {
    navigate(PathEnum.RANKING);
  };

  const [audioSource, setAudioSource] = useState<string>("");

  useEffect(() => {
    if (score >= 8) {
      setAudioSource(r2d2sad);
    } else {
      if (score >= 4) {
        setAudioSource(r2d2Rire);
      } else {
        setAudioSource(r2d2);
      }
    }
  }, [score]);

  useEffect(() => {
    setTimeout(() => {
      const audioButton = document.getElementById("audio") as HTMLAudioElement;
      if (audioButton?.canPlayType("audio/mp3")) {
        audioButton.src = audioSource;
        setTimeout(() => {
          audioButton?.play();
        }, 150);
      }
    }, 1000);
  }, [audioSource]);

  return (
    <div className="container">
      <audio id="audio">
        <source src={audioSource} type="audio/mp3" />
      </audio>
      <div className="result-content">
        <span id="title">Votre score est de :</span>
        <p className="score">
          {score} / {questionsLength}
        </p>
      </div>

      <div className="classement-content"></div>

      <button
        type="button"
        className="btn btn-warning"
        onClick={() => navigate(PathEnum.HOME)}
      >
        Quitter
      </button>
      <button
        type="button"
        className="btn btn-warning"
        onClick={(e) => seeRanking()}
        style={{ marginLeft: "8px" }}
      >
        Classement
      </button>
    </div>
  );
};

export default Results;
