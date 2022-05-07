import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecommendationpanelComponent } from './recommendationpanel.component';

describe('RecommendationpanelComponent', () => {
  let component: RecommendationpanelComponent;
  let fixture: ComponentFixture<RecommendationpanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecommendationpanelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecommendationpanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
