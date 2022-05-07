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
}
