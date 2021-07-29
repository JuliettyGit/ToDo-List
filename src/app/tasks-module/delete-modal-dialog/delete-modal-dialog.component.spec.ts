import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteModalDialogComponent } from './delete-modal-dialog.component';

describe('DeleteModalDialogComponent', () => {
  let component: DeleteModalDialogComponent;
  let fixture: ComponentFixture<DeleteModalDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteModalDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteModalDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
