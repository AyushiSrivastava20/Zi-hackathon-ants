import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ChatboxComponent } from './chatbox/chatbox.component';
import { RecommendationpanelComponent } from './recommendationpanel/recommendationpanel.component';
import { FlowhelperComponent } from './flowhelper/flowhelper.component';
import { TextComponent } from './text/text.component';
import {DomComponentsService} from "./services/dom-handler/dom-components.service";
import {DomHandlerService} from "./services/dom-handler/dom-handler.service";
import { ButtonComponent } from './button/button.component';

@NgModule({
  declarations: [
    AppComponent,
    ChatboxComponent,
    RecommendationpanelComponent,
    FlowhelperComponent,
    TextComponent,
    ButtonComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  exports: [
    ChatboxComponent,
  ],
  providers: [DomComponentsService, DomHandlerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
