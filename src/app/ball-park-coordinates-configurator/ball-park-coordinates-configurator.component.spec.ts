import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BallParkCoordinatesConfiguratorComponent } from './ball-park-coordinates-configurator.component';

describe('BallParkCoordinatesConfiguratorComponent', () => {
  let component: BallParkCoordinatesConfiguratorComponent;
  let fixture: ComponentFixture<BallParkCoordinatesConfiguratorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BallParkCoordinatesConfiguratorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BallParkCoordinatesConfiguratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
