/**
 * Copyright 2019 The Pennsylvania State University
 * @license Apache-2.0, see License.md for full text.
 */
import { html, PolymerElement } from "@polymer/polymer/polymer-element.js";
import "@polymer/paper-card/paper-card.js";
import "@polymer/paper-button/paper-button.js";
import "@polymer/iron-icons/iron-icons.js";
import "@polymer/iron-pages/iron-pages.js";
import "@lrnwebcomponents/simple-colors/simple-colors.js";
import { HAXCMSTheme } from "@lrnwebcomponents/haxcms-elements/lib/HAXCMSThemeWiring.js";
import "./lib/haxtheme-home.js";
import "./lib/haxtheme-news.js";
import "./lib/haxtheme-team.js";
import "./lib/haxtheme-courses.js";
import "./lib/haxtheme-blog.js";
import "./lib/page-topbar.js";
import "./lib/temp-nav.js";
import "./lib/page-footer.js";
import "./lib/page-scroll.js";
import { autorun } from "mobx";
import { store } from "@lrnwebcomponents/haxcms-elements/lib/haxcms-site-store.js";
/**
 * `odl-haxtheme`
 * `ODL custom site theme`
 *
 * @microcopy - language worth noting:
 *  -
 *
 * @customElement
 * @polymer
 * @demo demo/index.html
 */
console.log(HAXCMSTheme);
class OdlHaxtheme extends HAXCMSTheme(PolymerElement) {
  /* REQUIRED FOR TOOLING DO NOT TOUCH */

  /**
   * Store the tag name to make it easier to obtain directly.
   * @notice function name must be here for tooling to operate correctly
   */
  static get tag() {
    return "odl-haxtheme";
  }
  /**
   * life cycle, element is afixed to the DOM
   */
  connectedCallback() {
    autorun(() => {
      this._locationChanged(store.location);
    });
    super.connectedCallback();
  }
  /**
   * Notice active item changed state
   */
  _locationChanged(location) {
    console.log("location:", location);
    if (typeof location !== typeof undefined) {
      switch (location.pathname) {
        case "/home":
          this.selectedPage = 0;
          break;
        case "/news":
          this.selectedPage = 1;
          break;
        case "/team":
          this.selectedPage = 2;
          break;
        case "/courses":
          this.selectedPage = 3;
          break;
      }

      if (location.pathname.startsWith("/blog-posts/")) {
        this.selectedPage = 4;
      }

      window.scrollTo(0, 0);
      // this.set('activeItem', e.detail);
    } else {
      this.selectedPage = 0;
    }
  }
  /**
   * Settings activeItem to nothing will ensure that state goes back to nothing active
   * and then other options appear
   */
  _unsetTapped(e) {
    new CustomEvent("json-outline-schema-active-item-changed", {
      bubbles: true,
      cancelable: true,
      detail: {}
    });
  }
  /**
   * life cycle, element is removed from the DOM
   */
  //disconnectedCallback() {}
}
window.customElements.define(OdlHaxtheme.tag, OdlHaxtheme);
export { OdlHaxtheme };
