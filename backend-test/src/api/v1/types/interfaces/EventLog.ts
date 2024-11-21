export interface EventLog {
  type: 'log' | 'warning' | 'error'
  message: string
}
