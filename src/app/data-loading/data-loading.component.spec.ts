import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DataLoadingComponent } from './data-loading.component';

describe('DataLoadingComponent', () => {
  let component: DataLoadingComponent;
  let fixture: ComponentFixture<DataLoadingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DataLoadingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataLoadingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
