import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewStudingYearComponent } from './new-studing-year.component';

describe('NewStudingYearComponent', () => {
  let component: NewStudingYearComponent;
  let fixture: ComponentFixture<NewStudingYearComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewStudingYearComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewStudingYearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
