import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl} from "@angular/platform-browser";
const CHROME = chrome;
import urlSteps from '../mocks/url_flows.json';
import { Router } from '@angular/router';
import {DomHandlerService} from "../services/dom-handler/dom-handler.service";
import {RecommendationpanelComponent} from "../recommendationpanel/recommendationpanel.component";
import {DomComponentsService} from "../services/dom-handler/dom-components.service";

@Component({
  selector: 'app-chatbox',
  templateUrl: './chatbox.component.html',
  styleUrls: ['./chatbox.component.css']
})
export class ChatboxComponent implements OnInit {
  private EXTENSION_URL = `chrome-extension://${CHROME.i18n.getMessage('@@extension_id')}`;
  assistantUrl: SafeResourceUrl;
  chartUrl: SafeResourceUrl;
  bulbUrl: SafeResourceUrl;
  learnMoreUrl: SafeResourceUrl;
  brightbulbUrl: SafeResourceUrl;
  isShowWindow = false;
  isShowRecommendation = false;
  urlFlow = {...urlSteps}
  constructor(private _domComponent: DomComponentsService, private domHandler: DomHandlerService, private _domSanitizer: DomSanitizer, private router: Router) {
    this.assistantUrl = this._domSanitizer.bypassSecurityTrustResourceUrl(
        this.EXTENSION_URL + '/assets/images/icon.png'
    );
    this.chartUrl = this._domSanitizer.bypassSecurityTrustResourceUrl(
        this.EXTENSION_URL + '/assets/images/chart.png'
    );
    this.bulbUrl = this._domSanitizer.bypassSecurityTrustResourceUrl(
        this.EXTENSION_URL + '/assets/images/bulb.svg'
    );
    this.learnMoreUrl = this._domSanitizer.bypassSecurityTrustResourceUrl(
        this.EXTENSION_URL + '/assets/images/learnmore.svg'
    );
    this.brightbulbUrl = this._domSanitizer.bypassSecurityTrustResourceUrl(
        this.EXTENSION_URL + '/assets/images/brightbulb.svg'
    );
  }

  ngOnInit(): void {
  }

  openWindow() {
    this.isShowWindow = true;
  }

  closeWindow() {
    this.isShowWindow = false;
  }

  openCloseRecommendation(){
    this.isShowRecommendation = !this.isShowRecommendation
  }

}
