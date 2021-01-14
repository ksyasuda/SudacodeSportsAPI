import express from 'express'
import fetch from 'node-fetch'

const getGame = express.Router()

getGame.get('/get-game/:sport,:id', async (req, res, next) => {
	let { sport, id } = req.params
	sport = sport.trim().toUpperCase()
	console.log(sport)
	switch(sport) {
		case 'NBA':
			const url = `http://site.api.espn.com/apis/site/v2/sports/basketball/nba/teams/${id}`
			const response = await fetch(url)
			const json = await response.json()
			console.log(json)
			const { date, name, shortName } = json.team.nextEvent[0]
			const logo1 = json.team.nextEvent[0].competitions[0].competitors[0].team.logos[1].href 
			const logo2 = json.team.nextEvent[0].competitions[0].competitors[1].team.logos[1].href 
			const { statusName, statusDescription, completed } = json.team.nextEvent[0].competitions[0].status.type
			const data = {
				date: new Date(date).toLocaleString(),
				name: name,
				shortName: shortName,
				logo1: logo1,
				logo2: logo2,
				status: statusName,
				desc: statusDescription,
				completed: completed
			}
			res.send(data)
			break
	}
})

export default getGame
