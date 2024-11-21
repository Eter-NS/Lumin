import { ComponentFixture, TestBed } from '@angular/core/testing'
import { ChatLibraryComponent } from './chat-library.component'

describe('ChatLibraryComponent', () => {
  let component: ChatLibraryComponent
  let fixture: ComponentFixture<ChatLibraryComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChatLibraryComponent],
    }).compileComponents()

    fixture = TestBed.createComponent(ChatLibraryComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
