import { ComponentFixture, TestBed } from '@angular/core/testing'
import { NavComponent } from './nav.component'
import { Component, DebugElement, input, Provider, signal } from '@angular/core'
import { RoutingLink } from '../../utils/models/routingLink.interface'
import { By } from '@angular/platform-browser'
import { provideRouter, Router } from '@angular/router'
import { provideLocationMocks } from '@angular/common/testing'
import { RouterTestingHarness } from '@angular/router/testing'
import { IconComponent } from '@lumin/shared/models/iconComponent.interface'

@Component({
  standalone: true,
  template: ` <p>The testing page works!</p> `,
})
class ExamplePageComponent {}

@Component({
  standalone: true,
  template: `
    <p>The example icon component works!</p>
    <p>icon size: {{ size() }}</p>
  `,
})
class ExampleIconComponent implements IconComponent {
  size = input<string>('')
}

const navLinks: RoutingLink[] = Array.from({ length: 4 }, (_, i) => ({
  iconComponent: ExampleIconComponent,
  routerLink: `test-route-${i + 1}`,
  linkText: `link ${i + 1}`,
}))

@Component({
  standalone: true,
  imports: [NavComponent],
  template: `
    <app-nav [routingLinks]="links()" [(expanded)]="expanded">
      @if (showExampleSectionContent()) {
        <ng-template #navSectionContent>
          <p data-test="projected-test-content">I'm a projected content inside nav element</p>
        </ng-template>
      }
    </app-nav>
  `,
})
class TestComponent {
  links = signal<RoutingLink[]>(navLinks)
  showExampleSectionContent = signal<boolean>(false)
  expanded = signal(true)
}

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

  it(`should show the projected content when provided and nav element is expanded (screen larger than mobile).`, () => {
    // Arrange
    const testComponent = fixture.debugElement.query(By.directive(TestComponent))
      .componentInstance as TestComponent
    testComponent.showExampleSectionContent.set(true)
    testComponent.expanded.set(true)

    fixture.detectChanges()

    // Act
    const projectedContentRef = fixture.debugElement.query(
      By.css(`[data-test="projected-test-content"]`)
    )

    // Assert
    expect(projectedContentRef).toBeTruthy()
  })

  it(`should not show the projected content when provided and nav element is not expanded (screen larger than mobile).`, () => {
    // Arrange
    const testComponent = fixture.debugElement.query(By.directive(TestComponent))
      .componentInstance as TestComponent
    testComponent.showExampleSectionContent.set(true)
    testComponent.expanded.set(false)
    fixture.detectChanges()

    // Act
    const projectedContentRef = fixture.debugElement.query(
      By.css(`[data-test="projected-test-content"]`)
    )

    // Assert
    expect(projectedContentRef).toBeFalsy()
  })

  it(`should not show the section element if no content has been passed.`, () => {
    // Arrange
    const testComponent = fixture.debugElement.query(By.directive(TestComponent))
      .componentInstance as TestComponent
    testComponent.showExampleSectionContent.set(false)
    testComponent.expanded.set(true)
    fixture.detectChanges()

    // Act
    const projectedContentRef = fixture.debugElement.query(
      By.css(`[data-test="projected-test-content"]`)
    )

    // Assert
    expect(projectedContentRef).toBeFalsy()
  })
})
