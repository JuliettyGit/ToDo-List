import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertModalDialogComponent } from './alert-modal-dialog.component';

describe('AlertModalDialogComponent', () => {
  let component: AlertModalDialogComponent;
  let fixture: ComponentFixture<AlertModalDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlertModalDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AlertModalDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
