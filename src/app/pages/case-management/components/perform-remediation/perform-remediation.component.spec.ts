import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PerformRemediationComponent } from './perform-remediation.component';

describe('PerformRemediationComponent', () => {
  let component: PerformRemediationComponent;
  let fixture: ComponentFixture<PerformRemediationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PerformRemediationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PerformRemediationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
