import { readFileSync, writeFileSync } from 'fs'
import { config } from 'dotenv'

config()

const placeholderFile = 'frontend/src/environments/environment.example.ts'
const envFile = 'frontend/src/environments/environment.prod.ts'

let envContent = readFileSync(placeholderFile, 'utf8')
envContent = envContent
  .replace('@@API_URL', process.env.API_URL)
  .replace('@@WEBSOCKET_URL', process.env.WEBSOCKET_URL)

writeFileSync(envFile, envContent)
