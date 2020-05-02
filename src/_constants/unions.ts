import {InjectionToken} from '@angular/core';

export const unions: UnionMap = {
  mydata: {key: 'mydata', name: 'My Data', url: 'https://mydata.webtree.org/applyToken'},
  imprint: {key: 'imprint', name: 'Imprint', url: 'https://imprint.webtree.org/applyToken'}
};

export interface Union {
  key: string;
  name: string;
  url: string;
}

export type UnionMap = Record<string, Union>;

export const UNIONS_TOKEN = new InjectionToken<UnionMap>('unions');
