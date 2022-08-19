import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { NewsItem } from '../../models/news-item';


@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardsComponent {
  @Input() articles?: NewsItem[];
  @Input() imagePlaceholder?: string;
}
