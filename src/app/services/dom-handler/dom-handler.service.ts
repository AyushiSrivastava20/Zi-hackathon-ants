import { Injectable } from '@angular/core';

/**
 * Get info of dom elements functions and change dom elements functions
 */
@Injectable({
  providedIn: 'root',
})
export class DomHandlerService {
  constructor() {}

  /**
   * Remove all instances of element from DOM by tag name
   * @param nodeName name of the node to remove from DOM
   */
  removeAllElementsByTagName(nodeName: string): void {
    const elements = Array.from(document.getElementsByTagName(nodeName));
    elements.forEach((element) => {
      element.remove();
    });
  }

  /**
   * creates DOM element
   * @param nodeName
   */
  createElement(nodeName: string) {
    return document.createElement(nodeName);
  }

  /**
   * set style to the Dom element
   * @param element
   * @param style
   * @param value
   */
  setStyle(element: HTMLElement, style: string, value: string): void {
    if (element) {
      element.style[style] = value;
    }
  }

  /**
   * Set multiple styles
   * @param element html element
   * @param propertyObject contain keys and values for styles attributes
   * type is any as the properties become the keys of object
   */
  setMultipleStyles(element: HTMLElement, propertyObject: any): void {
    if (element) {
      Object.keys(propertyObject).forEach((key, value) => {
        element.style[key] = propertyObject[key];
      });
    }
  }

  /**
   * inserts DOM Element before the parent node
   * @param element
   * @param referenceNode
   */
  insertBefore(element: HTMLElement, referenceNode: HTMLElement): void {
    referenceNode.parentNode.insertBefore(element, referenceNode);
  }

  /**
   * inserts DOM Element after the parent node
   * @param element
   * @param referenceNode
   */
  insertAfter(element: HTMLElement, referenceNode: HTMLElement): void {
    referenceNode.parentNode.insertBefore(element, referenceNode.nextSibling);
  }

  /**
   * replaces a node with the DOM Element
   * @param element
   * @param referenceNode
   */
  replace(element: HTMLElement, referenceNode: HTMLElement): void {
    referenceNode.replaceWith(element);
  }

  /**
   * Add class name to the DOM element
   * @param element
   * @param className
   */
  addClass(element: HTMLElement, className: string): void {
    if (!element.classList) {
      element.className += ' ' + className;
    } else {
      element.classList.add(className);
    }
  }

  /**
   * Add multiple class names to the DOM element
   * @param element
   * @param className
   */
  addMultipleClasses(element: HTMLElement, className: string): void {
    if (element.classList) {
      const styles: string[] = className.trim().split(' ');
      styles.forEach((item) => {
        element.classList.add(item);
      });
    } else {
      const styles: string[] = className.split(' ');
      styles.forEach((item) => {
        element.className += ' ' + item;
      });
    }
  }

  /**
   * Remove class name from DOM Element
   * @param element
   * @param className
   */
  removeClass(element: HTMLElement, className: string): void {
    if (element.classList) {
      element.classList.remove(className);
    } else {
      element.className = element.className.replace(
        new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'),
        ' '
      );
    }
  }

  /**
   * returns true if class name exist for DOM
   * @param element
   * @param className
   * @param checkInClassName if we need to check on element.className instead of element.classList
   */
  hasClass(element: HTMLElement, className: string, checkInClassName?: boolean): boolean {
    if (!element) {
      return;
    }
    if (checkInClassName) {
      return element.className.includes(className);
    } else if (element.classList) {
      return element.classList.contains(className);
    } else {
      return new RegExp('(^| )' + className + '( |$)', 'gi').test(element.className);
    }
  }

  /**
   * returns true if the element is display none
   * @param element
   */
  isHidden(element: HTMLElement): boolean {
    return element.style['display'] === 'none';
  }

  /**
   * Finds all the Html Element based on the selector
   * @param element
   * @param selector
   */
  find(element: HTMLElement, selector: string): Array<HTMLElement> {
    return Array.from(element.querySelectorAll(selector));
  }

  /**
   * Find single Html element based on the selector
   * @param element
   * @param selector
   */
  findSingle(element: HTMLElement, selector: string): HTMLElement | any {
    if (element) {
      return element.querySelector(selector);
    }
    return null;
  }

  /**
   * Finds the Html First Element based on the selector and attribute by using findByAttribute
   * @param elements list of elements
   * @param attributeValue attribute value
   * @param attributeKey attribute key
   */
  findFirstByAttribute(elements: HTMLElement[], attributeKey: string, attributeValue: string): HTMLElement | null {
    return this.findByAttribute(elements, attributeKey, attributeValue)[0] || null;
  }

  /**
   * Finds all the Html Elements based on the selector and attribute
   * @param elements list of elements
   * @param attributeValue attribute value
   * @param attributeKey attribute key
   */
  findByAttribute(elements: HTMLElement[], attributeKey: string, attributeValue: string): Array<HTMLElement> {
    const res = new Array<HTMLElement>();
    elements.forEach((ele: HTMLElement) => {
      if (ele.hasAttribute(attributeKey) && ele.getAttribute(attributeKey) === attributeValue) {
        res.push(ele);
      }
    });
    return res;
  }

  /**
   * returns the closest element to the given HTML element
   * @param element
   * @param selector
   */
  closest(element: HTMLElement, selector: string): HTMLElement {
    return element.closest(selector);
  }

