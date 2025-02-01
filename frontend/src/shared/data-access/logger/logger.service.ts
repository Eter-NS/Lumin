import { LogLevel } from '@lumin/shared/models/logLevel.type'

export abstract class LoggerService {
  abstract log(level: LogLevel, message: string): void
}
