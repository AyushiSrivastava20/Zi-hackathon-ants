import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl} from "@angular/platform-browser";
const CHROME = chrome;
import urlSteps from '../mocks/url_flows.json';
import { Router } from '@angular/router';
import {DomHandlerService} from "../services/dom-handler/dom-handler.service";
import {DomComponentsService} from "../services/dom-handler/dom-components.service";
import {BehaviorSubject} from "rxjs";

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
  urlFlow = {...urlSteps};
  oldHrefSub: BehaviorSubject<any>;

  constructor(private _domComponent: DomComponentsService, private domHandler: DomHandlerService, private _domSanitizer: DomSanitizer, private router: Router) {
    this.oldHrefSub = new BehaviorSubject(null);
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
    // console.log(this.urlFlow['apps/home-page'])
  }

  ngOnInit(): void {
    this.setUpLocationChange();
    this.oldHrefSub.subscribe(route => {
      if (route) {
        const path = route.split('#')[1];
        switch (path) {
          case '/apps/home-page':
            this.homePageHandling();
            setTimeout(() => {
              console.log('DOM fully loaded and parsed');
              let moreOptionsDiv = document.querySelector("#show-more-down-arrow > div > div.navbar-item-content-name");
              let moreOptionsPosition = moreOptionsDiv.getBoundingClientRect();
              console.log("moreOptionsPosition", moreOptionsPosition);
              let dimmer = document.getElementById("dimmer");
              var style = document.createElement('style');
              style.type = 'text/css';
              var keyFrames = '\
                @keyframes highlight {\
                  0% {\
                    height: 120vh;\
                    width: 120vw;\
                    top:0;\
                    left:0;\
                    opacity: 1;\
                  }\
                  \
                  12% {\
                    height: '+moreOptionsPosition.height.toString()+'px;\
                    width: '+(moreOptionsPosition.width+18).toString()+'px;\
                    top: '+moreOptionsPosition.top.toString()+'px;\
                    left: '+moreOptionsPosition.left.toString()+'px;\
                    opacity: 1;\
                  }\
                  100%{\
                    height: '+moreOptionsPosition.height.toString()+'px;\
                    width: '+(moreOptionsPosition.width+18).toString()+'px;\
                    top: '+moreOptionsPosition.top.toString()+'px;\
                    left: '+moreOptionsPosition.left.toString()+'px;\
                    opacity: 0;\
                  }\
                }';
              style.innerHTML = keyFrames;
              document.getElementsByTagName('head')[0].appendChild(style);
              dimmer.style.animation = "highlight 4s ease-out forwards";

            }, 5000);
            break;
          case '/apps/marketing/form-complete/analytics':
            this.handleFormCompleteAnalytics();
            break;
          case '/apps/marketing/form-complete/management':
            this.handleFormCompleteManagement();
            break;
          case '/apps/marketing/form-complete/wizard/new':
            this.handleFormCompleteSubmission();
            break;
          default:
        }
      }
    });
  }

  handleFormCompleteSubmission() {

  }

  handleFormCompleteManagement() {

  }

  homePageHandling() {

  }

  handleFormCompleteAnalytics() {

  }

  setUpLocationChange() {
    let observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (this.oldHrefSub.value != document.location.href) {
          this.oldHrefSub.next(document.location.href);
        }
      });
    });
    const config = {
      childList: true,
      subtree: true
    };
    observer.observe(document, config);
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
