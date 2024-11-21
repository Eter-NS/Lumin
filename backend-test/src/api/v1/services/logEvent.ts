import { writeFile } from 'fs'
import { EventLog } from '../types/interfaces/EventLog'
import { config } from 'dotenv'

config()

const consoleLogs: Record<EventLog['type'], (...data: unknown[]) => void> = {
  log: console.log,
  warning: console.warn,
  error: console.error,
}

export function logEvent(event: EventLog) {
  consoleLogs[event.type](event.message)
  const location = process.env.LOG_LOCATION

  if (!location || typeof location !== 'string') {
    return
  }

  try {
    const logData = JSON.stringify(event) // Convert the event object to a JSON string
    writeFile(location, logData, { flag: 'a' }, (err) => {
      if (err) {
        console.error('Error writing log:', err)
      }
    })
  } catch (error) {
    console.error('Error writing log:', error)
  }
}
