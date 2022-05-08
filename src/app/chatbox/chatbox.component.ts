import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl} from "@angular/platform-browser";
const CHROME = chrome;
import urlSteps from '../mocks/url_flows.json';
import {NavigationEnd, NavigationStart} from "@angular/router"; // This import style requires "esModuleInterop", see "side notes"
import { Router } from '@angular/router';
import {DomHandlerService} from "../services/dom-handler/dom-handler.service";

@Component({
  selector: 'app-chatbox',
  templateUrl: './chatbox.component.html',
  styleUrls: ['./chatbox.component.css']
})
export class ChatboxComponent implements OnInit {
  private EXTENSION_URL = `chrome-extension://${CHROME.i18n.getMessage('@@extension_id')}`;
  assistantUrl: SafeResourceUrl;
  chartUrl: SafeResourceUrl;
  isShowWindow = false;
  urlFlow = {...urlSteps}
  constructor(private domHandler: DomHandlerService, private _domSanitizer: DomSanitizer, private router: Router) {
    this.assistantUrl = this._domSanitizer.bypassSecurityTrustResourceUrl(
        this.EXTENSION_URL + '/assets/images/icon.png'
    );
    this.chartUrl = this._domSanitizer.bypassSecurityTrustResourceUrl(
        this.EXTENSION_URL + '/assets/images/chart.png'
    );
  }

  ngOnInit(): void {
    this.getPositionOfAssistant();
  }

  openWindow() {
    this.isShowWindow = true;
  }

  closeWindow() {
    this.isShowWindow = false;
  }

  // TODO: change this
  getPositionOfAssistant() {
    const element = document.getElementById('assistant');
    const { top, bottom, right, height } = element.getBoundingClientRect();
    // const panel = document.getElementById('recommend-panel')
    // panel.style.bottom = `${height + 100}px` ;
  }

}
