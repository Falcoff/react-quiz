import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PathEnum } from "../PathsEnum";
import { AnswerType } from "../../core/models/Question";
import "./RankingPage.css";
import { filter, orderBy } from "lodash";
import User from "../../core/models/User";
import { questions } from "../QuestionPage/question";
enum DisplayRanking {
  ALL = "ALL",
  WEDNESDAY = "WEDNESDAY",
  THURSDAY = "THURSDAY",
  FRIDAY = "FRIDAY",
}

const compareDateFunction = (userDate: Date) => {
  return {
    ALL: true,
    WEDNESDAY:
      new Date(userDate).toDateString() ===
      new Date("2024-06-26").toDateString(),
    THURSDAY:
      new Date(userDate).toDateString() ===
      new Date("2024-06-27").toDateString(),
    FRIDAY:
      new Date(userDate).toDateString() ===
      new Date("2024-06-28").toDateString(),
  };
};

const RankingPage: React.FC = () => {
  const navigate = useNavigate();

  const [fade, setFade] = useState(false);

  const [displayRanking, setDisplayRanking] = useState<DisplayRanking>(
    DisplayRanking.ALL
  );

  const allUsers: User[] = JSON.parse(localStorage.getItem("users") || "[]");

  const [displayedUsers, setDisplayedUsers] = useState<User[]>(allUsers);

  const orderUsers = () => {
    const userFiltered = filter(
      allUsers,
      (user) => compareDateFunction(user.date)[displayRanking]
    );

    return orderBy(userFiltered, ["score", "time"], ["desc", "asc"]);
  };

  useEffect(() => {
    setDisplayedUsers(orderUsers());
  }, [displayRanking]);

  const convertToCSV = (objArray: any) => {
    const array =
      typeof objArray !== "object" ? JSON.parse(objArray) : objArray;
    let str = "";

    for (let i = 0; i < array.length; i++) {
      let line = "";
      for (const index in array[i]) {
        if (line !== "") line += ",";

        line += array[i][index];
      }
      str += line + "\r\n";
    }
    return str;
  };

  const downloadCSV = () => {
    const fileName = "data";
    const csvData = new Blob([convertToCSV(allUsers)], { type: "text/csv" });
    const csvURL = URL.createObjectURL(csvData);
    const link = document.createElement("a");
    link.href = csvURL;
    link.download = `${fileName}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="container">
      <div
        className={"ranking-content " + (fade ? "fade" : "")}
        onAnimationEnd={() => setFade(false)}
      >
        <div className="group-button">
          <button
            onClick={() => setDisplayRanking(DisplayRanking.ALL)}
            className={
              "btn " +
              (displayRanking === DisplayRanking.ALL
                ? "btn-warning"
                : "btn-outline-warning")
            }
          >
            Tout
          </button>
          <button
            onClick={() => setDisplayRanking(DisplayRanking.WEDNESDAY)}
            className={
              "btn " +
              (displayRanking === DisplayRanking.WEDNESDAY
                ? "btn-warning"
                : "btn-outline-warning")
            }
          >
            Mercredi
          </button>
          <button
            onClick={() => setDisplayRanking(DisplayRanking.THURSDAY)}
            className={
              "btn " +
              (displayRanking === DisplayRanking.THURSDAY
                ? "btn-warning"
                : "btn-outline-warning")
            }
          >
            Jeudi
          </button>
          <button
            onClick={() => setDisplayRanking(DisplayRanking.FRIDAY)}
            className={
              "btn " +
              (displayRanking === DisplayRanking.FRIDAY
                ? "btn-warning"
                : "btn-outline-warning")
            }
          >
            Vendredi
          </button>
        </div>
        <span id="title" style={{ margin: "16px 0" }}>
          CLASSEMENT
        </span>

        <table>
          <thead>
            <tr>
              <th className="rank-user">N°</th>
              <th className="date-user">Date</th>
              <th className="name-user">Nom</th>
              <th className="score-user">Score</th>
              <th className="time-user">Temps</th>
            </tr>
          </thead>
          <tbody>
            {displayedUsers.length > 0 &&
              displayedUsers.map((user, index) => (
                <tr key={user.email}>
                  <th>{index+1}</th>
                  <th>
                    {new Date(user.date).toLocaleDateString() +
                      " " +
                      new Date(user.date).toLocaleTimeString()}
                  </th>
                  <th>
                    {user.name} {user.firstname}
                  </th>
                  <th>
                    {user.score}/{questions.length}
                  </th>
                  <th>{user.time}</th>
                </tr>
              ))}
          </tbody>
        </table>
        {displayedUsers.length === 0 && (
          <span id="nodata">Aucune donnée à ce jour</span>
        )}
        <div className="footerRanking">
          <button
            type="button"
            className="btn btn-warning"
            onClick={() => navigate(PathEnum.HOME)}
          >
            Retour
          </button>
          <button
            type="button"
            className="btn btn-warning"
            style={{ margin: "auto 0 auto auto" }}
            onClick={() => downloadCSV()}
          >
            Télécharger
          </button>
        </div>
      </div>
    </div>
  );
};

export default RankingPage;
