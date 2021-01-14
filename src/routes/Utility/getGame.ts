import express from "express";
import fetch from "node-fetch";
import { nbaIds } from "./ids";

const getGame = express.Router();

export interface Competitors {
  team1: {
    score: number;
    name: string;
  };
  team2: {
    score: number;
    name: string;
  };
}

getGame.get("/get-game/:sport,:teamId", async (req, res, next) => {
  let { sport, teamId } = req.params;
  sport = sport.trim().toUpperCase();
  switch (sport) {
    case "NBA":
      const url = `http://site.api.espn.com/apis/site/v2/sports/basketball/nba/teams/${teamId}`;
      const response = await fetch(url);
      const json = await response.json();
      const { date, name, shortName } = json.team.nextEvent[0];
      const eventId = json.team.nextEvent[0].id;
      const logo1 =
        json.team.nextEvent[0].competitions[0].competitors[0].team.logos[1]
          .href;
      const logo2 =
        json.team.nextEvent[0].competitions[0].competitors[1].team.logos[1]
          .href;
      const {
        description,
        completed,
      } = json.team.nextEvent[0].competitions[0].status.type;
      const parts = name.split("at");
      let team1, team2, temp;
      if (parts[0] === "Los Angeles Lakers") {
        [team2, team1] = parts;
      } else {
        [team1, team2] = parts;
      }

      let data = {
        date: new Date(date).toLocaleString(),
        team1: team1,
        team2: team2,
        logo1: logo2,
        logo2: logo1,
        competitors: {},
      };

      const competitorData: Competitors = {
        team1: {
          score: -1,
          name: "",
        },
        team2: {
          score: -1,
          name: "",
        },
      };

      if (description === "In Progress" || description === "Halftime") {
        const gameUrl = `http://site.api.espn.com/apis/site/v2/sports/basketball/nba/scoreboard/${eventId}`;
        const response2 = await fetch(gameUrl);
        const json2 = await response2.json();
        json2.competitions[0].competitors.map((competitor: any) => {
          const { id, name } = competitor.team;
          const score = competitor.score;
          if (id === teamId) {
            competitorData.team1.name = name;
            competitorData.team1.score = score;
          } else {
            competitorData.team2.name = name;
            competitorData.team2.score = score;
          }
        });
        data.competitors = competitorData;
      }

      res.render("nbaGame", data);
      break;
  }
});

export default getGame;
