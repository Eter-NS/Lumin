import { ControlEvent, ValueChangeEvent } from '@angular/forms'
import { filter } from 'rxjs'

export function isValueChangeEvent<T>() {
  return filter(
    (event: ControlEvent<string>): event is ValueChangeEvent<T> => event instanceof ValueChangeEvent
  )
}
