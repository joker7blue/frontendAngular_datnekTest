import { TestBed } from '@angular/core/testing';

import { LangSerciveService } from './lang-sercive.service';

describe('LangSerciveService', () => {
  let service: LangSerciveService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LangSerciveService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
