import {Component, OnInit, Output} from '@angular/core';
import recommendations from '../mocks/recommendations.json';
import {DomSanitizer} from "@angular/platform-browser";
const CHROME = chrome;
import {EventEmitter} from '@angular/core';

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
  closeIconUrl
  recommendationsList: Recommendation[] = recommendations;
  @Output() closePanelEmit = new EventEmitter<boolean>();
  constructor(private _domSanitizer: DomSanitizer) {
    this.chartPointUrl = this._domSanitizer.bypassSecurityTrustResourceUrl(
        this.EXTENSION_URL + '/assets/images/level3zoom.svg'
    );
    this.closeIconUrl = this._domSanitizer.bypassSecurityTrustResourceUrl(
        this.EXTENSION_URL + '/assets/images/closeIconBlack.svg'
    );
  }

  ngOnInit(): void {
  }

  closePanel() {
    this.closePanelEmit.emit(false);
  }

}
