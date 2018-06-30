import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransportSpeedCalculatorComponent } from './transport-speed-calculator.component';

describe('TransportSpeedCalculatorComponent', () => {
  let component: TransportSpeedCalculatorComponent;
  let fixture: ComponentFixture<TransportSpeedCalculatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransportSpeedCalculatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransportSpeedCalculatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
