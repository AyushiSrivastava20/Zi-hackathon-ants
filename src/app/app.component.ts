import {Component, OnDestroy, OnInit} from '@angular/core';
import {DomComponentsService} from "./services/dom-handler/dom-components.service";
import {ChatboxComponent} from "./chatbox/chatbox.component";
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";

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
  }

  /**
   * returns reference of ChatboxComponent component as HTMLElement
   */
  private initiateChatBoxComponent(): HTMLElement {
    const compRefAttach = this._domComponent.createComponentRef(ChatboxComponent);
    this.componentRefs.push(compRefAttach);
    return this._domComponent.getDomElementFromComponentRef(compRefAttach);
  }

  ngOnDestroy(): void {
  }
}
