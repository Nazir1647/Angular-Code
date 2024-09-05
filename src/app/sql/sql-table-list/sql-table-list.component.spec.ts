import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SqlTableListComponent } from './sql-table-list.component';

describe('SqlTableListComponent', () => {
  let component: SqlTableListComponent;
  let fixture: ComponentFixture<SqlTableListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SqlTableListComponent]
    });
    fixture = TestBed.createComponent(SqlTableListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
