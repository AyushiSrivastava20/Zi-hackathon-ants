import {Component, Input, OnInit, Output} from '@angular/core';
import recommendations from '../mocks/recommendations.json';
import leaderboards from '../mocks/leaderboards.json'
import {DomSanitizer} from "@angular/platform-browser";
const CHROME = chrome;
import {EventEmitter} from '@angular/core';

export interface Recommendation {
  recommendation: string,
  tittle: string,
  buttonAction: string,
  points: string,
  extra: string,
  imageName: string,
  reco: number
}

export interface Leaderboards {
  name: string,
  points: number,
  level: number,
}

@Component({
  selector: 'app-recommendationpanel',
  templateUrl: './recommendationpanel.component.html',
  styleUrls: ['./recommendationpanel.component.css']
})
export class RecommendationpanelComponent implements OnInit {
  private EXTENSION_URL = `chrome-extension://${CHROME.i18n.getMessage('@@extension_id')}`;
  chartPointUrl;
  closeIconUrl;
  level1Url;
  level2Url;
  level3Url;
  level4Url;
  linkedInIconUrl;
  points = 600;
  @Input() activeTabId = 1;
  recommendationsList: Recommendation[] = recommendations;
  leaderboardsList: Leaderboards[] = leaderboards;
  @Output() closePanelEmit = new EventEmitter<boolean>();
  constructor(private _domSanitizer: DomSanitizer) {
    this.chartPointUrl = this._domSanitizer.bypassSecurityTrustResourceUrl(
        this.EXTENSION_URL + '/assets/images/level3zoom.svg'
    );
    this.closeIconUrl = this._domSanitizer.bypassSecurityTrustResourceUrl(
        this.EXTENSION_URL + '/assets/images/closeIconBlack.svg'
    );
    this.level1Url = this._domSanitizer.bypassSecurityTrustResourceUrl(
        this.EXTENSION_URL + '/assets/images/level1.svg'
    );
    this.level2Url = this._domSanitizer.bypassSecurityTrustResourceUrl(
        this.EXTENSION_URL + '/assets/images/level2.svg'
    );
    this.level3Url = this._domSanitizer.bypassSecurityTrustResourceUrl(
        this.EXTENSION_URL + '/assets/images/level3.svg'
    );
    this.level4Url = this._domSanitizer.bypassSecurityTrustResourceUrl(
        this.EXTENSION_URL + '/assets/images/level4.svg'
    );
    this.linkedInIconUrl = this._domSanitizer.bypassSecurityTrustResourceUrl(
        this.EXTENSION_URL + '/assets/images/linkedin.svg'
    );
    setTimeout(() => {
      this.points = 1000;
    }, 5000)
  }

  ngOnInit(): void {
  }

  closePanel() {
    this.closePanelEmit.emit(false);
  }

  changetab(tabId) {
    this.activeTabId = tabId;
  }

  getSrc(level){
         if(level === 1)return this.level1Url;
    else if(level === 2)return this.level2Url;
    else if(level === 3)return this.level3Url;
    else if(level === 4)return this.level4Url;
  }

  getId(r){
    return ""
  }

}
