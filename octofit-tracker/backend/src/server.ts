import express from 'express'
import { connectDatabase } from './config/database.js'
import { Activity } from './models/activity.js'
import { Leaderboard } from './models/leaderboard.js'
import { Team } from './models/team.js'
import { User } from './models/user.js'
import { Workout } from './models/workout.js'

const app = express()
const port = Number(process.env.PORT) || 8000
const codespaceName = process.env.CODESPACE_NAME
const baseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : `http://localhost:${port}`

app.use(express.json())

app.get('/api/health', (_request, response) => {
  response.json({ status: 'ok', baseUrl })
})

app.get('/api/users/', async (_request, response) => {
  response.json(await User.find().lean())
})

app.get('/api/teams/', async (_request, response) => {
  response.json(await Team.find().populate('members', 'name username avatar').lean())
})

app.get('/api/activities/', async (_request, response) => {
  response.json(await Activity.find().populate('user', 'name username').populate('team', 'name').lean())
})

app.get('/api/leaderboard/', async (_request, response) => {
  response.json(await Leaderboard.find().sort({ rank: 1 }).populate('user', 'name username').populate('team', 'name').lean())
})

app.get('/api/workouts/', async (_request, response) => {
  response.json(await Workout.find().lean())
})

async function startServer() {
  await connectDatabase()
  app.listen(port, () => {
    console.log(`OctoFit API listening on port ${port}`)
  })
}

startServer().catch((error) => {
  console.error('Unable to start OctoFit API:', error)
  process.exit(1)
})