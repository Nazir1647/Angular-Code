import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArrFormComponent } from './arr-form.component';

describe('ArrFormComponent', () => {
  let component: ArrFormComponent;
  let fixture: ComponentFixture<ArrFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ArrFormComponent]
    });
    fixture = TestBed.createComponent(ArrFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
