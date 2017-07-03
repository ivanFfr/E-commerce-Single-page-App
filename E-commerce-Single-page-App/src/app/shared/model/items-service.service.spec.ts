import { TestBed, inject } from '@angular/core/testing';

import { ItemsService } from './items-service.service';

describe('ItemsServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ItemsService]
    });
  });

  it('should be created', inject([ItemsService], (service: ItemsService) => {
    expect(service).toBeTruthy();
  }));
});
