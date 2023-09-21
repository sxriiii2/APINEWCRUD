import { TestBed } from '@angular/core/testing';

import { MyInterceptor } from './my-interceptor.service';

describe('MyInterceptorService', () => {
  let service: MyInterceptor;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MyInterceptor);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
