import express from 'express'
import {nbaIds} from './ids'

const getId = express.Router()


getId.get('/get-id/:sport,:name', async (req: express.Request, res: express.Response, next: express.NextFunction) => {
	const {sport, name} = req.params
	const upperName = name.trim().toUpperCase()
	if(sport.trim().toUpperCase() === 'NBA') {
		if(!nbaIds.has(upperName)) {
			res.send(`<p>${name} not in the database, try again</h1>`)
		}
		res.send(`<h2>${nbaIds.get(upperName)}</h1>`)
	}
})

export default getId
