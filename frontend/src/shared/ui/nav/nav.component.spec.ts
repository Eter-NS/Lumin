import { ComponentFixture, TestBed } from '@angular/core/testing'
import { NavComponent } from './nav.component'
import { Component, DebugElement, input, Provider } from '@angular/core'
import { RoutingLink } from '../../utils/models/routingLink.interface'
import { By } from '@angular/platform-browser'
import { provideRouter, Router } from '@angular/router'
import { provideLocationMocks } from '@angular/common/testing'
import { RouterTestingHarness } from '@angular/router/testing'

@Component({
  standalone: true,
  template: `<p>The example icon component works!</p>`,
})
class ExampleIconComponent {}

const navLinks: RoutingLink[] = Array.from({ length: 4 }, (_, i) => ({
  component: ExampleIconComponent,
  routerLink: `test-route-${i + 1}`,
  linkText: `link ${i + 1}`,
}))

@Component({
  standalone: true,
  imports: [NavComponent],
  template: ` <app-nav [routingLinks]="links()" /> `,
})
class TestComponent {
  links = input<RoutingLink[]>(navLinks)
}

@Component({
  standalone: true,
  template: ` <p>The testing page works!</p> `,
})
class ExamplePageComponent {}

describe('NavComponent', () => {
  // component
  let harness: RouterTestingHarness
  let component: DebugElement
  let fixture: ComponentFixture<unknown>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestComponent],
      providers: [
        provideRouter([
          {
            path: '',
            component: TestComponent,
          },
          ...navLinks.map(({ routerLink }) => {
            return {
              path: routerLink,
              component: ExamplePageComponent,
            }
          }),
        ]),
        provideLocationMocks(),
      ] as Provider[],
    }).compileComponents()

    harness = await RouterTestingHarness.create()
    await harness.navigateByUrl('/', TestComponent)
    fixture = harness.fixture
    fixture.detectChanges()
    component = fixture.debugElement.query(By.directive(NavComponent))
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it(`should render the links provided via 'routingLinks' input.`, () => {
    // Act
    const navLinkElements = fixture.debugElement.queryAll(
      By.css(`[data-test="navigation-list"] > *`)
    )

    // Assert
    expect(navLinkElements.length).toEqual(navLinks.length)
  })

  it(`should navigate user to the provided link.`, async () => {
    // Arrange
    const page = '/' + navLinks[0].routerLink

    // Act
    const navLinkElement = fixture.debugElement.query(By.css(`a[href="${page}"]`)).nativeElement
    navLinkElement.click()

    fixture.detectChanges()
    await fixture.whenStable()

    // Assert
    expect(TestBed.inject(Router).url).toBe(page)
  })
})
