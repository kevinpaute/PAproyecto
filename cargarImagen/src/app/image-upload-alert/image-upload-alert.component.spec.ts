import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageUploadAlertComponent } from './image-upload-alert.component';

describe('ImageUploadAlertComponent', () => {
  let component: ImageUploadAlertComponent;
  let fixture: ComponentFixture<ImageUploadAlertComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ImageUploadAlertComponent]
    });
    fixture = TestBed.createComponent(ImageUploadAlertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
