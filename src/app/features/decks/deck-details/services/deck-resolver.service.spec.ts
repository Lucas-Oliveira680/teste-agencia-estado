import { TestBed } from '@angular/core/testing';

import { DeckResolverService } from './deck-resolver.service';

describe('DeckResolverService', () => {
  let service: DeckResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DeckResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
