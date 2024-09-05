import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoFirstComponent } from './todo-first.component';

describe('TodoFirstComponent', () => {
  let component: TodoFirstComponent;
  let fixture: ComponentFixture<TodoFirstComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TodoFirstComponent]
    });
    fixture = TestBed.createComponent(TodoFirstComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
