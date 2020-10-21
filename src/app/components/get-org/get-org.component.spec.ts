import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GetOrgComponent } from './get-org.component';

describe('GetOrgComponent', () => {
  let component: GetOrgComponent;
  let fixture: ComponentFixture<GetOrgComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GetOrgComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GetOrgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