  /**
   * Inject the specified HTML element into the container.
   * @param container The container view.
   * @param element The element to inject.
   * @param type type of html element which is injected
   * @param version - number
   */
  // public inject(container: any, element: HTMLElement, type = DomHtmlType.componentTag, version?: number): void {
  //   let componentTag;
  //   // Get and cast the element selector name.
  //   // TODO: Validate type!
  //   if (type === DomHtmlType.componentTag) {
  //     componentTag = element.tagName.toLowerCase() as unknown as keyof HTMLComponentTag;
  //   } else if (type === DomHtmlType.classTag) {
  //     componentTag = element.className;
  //   } else {
  //     componentTag = element.id;
  //   }
  //   // Get component selector configuration.
  //   const selectorComponent = this._appConfigService.getSelectorComponent(componentTag);
  //   // Get HTML element selector configuration.
  //   const selectorElement = this._appConfigService.getSelectorElement(selectorComponent.elementName, version);
  //   const nodes = this.find(container, selectorElement.selector);
  //
  //   if (nodes.length <= 0) {
  //     // Log warning.
  //     console.warn(`No matching nodes to selector ${selectorElement}`);
  //     // No matching nodes to selector
  //     return;
  //   }
  //
  //   if (nodes.length < selectorElement.index) {
  //     // No matching nodes to index
  //     // Log warning.
  //     console.warn(`No matching nodes to selector index ${selectorElement}`);
  //     return;
  //   }
  //
  //   // Get the matching index item.
  //   const node = nodes[selectorElement.index];
  //
  //   // Manipulate HTML.
  //   switch (selectorComponent.placementBehaviour) {
  //     case PlacementBehaviour.Before: {
  //       this.insertBefore(element, node);
  //       break;
  //     }
  //     case PlacementBehaviour.Replace: {
  //       this.replace(element, node);
  //       break;
  //     }
  //
  //     case PlacementBehaviour.After:
  //     default: {
  //       this.insertAfter(element, node);
  //     }
  //   }
  // }

  /**
   * Hide the specified element.
   * @param container The container of the element.
   * @param selectorElementName The selector element name.
   * @param version
   */
  // public hide(container: any, selectorElementName: string, version?: number): void {
  //   // Find.
  //   const selector = this._appConfigService.getSelectorElement(selectorElementName, version);
  //   const element = this.find(container, selector.selector);
  //
  //   if (element) {
  //     // Hide.
  //     this.setStyle(element[selector.index], 'display', 'none');
  //     this.setStyle(element[selector.index], 'visibility', 'hidden');
  //   } else {
  //     // Log warning.
  //     console.warn(`No matching element found to hide for selector ${selector}`);
  //   }
  // }

  /**
   * Show the specified element.
   * @param container The container of the element.
   * @param selectorElementName The selector element name.
   * @param version
   */
  // public show(container: any, selectorElementName: string, version?: number): void {
  //   // Find.
  //   const selector = this._appConfigService.getSelectorElement(selectorElementName, version);
  //   const element = this.find(container, selector.selector);
  //
  //   if (element) {
  //     // Show.
  //     this.setStyle(element[selector.index], 'display', '');
  //     this.setStyle(element[selector.index], 'visibility', 'visible');
  //   } else {
  //     // Log warning.
  //     console.warn(`No matching element found to show for selector ${selector}`);
  //   }
  // }

  /**
   * Find the element by selector name based on config
   * @param container The container of the element.
   * @param selectorElementName The selector element name
   * @param version - number
   */
  // public findListOfElementBySelectorFromConfig(
  //   container: any,
  //   selectorElementName: string,
  //   version?: number
  // ): Array<HTMLElement> {
  //   // Find.
  //   const selector = this._appConfigService.getSelectorElement(selectorElementName, version);
  //   return Array.from(container.querySelectorAll(selector.selector));
  // }

  /**
   * Find the element by selector name based on config
   * @param container The container of the element.
   * @param selectorElementName The selector element name.
   * @param type Can be class or Id
   * @param version - number
   */
  // public findElementBySelectorOrId(
  //   container: any,
  //   selectorElementName: string,
  //   type = DomHtmlType.classTag,
  //   version?: number
  // ): HTMLElement | null {
  //   // Find.
  //   const selector = this._appConfigService.getSelectorElement(selectorElementName, version);
  //   const element =
  //     type === DomHtmlType.idTag
  //       ? document.getElementById(selector.selector)
  //       : this.findSingle(container, selector.selector);
  //   if (element) {
  //     return element;
  //   }
  //   return null;
  // }

  /**
   * Find the version id to match the differentiator.
   * @param container The container of the element.
   * @returns The version id or -1 if none found.
   */
  // public getVersionDifferentiator(container: any): number {
  //   // Find.
  //   const selectorElementDifferentiator = 'gmail-version-differentiator';
  //   const selectors = this._appConfigService.getSelectorElements(selectorElementDifferentiator);
  //
  //   // The version id, set with default value.
  //   let versionId = -1;
  //
  //   if (!selectors) {
  //     // TODO: LOG
  //     console.warn(`No matching version differentiator nodes to selector ${selectorElementDifferentiator}`);
  //     return versionId;
  //   }
  //
  //   for (let selector of selectors) {
  //     const element = Array.from(container.querySelectorAll(selector.selector));
  //     if (element.length > 0) {
  //       console.log(`Matched version differentiator node: ${selector.id}`);
  //       versionId = selector.id;
  //       break;
  //     }
  //   }
  //
  //   // Return the version id.
  //   return versionId;
  // }

  /**
   * check if element has class or classes by the selector name based on config
   * @param element the html element to check on
   * @param selectorElementName the selector element name
   * @param version - number
   * @returns true if the element has this class, flase otherwise
   */
  // public hasClassBySelector(element: HTMLElement, selectorElementName: string, version?: number): boolean {
  //   const selector = this._appConfigService.getSelectorElement(selectorElementName, version);
  //   const className =
  //     selector.selector.charAt(0) === '.'
  //       ? selector.selector.slice(1).split('.').join(' ')
  //       : selector.selector.split('.').join(' ');
  //   return this.hasClass(element, className, true);
  // }
}
