import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PathEnum } from "../PathsEnum";
import { AnswerType } from "../../core/models/Question";
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
  return (
    <div className="container">
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
