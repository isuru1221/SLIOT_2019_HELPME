import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccidentsComponent } from './accidents.component';

describe('AccidentsComponent', () => {
  let component: AccidentsComponent;
  let fixture: ComponentFixture<AccidentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccidentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccidentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
