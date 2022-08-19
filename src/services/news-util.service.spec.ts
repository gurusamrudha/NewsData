import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { environment } from '../environments/environment';
import { RawData } from '../models/news-item';
import { MOCK_DATA } from '../shared/mocks/mock';
import { NewsUtilService } from './news-util.service';

describe('NewsUtilService', () => {
  let service: NewsUtilService;
  let httpController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        NewsUtilService
      ],
    });

    service = TestBed.inject(NewsUtilService);
    httpController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
      expect(service).toBeTruthy();
      expect(httpController).toBeTruthy();
  });

  it('should call getAllData with no filters and have a response', fakeAsync(() => {
    let response = {} as RawData;
    const lang = '';
    const category = '';
    service.getAllData(lang, category).subscribe((result: RawData) => {
      response = result;
    });

    const req = httpController.expectOne(environment.apiUrl);
    expect(req.request.method).toBe('GET');
    req.flush(MOCK_DATA);
    tick();
    httpController.verify();
    expect(response).toBeDefined();
    expect(response).toEqual(MOCK_DATA);
  }));

  it('should call getAllData with language filter alone and have a response', fakeAsync(() => {
    let response = {} as RawData;
    const lang = 'en';
    const category = '';
    service.getAllData(lang, category).subscribe((result: RawData) => {
      response = result;
    });

    const req = httpController.expectOne(`${environment.apiUrl}&language=${lang}`);
    expect(req.request.method).toBe('GET');
    req.flush(MOCK_DATA);
    tick();
    httpController.verify();
    expect(response).toBeDefined();
    expect(response).toEqual(MOCK_DATA);
  }));

  it('should call getAllData with catergory filter alone and have a response', fakeAsync(() => {
    let response = {} as RawData;
    const lang = '';
    const category = 'sports';
    service.getAllData(lang, category).subscribe((result: RawData) => {
      response = result;
    });

    const req = httpController.expectOne(`${environment.apiUrl}&category=${category}`);
    expect(req.request.method).toBe('GET');
    req.flush(MOCK_DATA);
    tick();
    httpController.verify();
    expect(response).toBeDefined();
    expect(response).toEqual(MOCK_DATA);
  }));

  it('should call getAllData with both language and catergory filter and have a response', fakeAsync(() => {
    let response = {} as RawData;
    const lang = 'en';
    const category = 'sports';
    service.getAllData('en', 'sports').subscribe((result: RawData) => {
      response = result;
    });

    const req = httpController.expectOne(`${environment.apiUrl}&language=${lang}&category=${category}`);
    expect(req.request.method).toBe('GET');
    req.flush(MOCK_DATA);
    tick();
    httpController.verify();
    expect(response).toBeDefined();
    expect(response).toEqual(MOCK_DATA);
  }));
});

