import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IsoroboComponent } from './isorobo.component';

describe('IsoroboComponent', () => {
  let component: IsoroboComponent;
  let fixture: ComponentFixture<IsoroboComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [IsoroboComponent]
    });
    fixture = TestBed.createComponent(IsoroboComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
