import { RawData } from "src/models/news-item";
import { Selector } from '../../models/selector-model';

export const MOCK_DATA: RawData = {
  nextPage: 11,
  results: [{
    content: 'qqq',
    country: ['qqq'],
    creator: ['www'],
    description: 'dddddsdsd',
    image_url: 'http://fake.com',
    language: 'en',
    link: 'http://PKV.samu',
    pubDate: new Date(11112222),
    title: 'Hello'
  }]
}

export const languagesMock: Selector[] = [
  {value: 'en', viewValue: 'English'},
  {value: 'es', viewValue: 'Spanish'},
  {value: 'fr', viewValue: 'French'},
  {value: 'jp', viewValue: 'Japanese'},
  {value: 'pt', viewValue: 'Portuguese '},
];

export const catagoriesMock: Selector[] = [
  {value: 'business', viewValue: 'Business'},
  {value: 'entertainment', viewValue: 'Entertainment'},
  {value: 'environment', viewValue: 'Environment'},
  {value: 'food', viewValue: 'Food'},
  {value: 'health', viewValue: 'Health '},
  {value: 'politics', viewValue: 'Politics'},
  {value: 'science', viewValue: 'Science'},
  {value: 'sports', viewValue: 'Sports'},
  {value: 'technology', viewValue: 'Technology'},
  {value: 'top', viewValue: 'Top'},
  {value: 'world', viewValue: 'World'},
]
