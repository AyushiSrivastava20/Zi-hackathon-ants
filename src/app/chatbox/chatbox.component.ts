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
  isFlowRunning = false;
  isShowRecommendation = false;
  urlFlow = {...urlSteps};
  oldHrefSub: BehaviorSubject<any>;
  message;
  path;
  buttonText: any[];
  currentPathStepIndex = 0;
  closeIconUrl;
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
    this.closeIconUrl = this._domSanitizer.bypassSecurityTrustResourceUrl(
        this.EXTENSION_URL + '/assets/images/closeIconBlack.svg'
    );
  }

  ngOnInit(): void {
    this.setUpLocationChange();
    this.oldHrefSub.subscribe(route => {
      if (route) {
        this.currentPathStepIndex = 0;
        this.path = route.split('#')[1];
        const homeUrls: any[] = this.urlFlow[this.path];
        this.message = homeUrls[this.currentPathStepIndex]?.stepDescription;
        this.buttonText = homeUrls[this.currentPathStepIndex]?.button;
        this.isFlowRunning = false;
        switch (this.path) {
          case '/apps/home-page':
            this.homePageHandling();
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
    console.log('handleFormCompleteSubmission');
  }

  handleFormCompleteManagement() {
    this.isFlowRunning = true;
    const insentWidgetCheckElement = async selector => {
      while ( document.querySelector(selector) === null) {
        await new Promise( resolve =>  requestAnimationFrame(resolve) )
      }
      return true;
    };
    insentWidgetCheckElement('#btn-create-new-form').then((selector) => {
      setTimeout(() => {
        this.startAnimation('#btn-create-new-form');
      }, 3000)
    });
    insentWidgetCheckElement('[automationid="action-button-dropdown-li-auto mapping"]').then((selector) => {
      console.log("happening");
      setTimeout(() => {
        this.startAnimation('[automationid="action-button-dropdown-li-auto mapping"]');
      }, 3000)
    });
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

  stopFlow() {
    this.isFlowRunning = false;
  }

  openCloseRecommendation(){
    this.isShowRecommendation = !this.isShowRecommendation;
    //this.isShowWindow = false;
  }
  closeRecommendation() {
    this.isShowRecommendation = false;
  }

  showMe() {
    switch (this.path) {
      case '/apps/home-page':
        this.startAnimation("#show-more-down-arrow > div > div.navbar-item-content-name");
        break;
      case '/apps/marketing/form-complete/analytics':
        this.startAnimation("#zi-marketing-sidebar-management");
        break;
      case '/apps/marketing/form-complete/wizard/new':
        this.handleFormCompleteSubmission();
        break;
      default:
    }
  }

  startAnimation(selector) {
    let moreOptionsDiv = document.querySelector(selector);
    let moreOptionsPosition = moreOptionsDiv.getBoundingClientRect();
    console.log("moreOptionsPosition", moreOptionsPosition);
    let dimmer = document.getElementById("dimmer");
    var style = document.createElement('style');
    style.type = 'text/css';
    let random_number = Math.floor(Math.random()*10000);
    var keyFrames = '\
                @keyframes highlight'+random_number+' {\
                  0% {\
                    height: 120vh;\
                    width: 120vw;\
                    top:0;\
                    left:0;\
                    opacity: 1;\
                  }\
                  \
                  12% {\
                    height: '+(moreOptionsPosition.height+6).toString()+'px;\
                    width: '+(moreOptionsPosition.width+10).toString()+'px;\
                    top: '+(moreOptionsPosition.top-3).toString()+'px;\
                    left: '+(moreOptionsPosition.left-5).toString()+'px;\
                    opacity: 1;\
                  }\
                  100%{\
                    height: '+(moreOptionsPosition.height+6).toString()+'px;\
                    width: '+(moreOptionsPosition.width+10).toString()+'px;\
                    top: '+(moreOptionsPosition.top-3).toString()+'px;\
                    left: '+(moreOptionsPosition.left-5).toString()+'px;\
                    opacity: 0;\
                  }\
                }';
    style.innerHTML = keyFrames;
    document.getElementsByTagName('head')[0].appendChild(style);
    dimmer.style.animation = "highlight"+random_number+" 4s ease-out forwards";
  }

}
