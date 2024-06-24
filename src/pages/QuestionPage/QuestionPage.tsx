import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PathEnum } from "../PathsEnum";
import "./QuestionPage.css";
import { questions } from "./question";
import { cloneDeep, map } from "lodash";
import { AnswerType } from "../../core/models/Question";
import Formulaire from "./Formulaire";
import Timer, { getTimeUser } from "./Timer";
import Results from "./Results";
import User from "../../core/models/User";
import mayTheForce from "../../assets/sounds/Force-with-u.mp3";

const QuestionPage: React.FC = () => {
  const navigate = useNavigate();

  const [count, setCount] = useState(0);

  const [answersUser, setAnswersUser] = useState<AnswerType[]>([]);

  const [showForm, setShowForm] = useState(false);

  const [fade, setFade] = useState(false);

  const [time, setTime] = useState(0);

  const [isActive, setIsActive] = useState(false);
  const [isPaused, setIsPaused] = useState(true);

  const [dataUser, setDataUser] = useState({
    name: "",
    firstname: "",
    email: "",
    phone: "",
    hasAccept: false,
  });

  const saveUser = (data: {
    name: string;
    firstname: string;
    email: string;
    phone: string;
    hasAccept: boolean;
  }) => {
    setDataUser(data);
    const users: User[] = JSON.parse(localStorage.getItem("users") || "[]");
    users.push({
      ...data,
      time: getTimeUser(time),
      score: calculateScore(),
      date: new Date(),
    });
    localStorage.setItem("users", JSON.stringify(users));
  };

  React.useEffect(() => {
    let interval: any = undefined;

    if (isActive && isPaused === false) {
      interval = setInterval(() => {
        setTime((time) => time + 10);
      }, 10);
    } else {
      clearInterval(interval);
    }
    return () => {
      clearInterval(interval);
    };
  }, [isActive, isPaused]);

  useEffect(() => {
    handleStart();
  }, []);

  const handleStart = () => {
    setIsActive(true);
    setIsPaused(false);
  };

  const handlePauseResume = () => {
    setIsPaused(true);
  };

  const clickAnswer = (answer: AnswerType) => {
    setFade(true);
    const newAnswers = cloneDeep(answersUser);
    newAnswers.push(answer);
    setAnswersUser(newAnswers);
    if (questions.length <= count + 1) {
      setShowForm(true);
      handlePauseResume();
    } else {
      setCount(count + 1);
    }
    // const answers = answersUser
  };

  const calculateScore = () => {
    let score = 0;
    if (answersUser.length === questions.length) {
      questions.map((value, index) => {
        if (value.goodAnswer === answersUser[index]) {
          score++;
        }
      });
    }
    return score;
  };

  // useEffect(() => {
  //   window.addEventListener("beforeunload", alertUser);
  //   return () => {
  //     window.removeEventListener("beforeunload", alertUser);
  //   };
  // }, []);

  // const alertUser = (e: any) => {
  //   e.preventDefault();
  //   e.returnValue = "";
  //   navigate(PathEnum.HOME)
  // };

  const [arrived] = useState(true);

  useEffect(() => {
    console.log("arrived");
  }, [arrived]);

  useEffect(() => {
    setTimeout(() => {
      console.log("test");
      const audioForce = document?.getElementById(
        "audioForce"
      ) as HTMLAudioElement;
      if (audioForce?.canPlayType("audio/mp3")) {
        // audioForce.src = mayTheForce;
        // audioForce.load();
        document.getElementsByClassName("question-content")[0];
        if (audioForce.muted) {
          audioForce.muted = false;
          audioForce?.play();
        }
        // setTimeout(() => {
        //   audioForce.pause();
        // }, 4000);
      }
    }, 1000);
  }, []);

  return (
    <div className="container">
      {dataUser.firstname ? (
        <Results
          score={calculateScore()}
          questionsLength={questions.length - 1}
        />
      ) : (
        <>
          {showForm ? (
            <Formulaire getDataAfterValidate={(data: any) => saveUser(data)} />
          ) : (
            <div
              className={"question-content " + (fade ? "fadein" : "fadeout")}
              onAnimationEnd={() => setFade(false)}
            >
              <audio id="audioForce" muted={true}>
                <source src={mayTheForce} type="audio/mp3" />
              </audio>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span id="title">
                  Question {count === 10 ? "bonus" : count + 1} :
                </span>
                <Timer time={time} />
              </div>
              <p className="question-label">{questions[count].question}</p>
              <div className="answer-content">
                {map(
                  questions[count].answers,
                  (value: string, key: AnswerType) => (
                    //   <>{key}</>
                    <div
                      key={key}
                      className={"btn-group-vertical btn-answer"}
                      role="group"
                      aria-label="Answers"
                    >
                      <button
                        type="button"
                        className="btn btn-outline-warning btn-answer"
                        onClick={() => clickAnswer(key)}
                        name="btnone"
                      >
                        {value}
                      </button>
                    </div>
                  )
                )}
              </div>

              <button
                type="button"
                className="btn btn-warning btn-quit"
                onClick={() => navigate(PathEnum.HOME)}
              >
                Quitter
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default QuestionPage;
