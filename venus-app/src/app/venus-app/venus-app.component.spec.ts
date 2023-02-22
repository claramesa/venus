import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VenusAppComponent } from './venus-app.component';

describe('VenusAppComponent', () => {
  let component: VenusAppComponent;
  let fixture: ComponentFixture<VenusAppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VenusAppComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VenusAppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
