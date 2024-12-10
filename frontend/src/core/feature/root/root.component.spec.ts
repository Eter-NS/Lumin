import { ComponentFixture, TestBed } from '@angular/core/testing'
import { RootComponent } from './root.component'
import { provideRouter } from '@angular/router'
import { provideLocationMocks } from '@angular/common/testing'
import { Component, Provider } from '@angular/core'

@Component({ standalone: true, template: `<p>Testing component works!</p>` })
class TestComponent {}

describe('RootComponent', () => {
  let component: RootComponent
  let fixture: ComponentFixture<RootComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RootComponent],
      providers: [
        provideRouter([
          {
            path: '',
            component: TestComponent,
          },
        ]),
        provideLocationMocks(),
      ] as Provider[],
    }).compileComponents()

    fixture = TestBed.createComponent(RootComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it(`should create`, () => {
    // Assert
    expect(component).toBeTruthy()
  })
})
