import { ComponentFixture, TestBed } from '@angular/core/testing'
import { LatestChatsComponent } from './latest-chats.component'
import { Component, input, Provider, signal } from '@angular/core'
import { By } from '@angular/platform-browser'
import { ChatPreview } from '@lumin/app/models/chatPreview.interface'
import { provideRouter, withComponentInputBinding } from '@angular/router'
import { RouterTestingHarness } from '@angular/router/testing'
import { provideLocationMocks } from '@angular/common/testing'

@Component({
  standalone: true,
  imports: [LatestChatsComponent],
  template: ` <app-latest-chats [latestChats]="exampleLatestChats()" /> `,
})
class TestComponent {
  exampleLatestChats = signal<ChatPreview[]>([
    {
      id: 'example-id',
      timestamp: Date.now(),
      title: 'Example title',
    },
    {
      id: 'example-id2',
      timestamp: Date.now() - 10_000,
      title: 'Example title 2',
    },
  ])
}

@Component({
  standalone: true,
  template: ` <p>ID value: {{ id() }}</p> `,
})
class CheckIdComponent {
  id = input<string>()
}

describe('LatestChatsComponent', () => {
  let harness: RouterTestingHarness
  let fixture: ComponentFixture<unknown>
  let testComponent: TestComponent
  let component: LatestChatsComponent

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestComponent],
      providers: [
        provideRouter(
          [
            {
              path: 'app/chat/:id',
              component: CheckIdComponent,
            },
            {
              path: 'app/chat',
              component: TestComponent,
            },
          ],
          withComponentInputBinding()
        ),
        provideLocationMocks(),
      ] as Provider[],
    }).compileComponents()

    harness = await RouterTestingHarness.create()
    fixture = harness.fixture
    testComponent = await harness.navigateByUrl('/app/chat', TestComponent)
    fixture.detectChanges()

    component = fixture.debugElement.query(By.directive(LatestChatsComponent)).componentInstance
  })

  it('should create', () => {
    expect(testComponent).toBeTruthy()
    expect(component).toBeTruthy()
  })

  describe(`should display all the links.`, () => {
    it(`should display the correct number of links.`, async () => {
      // Act
      const linkRefs = fixture.debugElement.queryAll(By.css(`[data-test="latest-chat-item"]`))

      // Assert
      expect(linkRefs.length).toBeTruthy()
      expect(linkRefs.length).toBe(testComponent.exampleLatestChats().length)
    })

    it(`should display the correct titles for each link.`, async () => {
      // Act
      const linkRefs = fixture.debugElement.queryAll(By.css(`[data-test="latest-chat-item"]`))

      // Assert
      expect(
        linkRefs.every(
          ({ nativeElement }, i) =>
            (nativeElement as HTMLAnchorElement).innerHTML.trim() ===
            testComponent.exampleLatestChats()[i].title
        )
      ).toBeTruthy()
    })

    it(`should display the correct href values for each link.`, async () => {
      // Act
      const linkRefs = fixture.debugElement.queryAll(By.css(`[data-test="latest-chat-item"]`))

      // Assert
      expect(
        linkRefs.every((el, i) =>
          el.attributes['href']?.includes(testComponent.exampleLatestChats()[i].id)
        )
      ).toBeTruthy()
    })
  })
})
