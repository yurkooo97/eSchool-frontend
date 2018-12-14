import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpinnerKitComponent } from './spinner-kit.component';

describe('SpinnerKitComponent', () => {
  let component: SpinnerKitComponent;
  let fixture: ComponentFixture<SpinnerKitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpinnerKitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpinnerKitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
