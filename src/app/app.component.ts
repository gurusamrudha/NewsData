import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, map, Observable, Subscription, timer } from 'rxjs';
import { NewsItem, RawData } from 'src/models/news-item';
import { NewsUtilService } from '../services/news-util.service';
import { catagoriesMock, languagesMock } from '../shared/mocks/mock';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit, OnDestroy {
  public data$?: Observable<NewsItem[]>;
  clockSub = new Subscription();
  catagories = catagoriesMock;
  languages = languagesMock;
  imagePlaceholder = 'https://images.pexels.com/photos/356079/pexels-photo-356079.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500';
  selectedLanguage: string = '';
  selectedCategory: string = '';
  valueChanged = new BehaviorSubject<boolean>(false);

  constructor(private newsUtilService: NewsUtilService) {}

  /**
   * Initialization part
   */
  ngOnInit(): void {
    this.clearFilters();
    this.clockSub = this.timerSub();
  }

  /**
   * Unsubscribe all observables upon Destroy
   */
  ngOnDestroy(): void {
    this.clockSub.unsubscribe();
  }

  /**
   * Trigger API on every 60 sec and initially with 0 delay
   * @returns Just an subscription which takes unsubscribe method on destroy
   */
  timerSub(): Subscription {
    return timer(0, 30000).subscribe(() => {
      this.data$ = this.getAllNewsData();
    });
  }

  /**
   * Each time whrn filter changes make an api call
   */
  public filtersChanged(): void {
    this.data$ = this.getAllNewsData();
  }

  /**
   *
   * @returns Method to generate API end point request
   */
  private getAllNewsData(): Observable<NewsItem[]> {
    return this.newsUtilService.getAllData(this.selectedLanguage, this.selectedCategory).pipe(
      map((r: RawData) => r.results));
  }

  /**
   * Clear or Reset Filters
   */
  public clearFilters(): void {
    this.selectedLanguage = '';
    this.selectedCategory = '';
    this.filtersChanged();
  }
}
