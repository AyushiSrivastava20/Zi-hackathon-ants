import {Component, OnDestroy, OnInit} from '@angular/core';
import {DomComponentsService} from "./services/dom-handler/dom-components.service";
import {ChatboxComponent} from "./chatbox/chatbox.component";
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";
import {RecommendationpanelComponent} from "./recommendationpanel/recommendationpanel.component";

@Component({
  selector: 'app-zi-hackathon-ants',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy{
  title = 'Zi-hackathon-ants';
  componentRefs: any[]=[];
  constructor(private _domComponent: DomComponentsService, private router: Router, private activatedRoute: ActivatedRoute) {
    this.router.events
        .subscribe((event: any) => {
          console.log(event);
        });
    this.activatedRoute.paramMap.subscribe(paramMap  =>  {
      console.log(paramMap)
    });
  }

  ngOnInit(): void {
    const chatBoxEle = this.initiateChatBoxComponent();
    document.body.append(chatBoxEle);
    const panel = this.initiatePanelComponent();
    document.body.append(panel);
  }

  /**
   * returns reference of ChatboxComponent component as HTMLElement
   */
  private initiateChatBoxComponent(): HTMLElement {
    const compRefAttach = this._domComponent.createComponentRef(ChatboxComponent);
    this.componentRefs.push(compRefAttach);
    return this._domComponent.getDomElementFromComponentRef(compRefAttach);
  }

  /**
   * returns reference of ChatboxComponent component as HTMLElement
   */
  private initiatePanelComponent(): HTMLElement {
    const compRefAttach1 = this._domComponent.createComponentRef(RecommendationpanelComponent);
    this.componentRefs.push(compRefAttach1);
    return this._domComponent.getDomElementFromComponentRef(compRefAttach1);
  }

  ngOnDestroy(): void {
  }
}
