function t(t,e,i,s){var n,r=arguments.length,o=r<3?e:null===s?s=Object.getOwnPropertyDescriptor(e,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(t,e,i,s);else for(var a=t.length-1;a>=0;a--)(n=t[a])&&(o=(r<3?n(o):r>3?n(e,i,o):n(e,i))||o);return r>3&&o&&Object.defineProperty(e,i,o),o}"function"==typeof SuppressedError&&SuppressedError;const e=globalThis,i=e.ShadowRoot&&(void 0===e.ShadyCSS||e.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,s=Symbol(),n=new WeakMap;let r=class{constructor(t,e,i){if(this._$cssResult$=!0,i!==s)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(i&&void 0===t){const i=void 0!==e&&1===e.length;i&&(t=n.get(e)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),i&&n.set(e,t))}return t}toString(){return this.cssText}};const o=(t,...e)=>{const i=1===t.length?t[0]:e.reduce((e,i,s)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+t[s+1],t[0]);return new r(i,t,s)},a=i?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const i of t.cssRules)e+=i.cssText;return(t=>new r("string"==typeof t?t:t+"",void 0,s))(e)})(t):t,{is:l,defineProperty:h,getOwnPropertyDescriptor:c,getOwnPropertyNames:d,getOwnPropertySymbols:p,getPrototypeOf:u}=Object,g=globalThis,f=g.trustedTypes,_=f?f.emptyScript:"",$=g.reactiveElementPolyfillSupport,v=(t,e)=>t,b={toAttribute(t,e){switch(e){case Boolean:t=t?_:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let i=t;switch(e){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t)}catch(t){i=null}}return i}},m=(t,e)=>!l(t,e),y={attribute:!0,type:String,converter:b,reflect:!1,useDefault:!1,hasChanged:m};Symbol.metadata??=Symbol("metadata"),g.litPropertyMetadata??=new WeakMap;let w=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=y){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const i=Symbol(),s=this.getPropertyDescriptor(t,i,e);void 0!==s&&h(this.prototype,t,s)}}static getPropertyDescriptor(t,e,i){const{get:s,set:n}=c(this.prototype,t)??{get(){return this[e]},set(t){this[e]=t}};return{get:s,set(e){const r=s?.call(this);n?.call(this,e),this.requestUpdate(t,r,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??y}static _$Ei(){if(this.hasOwnProperty(v("elementProperties")))return;const t=u(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(v("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(v("properties"))){const t=this.properties,e=[...d(t),...p(t)];for(const i of e)this.createProperty(i,t[i])}const t=this[Symbol.metadata];if(null!==t){const e=litPropertyMetadata.get(t);if(void 0!==e)for(const[t,i]of e)this.elementProperties.set(t,i)}this._$Eh=new Map;for(const[t,e]of this.elementProperties){const i=this._$Eu(t,e);void 0!==i&&this._$Eh.set(i,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const t of i)e.unshift(a(t))}else void 0!==t&&e.push(a(t));return e}static _$Eu(t,e){const i=e.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const i of e.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((t,s)=>{if(i)t.adoptedStyleSheets=s.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const i of s){const s=document.createElement("style"),n=e.litNonce;void 0!==n&&s.setAttribute("nonce",n),s.textContent=i.cssText,t.appendChild(s)}})(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$ET(t,e){const i=this.constructor.elementProperties.get(t),s=this.constructor._$Eu(t,i);if(void 0!==s&&!0===i.reflect){const n=(void 0!==i.converter?.toAttribute?i.converter:b).toAttribute(e,i.type);this._$Em=t,null==n?this.removeAttribute(s):this.setAttribute(s,n),this._$Em=null}}_$AK(t,e){const i=this.constructor,s=i._$Eh.get(t);if(void 0!==s&&this._$Em!==s){const t=i.getPropertyOptions(s),n="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:b;this._$Em=s;const r=n.fromAttribute(e,t.type);this[s]=r??this._$Ej?.get(s)??r,this._$Em=null}}requestUpdate(t,e,i,s=!1,n){if(void 0!==t){const r=this.constructor;if(!1===s&&(n=this[t]),i??=r.getPropertyOptions(t),!((i.hasChanged??m)(n,e)||i.useDefault&&i.reflect&&n===this._$Ej?.get(t)&&!this.hasAttribute(r._$Eu(t,i))))return;this.C(t,e,i)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(t,e,{useDefault:i,reflect:s,wrapped:n},r){i&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,r??e??this[t]),!0!==n||void 0!==r)||(this._$AL.has(t)||(this.hasUpdated||i||(e=void 0),this._$AL.set(t,e)),!0===s&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,e]of this._$Ep)this[t]=e;this._$Ep=void 0}const t=this.constructor.elementProperties;if(t.size>0)for(const[e,i]of t){const{wrapped:t}=i,s=this[e];!0!==t||this._$AL.has(e)||void 0===s||this.C(e,void 0,i,s)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(e)):this._$EM()}catch(e){throw t=!1,this._$EM(),e}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(t){}firstUpdated(t){}};w.elementStyles=[],w.shadowRootOptions={mode:"open"},w[v("elementProperties")]=new Map,w[v("finalized")]=new Map,$?.({ReactiveElement:w}),(g.reactiveElementVersions??=[]).push("2.1.2");const A=globalThis,C=t=>t,x=A.trustedTypes,S=x?x.createPolicy("lit-html",{createHTML:t=>t}):void 0,E="$lit$",P=`lit$${Math.random().toFixed(9).slice(2)}$`,k="?"+P,O=`<${k}>`,U=document,M=()=>U.createComment(""),H=t=>null===t||"object"!=typeof t&&"function"!=typeof t,R=Array.isArray,T="[ \t\n\f\r]",I=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,N=/-->/g,D=/>/g,z=RegExp(`>|${T}(?:([^\\s"'>=/]+)(${T}*=${T}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),L=/'/g,j=/"/g,W=/^(?:script|style|textarea|title)$/i,B=(t=>(e,...i)=>({_$litType$:t,strings:e,values:i}))(1),F=Symbol.for("lit-noChange"),V=Symbol.for("lit-nothing"),q=new WeakMap,Y=U.createTreeWalker(U,129);function G(t,e){if(!R(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==S?S.createHTML(e):e}const J=(t,e)=>{const i=t.length-1,s=[];let n,r=2===e?"<svg>":3===e?"<math>":"",o=I;for(let e=0;e<i;e++){const i=t[e];let a,l,h=-1,c=0;for(;c<i.length&&(o.lastIndex=c,l=o.exec(i),null!==l);)c=o.lastIndex,o===I?"!--"===l[1]?o=N:void 0!==l[1]?o=D:void 0!==l[2]?(W.test(l[2])&&(n=RegExp("</"+l[2],"g")),o=z):void 0!==l[3]&&(o=z):o===z?">"===l[0]?(o=n??I,h=-1):void 0===l[1]?h=-2:(h=o.lastIndex-l[2].length,a=l[1],o=void 0===l[3]?z:'"'===l[3]?j:L):o===j||o===L?o=z:o===N||o===D?o=I:(o=z,n=void 0);const d=o===z&&t[e+1].startsWith("/>")?" ":"";r+=o===I?i+O:h>=0?(s.push(a),i.slice(0,h)+E+i.slice(h)+P+d):i+P+(-2===h?e:d)}return[G(t,r+(t[i]||"<?>")+(2===e?"</svg>":3===e?"</math>":"")),s]};class K{constructor({strings:t,_$litType$:e},i){let s;this.parts=[];let n=0,r=0;const o=t.length-1,a=this.parts,[l,h]=J(t,e);if(this.el=K.createElement(l,i),Y.currentNode=this.el.content,2===e||3===e){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes)}for(;null!==(s=Y.nextNode())&&a.length<o;){if(1===s.nodeType){if(s.hasAttributes())for(const t of s.getAttributeNames())if(t.endsWith(E)){const e=h[r++],i=s.getAttribute(t).split(P),o=/([.?@])?(.*)/.exec(e);a.push({type:1,index:n,name:o[2],strings:i,ctor:"."===o[1]?et:"?"===o[1]?it:"@"===o[1]?st:tt}),s.removeAttribute(t)}else t.startsWith(P)&&(a.push({type:6,index:n}),s.removeAttribute(t));if(W.test(s.tagName)){const t=s.textContent.split(P),e=t.length-1;if(e>0){s.textContent=x?x.emptyScript:"";for(let i=0;i<e;i++)s.append(t[i],M()),Y.nextNode(),a.push({type:2,index:++n});s.append(t[e],M())}}}else if(8===s.nodeType)if(s.data===k)a.push({type:2,index:n});else{let t=-1;for(;-1!==(t=s.data.indexOf(P,t+1));)a.push({type:7,index:n}),t+=P.length-1}n++}}static createElement(t,e){const i=U.createElement("template");return i.innerHTML=t,i}}function X(t,e,i=t,s){if(e===F)return e;let n=void 0!==s?i._$Co?.[s]:i._$Cl;const r=H(e)?void 0:e._$litDirective$;return n?.constructor!==r&&(n?._$AO?.(!1),void 0===r?n=void 0:(n=new r(t),n._$AT(t,i,s)),void 0!==s?(i._$Co??=[])[s]=n:i._$Cl=n),void 0!==n&&(e=X(t,n._$AS(t,e.values),n,s)),e}class Z{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:i}=this._$AD,s=(t?.creationScope??U).importNode(e,!0);Y.currentNode=s;let n=Y.nextNode(),r=0,o=0,a=i[0];for(;void 0!==a;){if(r===a.index){let e;2===a.type?e=new Q(n,n.nextSibling,this,t):1===a.type?e=new a.ctor(n,a.name,a.strings,this,t):6===a.type&&(e=new nt(n,this,t)),this._$AV.push(e),a=i[++o]}r!==a?.index&&(n=Y.nextNode(),r++)}return Y.currentNode=U,s}p(t){let e=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}}class Q{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,i,s){this.type=2,this._$AH=V,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t?.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=X(this,t,e),H(t)?t===V||null==t||""===t?(this._$AH!==V&&this._$AR(),this._$AH=V):t!==this._$AH&&t!==F&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):(t=>R(t)||"function"==typeof t?.[Symbol.iterator])(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==V&&H(this._$AH)?this._$AA.nextSibling.data=t:this.T(U.createTextNode(t)),this._$AH=t}$(t){const{values:e,_$litType$:i}=t,s="number"==typeof i?this._$AC(t):(void 0===i.el&&(i.el=K.createElement(G(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===s)this._$AH.p(e);else{const t=new Z(s,this),i=t.u(this.options);t.p(e),this.T(i),this._$AH=t}}_$AC(t){let e=q.get(t.strings);return void 0===e&&q.set(t.strings,e=new K(t)),e}k(t){R(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let i,s=0;for(const n of t)s===e.length?e.push(i=new Q(this.O(M()),this.O(M()),this,this.options)):i=e[s],i._$AI(n),s++;s<e.length&&(this._$AR(i&&i._$AB.nextSibling,s),e.length=s)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){const e=C(t).nextSibling;C(t).remove(),t=e}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t))}}class tt{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,i,s,n){this.type=1,this._$AH=V,this._$AN=void 0,this.element=t,this.name=e,this._$AM=s,this.options=n,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=V}_$AI(t,e=this,i,s){const n=this.strings;let r=!1;if(void 0===n)t=X(this,t,e,0),r=!H(t)||t!==this._$AH&&t!==F,r&&(this._$AH=t);else{const s=t;let o,a;for(t=n[0],o=0;o<n.length-1;o++)a=X(this,s[i+o],e,o),a===F&&(a=this._$AH[o]),r||=!H(a)||a!==this._$AH[o],a===V?t=V:t!==V&&(t+=(a??"")+n[o+1]),this._$AH[o]=a}r&&!s&&this.j(t)}j(t){t===V?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class et extends tt{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===V?void 0:t}}class it extends tt{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==V)}}class st extends tt{constructor(t,e,i,s,n){super(t,e,i,s,n),this.type=5}_$AI(t,e=this){if((t=X(this,t,e,0)??V)===F)return;const i=this._$AH,s=t===V&&i!==V||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,n=t!==V&&(i===V||s);s&&this.element.removeEventListener(this.name,this,i),n&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class nt{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){X(this,t)}}const rt=A.litHtmlPolyfillSupport;rt?.(K,Q),(A.litHtmlVersions??=[]).push("3.3.2");const ot=globalThis;class at extends w{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,i)=>{const s=i?.renderBefore??e;let n=s._$litPart$;if(void 0===n){const t=i?.renderBefore??null;s._$litPart$=n=new Q(e.insertBefore(M(),t),t,void 0,i??{})}return n._$AI(t),n})(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return F}}at._$litElement$=!0,at.finalized=!0,ot.litElementHydrateSupport?.({LitElement:at});const lt=ot.litElementPolyfillSupport;lt?.({LitElement:at}),(ot.litElementVersions??=[]).push("4.2.2");const ht=t=>(e,i)=>{void 0!==i?i.addInitializer(()=>{customElements.define(t,e)}):customElements.define(t,e)},ct={attribute:!0,type:String,converter:b,reflect:!1,hasChanged:m},dt=(t=ct,e,i)=>{const{kind:s,metadata:n}=i;let r=globalThis.litPropertyMetadata.get(n);if(void 0===r&&globalThis.litPropertyMetadata.set(n,r=new Map),"setter"===s&&((t=Object.create(t)).wrapped=!0),r.set(i.name,t),"accessor"===s){const{name:s}=i;return{set(i){const n=e.get.call(this);e.set.call(this,i),this.requestUpdate(s,n,t,!0,i)},init(e){return void 0!==e&&this.C(s,void 0,t,e),e}}}if("setter"===s){const{name:s}=i;return function(i){const n=this[s];e.call(this,i),this.requestUpdate(s,n,t,!0,i)}}throw Error("Unsupported decorator location: "+s)};function pt(t){return(e,i)=>"object"==typeof i?dt(t,e,i):((t,e,i)=>{const s=e.hasOwnProperty(i);return e.constructor.createProperty(i,t),s?Object.getOwnPropertyDescriptor(e,i):void 0})(t,e,i)}function ut(t){return pt({...t,state:!0,attribute:!1})}const gt=o`
  :host {
    --tile-bg: var(--card-background-color, #fff);
    --tile-border: var(--divider-color, #e0e0e0);
    --status-producing: #4caf50;
    --status-idle: #9e9e9e;
    --status-unreachable: #f44336;
  }

  ha-card {
    padding: 16px;
  }

  .card-header {
    font-size: 1.2em;
    font-weight: 500;
    padding-bottom: 12px;
  }

  .grid-container {
    display: grid;
    gap: 8px;
  }
`,ft=o`
  :host {
    display: block;
  }

  .panel-tile {
    background: var(--tile-bg, var(--card-background-color, #fff));
    border: 1px solid var(--tile-border, var(--divider-color, #e0e0e0));
    border-radius: 8px;
    padding: 12px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4px;
    position: relative;
    transition: border-color 0.3s ease;
    min-width: 80px;
  }

  .panel-tile.producing {
    border-color: var(--status-producing, #4caf50);
  }

  .panel-tile.idle {
    border-color: var(--status-idle, #9e9e9e);
  }

  .panel-tile.unreachable {
    border-color: var(--status-unreachable, #f44336);
    opacity: 0.6;
  }

  .status-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    position: absolute;
    top: 8px;
    right: 8px;
  }

  .status-dot.producing {
    background-color: var(--status-producing, #4caf50);
  }

  .status-dot.idle {
    background-color: var(--status-idle, #9e9e9e);
  }

  .status-dot.unreachable {
    background-color: var(--status-unreachable, #f44336);
  }

  .panel-label {
    font-size: 0.85em;
    font-weight: 500;
    color: var(--primary-text-color, #333);
    text-align: center;
  }

  .panel-power {
    font-size: 1.4em;
    font-weight: 700;
    color: var(--primary-text-color, #333);
  }

  .panel-power.producing {
    color: var(--status-producing, #4caf50);
  }

  .panel-yield {
    font-size: 0.75em;
    color: var(--secondary-text-color, #666);
  }

  .panel-details {
    font-size: 0.7em;
    color: var(--secondary-text-color, #666);
    display: flex;
    gap: 8px;
  }
`,_t=o`
  :host {
    display: block;
  }

  .editor-container {
    padding: 16px;
  }

  .form-row {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 12px;
  }

  .form-row label {
    min-width: 100px;
    font-size: 0.9em;
  }

  .form-row input,
  .form-row select {
    flex: 1;
    padding: 8px;
    border: 1px solid var(--divider-color, #e0e0e0);
    border-radius: 4px;
    background: var(--card-background-color, #fff);
    color: var(--primary-text-color, #333);
  }

  .inverter-section {
    border: 1px solid var(--divider-color, #e0e0e0);
    border-radius: 8px;
    padding: 12px;
    margin-bottom: 12px;
  }

  .inverter-header {
    font-weight: 500;
    margin-bottom: 8px;
  }

  .panel-list {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .panel-row {
    display: flex;
    gap: 8px;
    align-items: center;
  }

  .panel-row input {
    width: 60px;
    padding: 4px 8px;
    border: 1px solid var(--divider-color, #e0e0e0);
    border-radius: 4px;
  }

  button {
    padding: 6px 12px;
    border: 1px solid var(--divider-color, #e0e0e0);
    border-radius: 4px;
    background: var(--card-background-color, #fff);
    color: var(--primary-text-color, #333);
    cursor: pointer;
  }

  button:hover {
    background: var(--secondary-background-color, #f5f5f5);
  }
`;let $t=class extends at{constructor(){super(...arguments),this.showLabel=!0,this.showYield=!0}static{this.styles=ft}render(){const t=this._getStatus(),e=this._formatPower();return B`
      <div class="panel-tile ${t}">
        <span class="status-dot ${t}"></span>
        ${this.showLabel?B`<span class="panel-label">${this.data.label}</span>`:""}
        <span class="panel-power ${t}">${e}</span>
        ${this.showYield&&null!=this.data.yieldDay?B`<span class="panel-yield">${this.data.yieldDay} Wh today</span>`:""}
        <div class="panel-details">
          ${null!=this.data.voltage?B`<span>${this.data.voltage}V</span>`:""}
          ${null!=this.data.current?B`<span>${this.data.current}A</span>`:""}
        </div>
      </div>
    `}_getStatus(){return this.data.reachable?this.data.producing?"producing":"idle":"unreachable"}_formatPower(){return null==this.data.power?"-- W":`${Math.round(this.data.power)} W`}};t([pt({attribute:!1})],$t.prototype,"data",void 0),t([pt({type:Boolean})],$t.prototype,"showLabel",void 0),t([pt({type:Boolean})],$t.prototype,"showYield",void 0),$t=t([ht("opendtu-panel-tile")],$t);let vt=class extends at{static{this.styles=_t}setConfig(t){this._config={...t}}render(){return this._config?B`
      <div class="editor-container">
        <div class="form-row">
          <label>Title</label>
          <input
            type="text"
            .value=${this._config.title||""}
            @input=${this._titleChanged}
          />
        </div>

        <div class="form-row">
          <label>Layout</label>
          <select @change=${this._layoutChanged}>
            <option value="grid" ?selected=${"grid"===this._config.layout}>Grid</option>
            <option value="freeform" ?selected=${"freeform"===this._config.layout}>Freeform</option>
          </select>
        </div>

        ${"grid"===this._config.layout?B`
              <div class="form-row">
                <label>Columns</label>
                <input
                  type="number"
                  min="1"
                  max="12"
                  .value=${String(this._config.columns||4)}
                  @input=${this._columnsChanged}
                />
              </div>
            `:B`
              <h3>Background Image</h3>
              <div class="form-row">
                <label>Image URL</label>
                <input
                  type="text"
                  .value=${this._config.background?.image||""}
                  @input=${this._bgImageChanged}
                  placeholder="/local/rooftop.jpg"
                />
              </div>
              <div class="form-row">
                <label>Width (px)</label>
                <input
                  type="number"
                  min="100"
                  .value=${String(this._config.background?.width||800)}
                  @input=${this._bgWidthChanged}
                />
              </div>
              <div class="form-row">
                <label>Height (px)</label>
                <input
                  type="number"
                  min="100"
                  .value=${String(this._config.background?.height||600)}
                  @input=${this._bgHeightChanged}
                />
              </div>
            `}

        <div class="form-row">
          <label>Show labels</label>
          <input
            type="checkbox"
            .checked=${!1!==this._config.show_labels}
            @change=${this._showLabelsChanged}
          />
        </div>

        <div class="form-row">
          <label>Show yield</label>
          <input
            type="checkbox"
            .checked=${!1!==this._config.show_yield}
            @change=${this._showYieldChanged}
          />
        </div>

        <h3>Inverters</h3>
        ${this._renderInverterDiscovery()}
        ${(this._config.inverters||[]).map((t,e)=>this._renderInverterSection(t,e))}

        <button @click=${this._addInverter}>+ Add Inverter</button>
      </div>
    `:B``}_renderInverterDiscovery(){const t=new Set;for(const e of Object.keys(this.hass?.states||{}))if(e.startsWith("sensor.opendtu_")){const i=this.hass.states[e].attributes.serial;i&&t.add(i)}if(0===t.size)return B``;const e=new Set((this._config.inverters||[]).map(t=>t.serial)),i=[...t].filter(t=>!e.has(t));return 0===i.length?B``:B`
      <div style="margin-bottom: 12px; font-size: 0.85em; color: var(--secondary-text-color)">
        Detected inverters: ${i.map(t=>B`
            <button @click=${()=>this._addDetectedInverter(t)}>${t}</button>
          `)}
      </div>
    `}_renderInverterSection(t,e){return B`
      <div class="inverter-section">
        <div class="inverter-header">
          Inverter: ${t.serial}
          <button @click=${()=>this._removeInverter(e)}>Remove</button>
        </div>

        <div class="form-row">
          <label>Serial</label>
          <input
            type="text"
            .value=${t.serial}
            @input=${t=>this._inverterSerialChanged(e,t)}
          />
        </div>

        <div class="panel-list">
          ${(t.panels||[]).map((t,i)=>this._renderPanelRow(e,t,i))}
        </div>

        <button @click=${()=>this._addPanel(e)}>+ Add Panel</button>
      </div>
    `}_renderPanelRow(t,e,i){const s="freeform"===this._config.layout;return B`
      <div class="panel-row" style="flex-wrap: wrap;">
        <label>String</label>
        <input
          type="number"
          min="0"
          .value=${String(e.string)}
          @input=${e=>this._panelFieldChanged(t,i,"string",e)}
        />
        <label>Label</label>
        <input
          type="text"
          .value=${e.label}
          @input=${e=>this._panelFieldChanged(t,i,"label",e)}
        />
        ${s?B`
              <label>X</label>
              <input type="number" .value=${String(e.x??0)}
                @input=${e=>this._panelFieldChanged(t,i,"x",e)} />
              <label>Y</label>
              <input type="number" .value=${String(e.y??0)}
                @input=${e=>this._panelFieldChanged(t,i,"y",e)} />
              <label>W</label>
              <input type="number" .value=${String(e.width??100)}
                @input=${e=>this._panelFieldChanged(t,i,"width",e)} />
              <label>H</label>
              <input type="number" .value=${String(e.height??60)}
                @input=${e=>this._panelFieldChanged(t,i,"height",e)} />
              <label>Rot</label>
              <input type="number" min="-180" max="180" .value=${String(e.rotation??0)}
                @input=${e=>this._panelFieldChanged(t,i,"rotation",e)} />
            `:B`
              <label>Row</label>
              <input type="number" min="0" .value=${String(e.row)}
                @input=${e=>this._panelFieldChanged(t,i,"row",e)} />
              <label>Col</label>
              <input type="number" min="0" .value=${String(e.col)}
                @input=${e=>this._panelFieldChanged(t,i,"col",e)} />
            `}
        <button @click=${()=>this._removePanel(t,i)}>X</button>
      </div>
    `}_fireConfigChanged(){const t=new CustomEvent("config-changed",{detail:{config:this._config},bubbles:!0,composed:!0});this.dispatchEvent(t)}_titleChanged(t){this._config={...this._config,title:t.target.value},this._fireConfigChanged()}_layoutChanged(t){this._config={...this._config,layout:t.target.value},this._fireConfigChanged()}_columnsChanged(t){this._config={...this._config,columns:parseInt(t.target.value)||4},this._fireConfigChanged()}_showLabelsChanged(t){this._config={...this._config,show_labels:t.target.checked},this._fireConfigChanged()}_showYieldChanged(t){this._config={...this._config,show_yield:t.target.checked},this._fireConfigChanged()}_bgImageChanged(t){const e=t.target.value;this._config={...this._config,background:{...this._config.background||{image:"",width:800,height:600},image:e}},this._fireConfigChanged()}_bgWidthChanged(t){const e=parseInt(t.target.value)||800;this._config={...this._config,background:{...this._config.background||{image:"",width:800,height:600},width:e}},this._fireConfigChanged()}_bgHeightChanged(t){const e=parseInt(t.target.value)||600;this._config={...this._config,background:{...this._config.background||{image:"",width:800,height:600},height:e}},this._fireConfigChanged()}_addInverter(){const t=[...this._config.inverters||[]];t.push({serial:"",panels:[]}),this._config={...this._config,inverters:t},this._fireConfigChanged()}_addDetectedInverter(t){const e=[...this._config.inverters||[]];e.push({serial:t,panels:[{string:0,label:"Panel 1",row:0,col:0}]}),this._config={...this._config,inverters:e},this._fireConfigChanged()}_removeInverter(t){const e=[...this._config.inverters||[]];e.splice(t,1),this._config={...this._config,inverters:e},this._fireConfigChanged()}_inverterSerialChanged(t,e){const i=[...this._config.inverters||[]];i[t]={...i[t],serial:e.target.value},this._config={...this._config,inverters:i},this._fireConfigChanged()}_addPanel(t){const e=[...this._config.inverters||[]],i=[...e[t].panels||[]];i.push({string:i.length,label:`Panel ${i.length+1}`,row:0,col:i.length}),e[t]={...e[t],panels:i},this._config={...this._config,inverters:e},this._fireConfigChanged()}_removePanel(t,e){const i=[...this._config.inverters||[]],s=[...i[t].panels||[]];s.splice(e,1),i[t]={...i[t],panels:s},this._config={...this._config,inverters:i},this._fireConfigChanged()}_panelFieldChanged(t,e,i,s){const n=[...this._config.inverters||[]],r=[...n[t].panels||[]],o=s.target.value;r[e]={...r[e],[i]:"label"===i?o:parseInt(o)||0},n[t]={...n[t],panels:r},this._config={...this._config,inverters:n},this._fireConfigChanged()}};t([pt({attribute:!1})],vt.prototype,"hass",void 0),t([ut()],vt.prototype,"_config",void 0),vt=t([ht("opendtu-monitor-card-editor")],vt);let bt=class extends at{static{this.styles=[gt,o`
      .empty-state {
        padding: 32px;
        text-align: center;
        color: var(--secondary-text-color, #666);
      }
    `]}static getConfigElement(){return document.createElement("opendtu-monitor-card-editor")}static getStubConfig(){return{title:"Solar Panels",layout:"grid",columns:4,show_labels:!0,show_yield:!0,inverters:[]}}setConfig(t){if(!t)throw new Error("Invalid configuration");this._config={layout:"grid",columns:4,show_labels:!0,show_yield:!0,inverters:[],...t}}getCardSize(){const t=(this._config.inverters||[]).reduce((t,e)=>t+(e.panels||[]).length,0),e=Math.ceil(t/(this._config.columns||4));return Math.max(e+1,2)}render(){if(!this._config||!this.hass)return B``;const t=this._collectPanelData();return B`
      <ha-card>
        ${this._config.title?B`<div class="card-header">${this._config.title}</div>`:""}
        ${0===t.length?B`<div class="empty-state">No panels configured. Edit the card to add inverters and panels.</div>`:"freeform"===this._config.layout?this._renderFreeform(t):this._renderGrid(t)}
      </ha-card>
    `}_renderGrid(t){const e=this._config.columns||4;let i=0,s=0;for(const e of t)i=Math.max(i,e.config.row),s=Math.max(s,e.config.col);const n=Math.max(e,s+1),r=new Map;for(const e of t)r.set(`${e.config.row}-${e.config.col}`,e.data);const o=[];for(let t=0;t<=i;t++){const e=[];for(let i=0;i<n;i++){const s=r.get(`${t}-${i}`);s?e.push(B`
            <opendtu-panel-tile
              .data=${s}
              .showLabel=${this._config.show_labels}
              .showYield=${this._config.show_yield}
            ></opendtu-panel-tile>
          `):e.push(B`<div></div>`)}o.push(...e)}return B`
      <div
        class="grid-container"
        style="grid-template-columns: repeat(${n}, 1fr)"
      >
        ${o}
      </div>
    `}_renderFreeform(t){const e=this._config.background,i=e?`position: relative; width: 100%; aspect-ratio: ${e.width}/${e.height}; background-image: url('${e.image}'); background-size: contain; background-repeat: no-repeat; background-position: center;`:"position: relative; width: 100%; min-height: 400px;";return B`
      <div class="freeform-container" style="${i}">
        ${t.map(t=>{const i=t.config.x??0,s=t.config.y??0,n=t.config.width??100,r=t.config.height??60,o=t.config.rotation??0;let a;if(e){a=`position: absolute; left: ${i/e.width*100}%; top: ${s/e.height*100}%; width: ${n/e.width*100}%; height: ${r/e.height*100}%; transform: rotate(${o}deg);`}else a=`position: absolute; left: ${i}px; top: ${s}px; width: ${n}px; height: ${r}px; transform: rotate(${o}deg);`;return B`
            <div style="${a}">
              <opendtu-panel-tile
                .data=${t.data}
                .showLabel=${this._config.show_labels}
                .showYield=${this._config.show_yield}
              ></opendtu-panel-tile>
            </div>
          `})}
      </div>
    `}_collectPanelData(){const t=[];for(const e of this._config.inverters||[])for(const i of e.panels||[]){const s=this._getPanelData(e,i);t.push({data:s,config:i})}return t}_getPanelData(t,e){const i=t.serial,s=e.string,n="sensor.opendtu_",r=this._findSensorValue(n,i,`dc_power_string_${s}`),o=this._findSensorValue(n,i,`dc_voltage_string_${s}`),a=this._findSensorValue(n,i,`dc_current_string_${s}`),l=this._findSensorValue(n,i,`dc_yield_day_string_${s}`),h=this._findSensorValue(n,i,`dc_yield_total_string_${s}`);let c=!1,d=!1;for(const t of Object.keys(this.hass.states))if(t.startsWith(n)){const e=this.hass.states[t];if(e.attributes.serial===i){c=e.attributes.producing||!1,d=e.attributes.reachable||!1;break}}return{serial:i,string:s,label:e.label,power:r,voltage:o,current:a,yieldDay:l,yieldTotal:h,producing:c,reachable:d}}_findSensorValue(t,e,i){for(const s of Object.keys(this.hass.states)){if(!s.startsWith(t))continue;if(!s.endsWith(`_${i}`))continue;const n=this.hass.states[s];if(n.attributes.serial===e){const t=parseFloat(n.state);return isNaN(t)?null:t}}return null}};t([pt({attribute:!1})],bt.prototype,"hass",void 0),t([ut()],bt.prototype,"_config",void 0),bt=t([ht("opendtu-monitor-card")],bt);const mt=window;mt.customCards=mt.customCards||[],mt.customCards.push({type:"opendtu-monitor-card",name:"OpenDTU Monitor",description:"Display solar panel grid from OpenDTU inverters"});export{bt as OpenDTUMonitorCard};
