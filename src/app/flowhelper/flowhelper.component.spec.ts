import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlowhelperComponent } from './flowhelper.component';

describe('FlowhelperComponent', () => {
  let component: FlowhelperComponent;
  let fixture: ComponentFixture<FlowhelperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FlowhelperComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FlowhelperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
