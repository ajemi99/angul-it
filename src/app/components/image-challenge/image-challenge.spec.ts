import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageChallenge } from './image-challenge';

describe('ImageChallenge', () => {
  let component: ImageChallenge;
  let fixture: ComponentFixture<ImageChallenge>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ImageChallenge]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImageChallenge);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
