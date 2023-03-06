import { TestBed } from '@angular/core/testing';

import { ImageProsService } from './image-pros.service';

describe('ImageProsService', () => {
  let service: ImageProsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ImageProsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
