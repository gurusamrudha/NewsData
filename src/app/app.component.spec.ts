import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { Subscription } from 'rxjs';
import { cold } from 'jasmine-marbles';
import { NewsUtilService } from '../services/news-util.service';
import { AppComponent } from './app.component';
import { MOCK_DATA } from '../shared/mocks/mock';
import { injectMocked, provideMockObject } from '../shared/mocks/mock.test-utils';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let getDataService: jest.Mocked<NewsUtilService>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppComponent],
      imports: [HttpClientTestingModule],
      providers: [provideMockObject(NewsUtilService)],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    getDataService = injectMocked(NewsUtilService);
    getDataService.getAllData.mockReturnValue(cold('a', { a: MOCK_DATA }));

  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call clear all filters method on Initialization', () => {
    const clearFilterSpy = jest.spyOn(component, 'clearFilters');
    component.ngOnInit();
    expect(clearFilterSpy).toHaveBeenCalled();
  });

  it('should clear all filters on Initialization', () => {
    component.clearFilters();
    expect(component.selectedCategory).toBe('');
    expect(component.selectedLanguage).toBe('');
  });

  it('should call filterchanged method upon clearFilter', () => {
    const filterChangedSpy = jest.spyOn(component, 'filtersChanged');
    component.clearFilters();
    expect(filterChangedSpy).toHaveBeenCalled();
  });

  it('should make a service call getAllData with language filter upon filterChanged', () => {
    component.selectedLanguage = 'en';
    component.filtersChanged();
    expect(getDataService.getAllData).toBeCalledWith('en', '');
  });

  it('should make a service call getAllData with Catagory filter upon filterChanged', () => {
    component.selectedCategory = 'sports';
    component.filtersChanged();
    expect(getDataService.getAllData).toBeCalledWith('', 'sports');
  });

  it('should make a service call getAllData with both catagory and language filter upon filterChanged', () => {
    component.selectedCategory = 'sports';
    component.selectedLanguage = 'en';
    component.filtersChanged();
    expect(getDataService.getAllData).toBeCalledWith('en', 'sports');
  });

  it('should make a service call and return NewsData', () => {
    component.filtersChanged();
    expect(component.data$).toBeObservable(cold('a', { a: MOCK_DATA.results }));
  });

  it('should trigger value change upon adding new Filter', fakeAsync(() => {
    fixture.detectChanges();
    component.filtersChanged();
    tick(0);
    expect(component.data$).toBeObservable(cold('a', { a: MOCK_DATA.results }));
    component.clockSub.unsubscribe();
  }));

  it('should trigger value change upon timer', fakeAsync(() => {
    const newSub: Subscription = component.timerSub();
    tick(0);
    expect(component.data$).toBeObservable(cold('a', { a: MOCK_DATA.results }));
    newSub.unsubscribe();
  }));
});
