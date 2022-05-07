
/**
 * Get info of dom elements functions and change dom elements functions
 */
let DomHandlerService = class DomHandlerService {
    constructor(_appConfigService) {
        this._appConfigService = _appConfigService;
    }
    /**
     * Remove all instances of element from DOM by tag name
     * @param nodeName name of the node to remove from DOM
     */
    removeAllElementsByTagName(nodeName) {
        const elements = Array.from(document.getElementsByTagName(nodeName));
        elements.forEach((element) => {
            element.remove();
        });
    }
    /**
     * creates DOM element
     * @param nodeName
     */
    createElement(nodeName) {
        return document.createElement(nodeName);
    }
    /**
     * set style to the Dom element
     * @param element
     * @param style
     * @param value
     */
    setStyle(element, style, value) {
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
    setMultipleStyles(element, propertyObject) {
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
    insertBefore(element, referenceNode) {
        referenceNode.parentNode.insertBefore(element, referenceNode);
    }
    /**
     * inserts DOM Element after the parent node
     * @param element
     * @param referenceNode
     */
    insertAfter(element, referenceNode) {
        referenceNode.parentNode.insertBefore(element, referenceNode.nextSibling);
    }
    /**
     * replaces a node with the DOM Element
     * @param element
     * @param referenceNode
     */
    replace(element, referenceNode) {
        referenceNode.replaceWith(element);
    }
    /**
     * Add class name to the DOM element
     * @param element
     * @param className
     */
    addClass(element, className) {
        if (!element.classList) {
            element.className += ' ' + className;
        }
        else {
            element.classList.add(className);
        }
    }
    /**
     * Add multiple class names to the DOM element
     * @param element
     * @param className
     */
    addMultipleClasses(element, className) {
        if (element.classList) {
            const styles = className.trim().split(' ');
            styles.forEach((item) => {
                element.classList.add(item);
            });
        }
        else {
            const styles = className.split(' ');
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
    removeClass(element, className) {
        if (element.classList) {
            element.classList.remove(className);
        }
        else {
            element.className = element.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
        }
    }
    /**
     * returns true if class name exist for DOM
     * @param element
     * @param className
     * @param checkInClassName if we need to check on element.className instead of element.classList
     */
    hasClass(element, className, checkInClassName) {
        if (!element) {
            return;
        }
        if (checkInClassName) {
            return element.className.includes(className);
        }
        else if (element.classList) {
            return element.classList.contains(className);
        }
        else {
            return new RegExp('(^| )' + className + '( |$)', 'gi').test(element.className);
        }
    }
    /**
     * returns true if the element is display none
     * @param element
     */
    isHidden(element) {
        return element.style['display'] === 'none';
    }
    /**
     * Finds all the Html Element based on the selector
     * @param element
     * @param selector
     */
    find(element, selector) {
        return Array.from(element.querySelectorAll(selector));
    }
    /**
     * Find single Html element based on the selector
     * @param element
     * @param selector
     */
    findSingle(element, selector) {
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
    findFirstByAttribute(elements, attributeKey, attributeValue) {
        return this.findByAttribute(elements, attributeKey, attributeValue)[0] || null;
    }
    /**
     * Finds all the Html Elements based on the selector and attribute
     * @param elements list of elements
     * @param attributeValue attribute value
     * @param attributeKey attribute key
     */
    findByAttribute(elements, attributeKey, attributeValue) {
        const res = new Array();
        elements.forEach((ele) => {
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
    closest(element, selector) {
        return element.closest(selector);
    }
    /**
     * Inject the specified HTML element into the container.
     * @param container The container view.
     * @param element The element to inject.
     * @param type type of html element which is injected
     * @param version - number
     */
    inject(container, element, type = DomHtmlType.componentTag, version) {
        let componentTag;
        // Get and cast the element selector name.
        // TODO: Validate type!
        if (type === DomHtmlType.componentTag) {
            componentTag = element.tagName.toLowerCase();
        }
        else if (type === DomHtmlType.classTag) {
            componentTag = element.className;
        }
        else {
            componentTag = element.id;
        }
        // Get component selector configuration.
        const selectorComponent = this._appConfigService.getSelectorComponent(componentTag);
        // Get HTML element selector configuration.
        const selectorElement = this._appConfigService.getSelectorElement(selectorComponent.elementName, version);
        const nodes = this.find(container, selectorElement.selector);
        if (nodes.length <= 0) {
            // Log warning.
            console.warn(`No matching nodes to selector ${selectorElement}`);
            // No matching nodes to selector
            return;
        }
        if (nodes.length < selectorElement.index) {
            // No matching nodes to index
            // Log warning.
            console.warn(`No matching nodes to selector index ${selectorElement}`);
            return;
        }
        // Get the matching index item.
        const node = nodes[selectorElement.index];
        // Manipulate HTML.
        switch (selectorComponent.placementBehaviour) {
            case PlacementBehaviour.Before: {
                this.insertBefore(element, node);
                break;
            }
            case PlacementBehaviour.Replace: {
                this.replace(element, node);
                break;
            }
            case PlacementBehaviour.After:
            default: {
                this.insertAfter(element, node);
            }
        }
    }
    /**
     * Hide the specified element.
     * @param container The container of the element.
     * @param selectorElementName The selector element name.
     * @param version
     */
    hide(container, selectorElementName, version) {
        // Find.
        const selector = this._appConfigService.getSelectorElement(selectorElementName, version);
        const element = this.find(container, selector.selector);
        if (element) {
            // Hide.
            this.setStyle(element[selector.index], 'display', 'none');
            this.setStyle(element[selector.index], 'visibility', 'hidden');
        }
        else {
            // Log warning.
            console.warn(`No matching element found to hide for selector ${selector}`);
        }
    }
    /**
     * Show the specified element.
     * @param container The container of the element.
     * @param selectorElementName The selector element name.
     * @param version
     */
    show(container, selectorElementName, version) {
        // Find.
        const selector = this._appConfigService.getSelectorElement(selectorElementName, version);
        const element = this.find(container, selector.selector);
        if (element) {
            // Show.
            this.setStyle(element[selector.index], 'display', '');
            this.setStyle(element[selector.index], 'visibility', 'visible');
        }
        else {
            // Log warning.
            console.warn(`No matching element found to show for selector ${selector}`);
        }
    }
    /**
     * Find the element by selector name based on config
     * @param container The container of the element.
     * @param selectorElementName The selector element name
     * @param version - number
     */
    findListOfElementBySelectorFromConfig(container, selectorElementName, version) {
        // Find.
        const selector = this._appConfigService.getSelectorElement(selectorElementName, version);
        return Array.from(container.querySelectorAll(selector.selector));
    }
    /**
     * Find the element by selector name based on config
     * @param container The container of the element.
     * @param selectorElementName The selector element name.
     * @param type Can be class or Id
     * @param version - number
     */
    findElementBySelectorOrId(container, selectorElementName, type = DomHtmlType.classTag, version) {
        // Find.
        const selector = this._appConfigService.getSelectorElement(selectorElementName, version);
        const element = type === DomHtmlType.idTag
            ? document.getElementById(selector.selector)
            : this.findSingle(container, selector.selector);
        if (element) {
            return element;
        }
        return null;
    }
    /**
     * Find the version id to match the differentiator.
     * @param container The container of the element.
     * @returns The version id or -1 if none found.
     */
    getVersionDifferentiator(container) {
        // Find.
        const selectorElementDifferentiator = 'gmail-version-differentiator';
        const selectors = this._appConfigService.getSelectorElements(selectorElementDifferentiator);
        // The version id, set with default value.
        let versionId = -1;
        if (!selectors) {
            // TODO: LOG
            console.warn(`No matching version differentiator nodes to selector ${selectorElementDifferentiator}`);
            return versionId;
        }
        for (let selector of selectors) {
            const element = Array.from(container.querySelectorAll(selector.selector));
            if (element.length > 0) {
                console.log(`Matched version differentiator node: ${selector.id}`);
                versionId = selector.id;
                break;
            }
        }
        // Return the version id.
        return versionId;
    }
    /**
     * check if element has class or classes by the selector name based on config
     * @param element the html element to check on
     * @param selectorElementName the selector element name
     * @param version - number
     * @returns true if the element has this class, flase otherwise
     */
    hasClassBySelector(element, selectorElementName, version) {
        const selector = this._appConfigService.getSelectorElement(selectorElementName, version);
        const className = selector.selector.charAt(0) === '.'
            ? selector.selector.slice(1).split('.').join(' ')
            : selector.selector.split('.').join(' ');
        return this.hasClass(element, className, true);
    }
};
export { DomHandlerService };
