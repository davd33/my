import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersoWorksComponent } from './perso-works.component';

describe('PersoWorksComponent', () => {
  let component: PersoWorksComponent;
  let fixture: ComponentFixture<PersoWorksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersoWorksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersoWorksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
