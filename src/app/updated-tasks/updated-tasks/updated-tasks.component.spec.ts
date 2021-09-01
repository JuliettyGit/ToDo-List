import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatedTasksComponent } from './updated-tasks.component';

describe('UpdatedTasksComponent', () => {
  let component: UpdatedTasksComponent;
  let fixture: ComponentFixture<UpdatedTasksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdatedTasksComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdatedTasksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
