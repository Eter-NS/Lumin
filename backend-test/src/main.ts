import express from 'express'
import { config } from 'dotenv'
import llmRoutes from './api/v1/routes/llm'
import userRoutes from './api/v1/routes/user'

config()

const app = express()

app.use(express.json())
app.use('/api/llm', llmRoutes)
app.use('/api/user', userRoutes)

app.get('', (_, res) => {
  res.json({
    message: `Welcome to Lumin's backend!`,
  })
})

const port = process.env.PORT || 3000

const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`)
})
server.on('error', console.error)
