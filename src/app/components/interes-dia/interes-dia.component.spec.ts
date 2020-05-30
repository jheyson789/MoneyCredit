import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InteresDiaComponent } from './interes-dia.component';

describe('InteresDiaComponent', () => {
  let component: InteresDiaComponent;
  let fixture: ComponentFixture<InteresDiaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InteresDiaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InteresDiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
