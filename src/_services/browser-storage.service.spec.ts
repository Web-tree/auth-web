import {TestBed} from '@angular/core/testing';

import {BrowserStorageService} from './browser-storage.service';

describe('BrowserStorageServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BrowserStorageService = TestBed.get(BrowserStorageService);
    expect(service).toBeTruthy();
  });
});
