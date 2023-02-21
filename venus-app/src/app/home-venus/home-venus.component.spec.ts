import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeVenusComponent } from './home-venus.component';

describe('HomeVenusComponent', () => {
  let component: HomeVenusComponent;
  let fixture: ComponentFixture<HomeVenusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeVenusComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeVenusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
