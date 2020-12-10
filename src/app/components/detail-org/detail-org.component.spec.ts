import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailOrgComponent } from './detail-org.component';

describe('DetailOrgComponent', () => {
  let component: DetailOrgComponent;
  let fixture: ComponentFixture<DetailOrgComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailOrgComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailOrgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
