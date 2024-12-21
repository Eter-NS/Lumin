import { TestBed } from '@angular/core/testing'
import { CustomTitleStrategy } from './custom-title-strategy.service'
import { TitleStateService } from '../title-state/title-state.service'
import { provideRouter, RouterOutlet, TitleStrategy } from '@angular/router'
import { provideLocationMocks } from '@angular/common/testing'
import { Component } from '@angular/core'
import { RouterTestingHarness } from '@angular/router/testing'
import { Title } from '@angular/platform-browser'

@Component({
  standalone: true,
  imports: [RouterOutlet],
  template: `
    <div>
      <router-outlet />
    </div>
  `,
})
class TestComponent {}

describe('CustomTitleStrategy', () => {
  let harness: RouterTestingHarness

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        provideRouter([
          {
            path: '',
            component: TestComponent,
          },
          {
            path: 'path-with-title',
            title: 'Example-title',
            children: [
              {
                path: 'nested-path-without-title',
                component: TestComponent,
              },
              {
                path: 'nested-path-with-title',
                title: 'Example-nested-title',
                component: TestComponent,
              },
              {
                path: '',
                component: TestComponent,
              },
            ],
          },
        ]),
        provideLocationMocks(),
        { provide: TitleStrategy, useClass: CustomTitleStrategy },
        TitleStateService,
        Title,
      ],
    }).compileComponents()

    harness = await RouterTestingHarness.create()
    await harness.navigateByUrl('', TestComponent)
    harness.detectChanges()
  })

  it('should use the default title if a route does not provide it (root level route)', async () => {
    expect(TestBed.inject(Title).getTitle()).toBe('Lumin')
  })

  it('should update the title and append a postfix "| Lumin" (root level route)', async () => {
    await harness.navigateByUrl('/path-with-title', TestComponent)

    expect(TestBed.inject(Title).getTitle()).toBe('Example-title | Lumin')
  })

  it('should use the higher order title if a route does not provide it (nested route)', async () => {
    await harness.navigateByUrl('/path-with-title/nested-path-without-title', TestComponent)

    expect(TestBed.inject(Title).getTitle()).toBe('Example-title | Lumin')
  })

  it('should update the title (nested route)', async () => {
    await harness.navigateByUrl('/path-with-title/nested-path-with-title', TestComponent)

    expect(TestBed.inject(Title).getTitle()).toBe('Example-nested-title | Lumin')
  })
})
