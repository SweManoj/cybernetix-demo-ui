import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PolicyViolatedUsersComponent } from './policy-violated-users.component';

describe('PolicyViolatedUsersComponent', () => {
  let component: PolicyViolatedUsersComponent;
  let fixture: ComponentFixture<PolicyViolatedUsersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PolicyViolatedUsersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PolicyViolatedUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
