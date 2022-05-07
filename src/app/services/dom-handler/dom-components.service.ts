import {
  ApplicationRef,
  ComponentFactoryResolver,
  ComponentRef,
  EmbeddedViewRef,
  Injectable,
  Injector,
} from '@angular/core';

/**
 * DomComponentsService allows Angular components to be created dynamically so we can attach
 * to the DOM elements
 * Note: Add the components to entryComponents in AppModule to use this service.
 */
@Injectable({
  providedIn: 'root',
})
export class DomComponentsService {
  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private appRef: ApplicationRef,
    private injector: Injector
  ) {}

  /**
   * Creates the component reference
   *
   * Use the ComponentFactoryResolver to create a reference of the given component
   * To allow change detection on the component attach it to the ApplicationRef
   *
   * @param component
   * returns ComponentRef
   */
  createComponentRef(component: any): ComponentRef<any> {
    const componentRef = this.componentFactoryResolver.resolveComponentFactory(component).create(this.injector);
    this.appRef.attachView(componentRef.hostView);
    return componentRef;
  }

  /**
   * Get the DOM element from the Component Ref
   * @param componentRef
   */
  getDomElementFromComponentRef(componentRef: ComponentRef<any>): HTMLElement {
    return (componentRef.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement;
  }

  /**
   * append the Element to a parent element
   * @param child
   * @param parent
   */
  addChild(child: HTMLElement, parent: HTMLElement = document.body) {
    parent.appendChild(child);
  }

  /**
   * Destroy the reference of component
   * @param componentRef
   * @param delay in seconds
   */
  destroyRef(componentRef: ComponentRef<any>, delay: number) {
    setTimeout(() => {
      this.appRef.detachView(componentRef.hostView);
      componentRef.destroy();
    }, delay);
  }
}
