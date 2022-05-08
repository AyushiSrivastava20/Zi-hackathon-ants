import { Component, OnInit } from '@angular/core';
import recommendations from '../mocks/recommendations.json';
import {DomSanitizer} from "@angular/platform-browser";
const CHROME = chrome;

export interface Recommendation {
  recommendation: string,
  tittle: string,
  buttonAction: string,
  points: string,
  extra: string,
  imageName: string
}
@Component({
  selector: 'app-recommendationpanel',
  templateUrl: './recommendationpanel.component.html',
  styleUrls: ['./recommendationpanel.component.css']
})
export class RecommendationpanelComponent implements OnInit {
  private EXTENSION_URL = `chrome-extension://${CHROME.i18n.getMessage('@@extension_id')}`;
  chartPointUrl
  recommendationsList: Recommendation[] = recommendations;
  constructor(private _domSanitizer: DomSanitizer) {
    this.chartPointUrl = this._domSanitizer.bypassSecurityTrustResourceUrl(
        this.EXTENSION_URL + '/assets/images/chart_point.svg'
    );
  }

  ngOnInit(): void {
  }

}
