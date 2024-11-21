import { ChangeDetectionStrategy, Component } from '@angular/core'
import { CommonModule } from '@angular/common'

@Component({
  selector: 'app-chat-library',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './chat-library.component.html',
  styleUrl: './chat-library.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatLibraryComponent {}
