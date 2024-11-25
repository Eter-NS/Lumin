import { TestBed } from '@angular/core/testing'
import { RootComponent } from './root.component'
import { RouterModule } from '@angular/router'

describe('RootComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RootComponent, RouterModule.forRoot([])],
    }).compileComponents()
  })
})
