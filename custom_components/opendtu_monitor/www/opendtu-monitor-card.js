function t(t,e,s,i){var r,n=arguments.length,o=n<3?e:null===i?i=Object.getOwnPropertyDescriptor(e,s):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(t,e,s,i);else for(var a=t.length-1;a>=0;a--)(r=t[a])&&(o=(n<3?r(o):n>3?r(e,s,o):r(e,s))||o);return n>3&&o&&Object.defineProperty(e,s,o),o}"function"==typeof SuppressedError&&SuppressedError;const e=globalThis,s=e.ShadowRoot&&(void 0===e.ShadyCSS||e.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,i=Symbol(),r=new WeakMap;let n=class{constructor(t,e,s){if(this._$cssResult$=!0,s!==i)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(s&&void 0===t){const s=void 0!==e&&1===e.length;s&&(t=r.get(e)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),s&&r.set(e,t))}return t}toString(){return this.cssText}};const o=(t,...e)=>{const s=1===t.length?t[0]:e.reduce((e,s,i)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+t[i+1],t[0]);return new n(s,t,i)},a=s?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const s of t.cssRules)e+=s.cssText;return(t=>new n("string"==typeof t?t:t+"",void 0,i))(e)})(t):t,{is:l,defineProperty:h,getOwnPropertyDescriptor:c,getOwnPropertyNames:d,getOwnPropertySymbols:p,getPrototypeOf:u}=Object,f=globalThis,g=f.trustedTypes,_=g?g.emptyScript:"",$=f.reactiveElementPolyfillSupport,m=(t,e)=>t,v={toAttribute(t,e){switch(e){case Boolean:t=t?_:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let s=t;switch(e){case Boolean:s=null!==t;break;case Number:s=null===t?null:Number(t);break;case Object:case Array:try{s=JSON.parse(t)}catch(t){s=null}}return s}},y=(t,e)=>!l(t,e),b={attribute:!0,type:String,converter:v,reflect:!1,useDefault:!1,hasChanged:y};Symbol.metadata??=Symbol("metadata"),f.litPropertyMetadata??=new WeakMap;let A=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=b){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const s=Symbol(),i=this.getPropertyDescriptor(t,s,e);void 0!==i&&h(this.prototype,t,i)}}static getPropertyDescriptor(t,e,s){const{get:i,set:r}=c(this.prototype,t)??{get(){return this[e]},set(t){this[e]=t}};return{get:i,set(e){const n=i?.call(this);r?.call(this,e),this.requestUpdate(t,n,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??b}static _$Ei(){if(this.hasOwnProperty(m("elementProperties")))return;const t=u(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(m("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(m("properties"))){const t=this.properties,e=[...d(t),...p(t)];for(const s of e)this.createProperty(s,t[s])}const t=this[Symbol.metadata];if(null!==t){const e=litPropertyMetadata.get(t);if(void 0!==e)for(const[t,s]of e)this.elementProperties.set(t,s)}this._$Eh=new Map;for(const[t,e]of this.elementProperties){const s=this._$Eu(t,e);void 0!==s&&this._$Eh.set(s,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const s=new Set(t.flat(1/0).reverse());for(const t of s)e.unshift(a(t))}else void 0!==t&&e.push(a(t));return e}static _$Eu(t,e){const s=e.attribute;return!1===s?void 0:"string"==typeof s?s:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const s of e.keys())this.hasOwnProperty(s)&&(t.set(s,this[s]),delete this[s]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((t,i)=>{if(s)t.adoptedStyleSheets=i.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const s of i){const i=document.createElement("style"),r=e.litNonce;void 0!==r&&i.setAttribute("nonce",r),i.textContent=s.cssText,t.appendChild(i)}})(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,s){this._$AK(t,s)}_$ET(t,e){const s=this.constructor.elementProperties.get(t),i=this.constructor._$Eu(t,s);if(void 0!==i&&!0===s.reflect){const r=(void 0!==s.converter?.toAttribute?s.converter:v).toAttribute(e,s.type);this._$Em=t,null==r?this.removeAttribute(i):this.setAttribute(i,r),this._$Em=null}}_$AK(t,e){const s=this.constructor,i=s._$Eh.get(t);if(void 0!==i&&this._$Em!==i){const t=s.getPropertyOptions(i),r="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:v;this._$Em=i;const n=r.fromAttribute(e,t.type);this[i]=n??this._$Ej?.get(i)??n,this._$Em=null}}requestUpdate(t,e,s,i=!1,r){if(void 0!==t){const n=this.constructor;if(!1===i&&(r=this[t]),s??=n.getPropertyOptions(t),!((s.hasChanged??y)(r,e)||s.useDefault&&s.reflect&&r===this._$Ej?.get(t)&&!this.hasAttribute(n._$Eu(t,s))))return;this.C(t,e,s)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(t,e,{useDefault:s,reflect:i,wrapped:r},n){s&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,n??e??this[t]),!0!==r||void 0!==n)||(this._$AL.has(t)||(this.hasUpdated||s||(e=void 0),this._$AL.set(t,e)),!0===i&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,e]of this._$Ep)this[t]=e;this._$Ep=void 0}const t=this.constructor.elementProperties;if(t.size>0)for(const[e,s]of t){const{wrapped:t}=s,i=this[e];!0!==t||this._$AL.has(e)||void 0===i||this.C(e,void 0,s,i)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(e)):this._$EM()}catch(e){throw t=!1,this._$EM(),e}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(t){}firstUpdated(t){}};A.elementStyles=[],A.shadowRootOptions={mode:"open"},A[m("elementProperties")]=new Map,A[m("finalized")]=new Map,$?.({ReactiveElement:A}),(f.reactiveElementVersions??=[]).push("2.1.2");const w=globalThis,x=t=>t,E=w.trustedTypes,C=E?E.createPolicy("lit-html",{createHTML:t=>t}):void 0,S="$lit$",P=`lit$${Math.random().toFixed(9).slice(2)}$`,O="?"+P,U=`<${O}>`,M=document,k=()=>M.createComment(""),T=t=>null===t||"object"!=typeof t&&"function"!=typeof t,H=Array.isArray,N="[ \t\n\f\r]",R=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,D=/-->/g,z=/>/g,L=RegExp(`>|${N}(?:([^\\s"'>=/]+)(${N}*=${N}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),I=/'/g,V=/"/g,j=/^(?:script|style|textarea|title)$/i,W=(t=>(e,...s)=>({_$litType$:t,strings:e,values:s}))(1),B=Symbol.for("lit-noChange"),q=Symbol.for("lit-nothing"),Y=new WeakMap,F=M.createTreeWalker(M,129);function G(t,e){if(!H(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==C?C.createHTML(e):e}const J=(t,e)=>{const s=t.length-1,i=[];let r,n=2===e?"<svg>":3===e?"<math>":"",o=R;for(let e=0;e<s;e++){const s=t[e];let a,l,h=-1,c=0;for(;c<s.length&&(o.lastIndex=c,l=o.exec(s),null!==l);)c=o.lastIndex,o===R?"!--"===l[1]?o=D:void 0!==l[1]?o=z:void 0!==l[2]?(j.test(l[2])&&(r=RegExp("</"+l[2],"g")),o=L):void 0!==l[3]&&(o=L):o===L?">"===l[0]?(o=r??R,h=-1):void 0===l[1]?h=-2:(h=o.lastIndex-l[2].length,a=l[1],o=void 0===l[3]?L:'"'===l[3]?V:I):o===V||o===I?o=L:o===D||o===z?o=R:(o=L,r=void 0);const d=o===L&&t[e+1].startsWith("/>")?" ":"";n+=o===R?s+U:h>=0?(i.push(a),s.slice(0,h)+S+s.slice(h)+P+d):s+P+(-2===h?e:d)}return[G(t,n+(t[s]||"<?>")+(2===e?"</svg>":3===e?"</math>":"")),i]};class K{constructor({strings:t,_$litType$:e},s){let i;this.parts=[];let r=0,n=0;const o=t.length-1,a=this.parts,[l,h]=J(t,e);if(this.el=K.createElement(l,s),F.currentNode=this.el.content,2===e||3===e){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes)}for(;null!==(i=F.nextNode())&&a.length<o;){if(1===i.nodeType){if(i.hasAttributes())for(const t of i.getAttributeNames())if(t.endsWith(S)){const e=h[n++],s=i.getAttribute(t).split(P),o=/([.?@])?(.*)/.exec(e);a.push({type:1,index:r,name:o[2],strings:s,ctor:"."===o[1]?et:"?"===o[1]?st:"@"===o[1]?it:tt}),i.removeAttribute(t)}else t.startsWith(P)&&(a.push({type:6,index:r}),i.removeAttribute(t));if(j.test(i.tagName)){const t=i.textContent.split(P),e=t.length-1;if(e>0){i.textContent=E?E.emptyScript:"";for(let s=0;s<e;s++)i.append(t[s],k()),F.nextNode(),a.push({type:2,index:++r});i.append(t[e],k())}}}else if(8===i.nodeType)if(i.data===O)a.push({type:2,index:r});else{let t=-1;for(;-1!==(t=i.data.indexOf(P,t+1));)a.push({type:7,index:r}),t+=P.length-1}r++}}static createElement(t,e){const s=M.createElement("template");return s.innerHTML=t,s}}function Z(t,e,s=t,i){if(e===B)return e;let r=void 0!==i?s._$Co?.[i]:s._$Cl;const n=T(e)?void 0:e._$litDirective$;return r?.constructor!==n&&(r?._$AO?.(!1),void 0===n?r=void 0:(r=new n(t),r._$AT(t,s,i)),void 0!==i?(s._$Co??=[])[i]=r:s._$Cl=r),void 0!==r&&(e=Z(t,r._$AS(t,e.values),r,i)),e}class Q{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:s}=this._$AD,i=(t?.creationScope??M).importNode(e,!0);F.currentNode=i;let r=F.nextNode(),n=0,o=0,a=s[0];for(;void 0!==a;){if(n===a.index){let e;2===a.type?e=new X(r,r.nextSibling,this,t):1===a.type?e=new a.ctor(r,a.name,a.strings,this,t):6===a.type&&(e=new rt(r,this,t)),this._$AV.push(e),a=s[++o]}n!==a?.index&&(r=F.nextNode(),n++)}return F.currentNode=M,i}p(t){let e=0;for(const s of this._$AV)void 0!==s&&(void 0!==s.strings?(s._$AI(t,s,e),e+=s.strings.length-2):s._$AI(t[e])),e++}}class X{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,s,i){this.type=2,this._$AH=q,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=s,this.options=i,this._$Cv=i?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t?.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=Z(this,t,e),T(t)?t===q||null==t||""===t?(this._$AH!==q&&this._$AR(),this._$AH=q):t!==this._$AH&&t!==B&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):(t=>H(t)||"function"==typeof t?.[Symbol.iterator])(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==q&&T(this._$AH)?this._$AA.nextSibling.data=t:this.T(M.createTextNode(t)),this._$AH=t}$(t){const{values:e,_$litType$:s}=t,i="number"==typeof s?this._$AC(t):(void 0===s.el&&(s.el=K.createElement(G(s.h,s.h[0]),this.options)),s);if(this._$AH?._$AD===i)this._$AH.p(e);else{const t=new Q(i,this),s=t.u(this.options);t.p(e),this.T(s),this._$AH=t}}_$AC(t){let e=Y.get(t.strings);return void 0===e&&Y.set(t.strings,e=new K(t)),e}k(t){H(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let s,i=0;for(const r of t)i===e.length?e.push(s=new X(this.O(k()),this.O(k()),this,this.options)):s=e[i],s._$AI(r),i++;i<e.length&&(this._$AR(s&&s._$AB.nextSibling,i),e.length=i)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){const e=x(t).nextSibling;x(t).remove(),t=e}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t))}}class tt{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,s,i,r){this.type=1,this._$AH=q,this._$AN=void 0,this.element=t,this.name=e,this._$AM=i,this.options=r,s.length>2||""!==s[0]||""!==s[1]?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=q}_$AI(t,e=this,s,i){const r=this.strings;let n=!1;if(void 0===r)t=Z(this,t,e,0),n=!T(t)||t!==this._$AH&&t!==B,n&&(this._$AH=t);else{const i=t;let o,a;for(t=r[0],o=0;o<r.length-1;o++)a=Z(this,i[s+o],e,o),a===B&&(a=this._$AH[o]),n||=!T(a)||a!==this._$AH[o],a===q?t=q:t!==q&&(t+=(a??"")+r[o+1]),this._$AH[o]=a}n&&!i&&this.j(t)}j(t){t===q?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class et extends tt{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===q?void 0:t}}class st extends tt{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==q)}}class it extends tt{constructor(t,e,s,i,r){super(t,e,s,i,r),this.type=5}_$AI(t,e=this){if((t=Z(this,t,e,0)??q)===B)return;const s=this._$AH,i=t===q&&s!==q||t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive,r=t!==q&&(s===q||i);i&&this.element.removeEventListener(this.name,this,s),r&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class rt{constructor(t,e,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=s}get _$AU(){return this._$AM._$AU}_$AI(t){Z(this,t)}}const nt=w.litHtmlPolyfillSupport;nt?.(K,X),(w.litHtmlVersions??=[]).push("3.3.2");const ot=globalThis;class at extends A{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,s)=>{const i=s?.renderBefore??e;let r=i._$litPart$;if(void 0===r){const t=s?.renderBefore??null;i._$litPart$=r=new X(e.insertBefore(k(),t),t,void 0,s??{})}return r._$AI(t),r})(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return B}}at._$litElement$=!0,at.finalized=!0,ot.litElementHydrateSupport?.({LitElement:at});const lt=ot.litElementPolyfillSupport;lt?.({LitElement:at}),(ot.litElementVersions??=[]).push("4.2.2");const ht=t=>(e,s)=>{void 0!==s?s.addInitializer(()=>{customElements.define(t,e)}):customElements.define(t,e)},ct={attribute:!0,type:String,converter:v,reflect:!1,hasChanged:y},dt=(t=ct,e,s)=>{const{kind:i,metadata:r}=s;let n=globalThis.litPropertyMetadata.get(r);if(void 0===n&&globalThis.litPropertyMetadata.set(r,n=new Map),"setter"===i&&((t=Object.create(t)).wrapped=!0),n.set(s.name,t),"accessor"===i){const{name:i}=s;return{set(s){const r=e.get.call(this);e.set.call(this,s),this.requestUpdate(i,r,t,!0,s)},init(e){return void 0!==e&&this.C(i,void 0,t,e),e}}}if("setter"===i){const{name:i}=s;return function(s){const r=this[i];e.call(this,s),this.requestUpdate(i,r,t,!0,s)}}throw Error("Unsupported decorator location: "+i)};function pt(t){return(e,s)=>"object"==typeof s?dt(t,e,s):((t,e,s)=>{const i=e.hasOwnProperty(s);return e.constructor.createProperty(s,t),i?Object.getOwnPropertyDescriptor(e,s):void 0})(t,e,s)}function ut(t){return pt({...t,state:!0,attribute:!1})}const ft=o`
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
`,gt=o`
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
`;let $t=class extends at{constructor(){super(...arguments),this.showLabel=!0,this.showYield=!0}static{this.styles=gt}render(){const t=this._getStatus(),e=this._formatPower();return W`
      <div class="panel-tile ${t}">
        <span class="status-dot ${t}"></span>
        ${this.showLabel?W`<span class="panel-label">${this.data.label}</span>`:""}
        <span class="panel-power ${t}">${e}</span>
        ${this.showYield&&null!=this.data.yieldDay?W`<span class="panel-yield">${Math.round(this.data.yieldDay)} Wh today</span>`:""}
        <div class="panel-details">
          ${null!=this.data.voltage?W`<span>${this.data.voltage.toFixed(1)}V</span>`:""}
          ${null!=this.data.current?W`<span>${this.data.current.toFixed(2)}A</span>`:""}
        </div>
      </div>
    `}_getStatus(){return this.data.reachable?this.data.producing?"producing":"idle":"unreachable"}_formatPower(){return null==this.data.power?"-- W":`${Math.round(this.data.power)} W`}};t([pt({attribute:!1})],$t.prototype,"data",void 0),t([pt({type:Boolean})],$t.prototype,"showLabel",void 0),t([pt({type:Boolean})],$t.prototype,"showYield",void 0),$t=t([ht("opendtu-panel-tile")],$t);let mt=class extends at{static{this.styles=_t}setConfig(t){this._config={...t}}render(){return this._config?W`
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
          <label>Columns</label>
          <input
            type="number"
            min="1"
            max="12"
            .value=${String(this._config.columns||4)}
            @input=${this._columnsChanged}
          />
        </div>

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

        <p style="font-size: 0.85em; color: var(--secondary-text-color);">
          Panels are auto-discovered from OpenDTU Monitor sensors.
        </p>
      </div>
    `:W``}_fireConfigChanged(){const t=new CustomEvent("config-changed",{detail:{config:this._config},bubbles:!0,composed:!0});this.dispatchEvent(t)}_titleChanged(t){this._config={...this._config,title:t.target.value},this._fireConfigChanged()}_columnsChanged(t){this._config={...this._config,columns:parseInt(t.target.value)||4},this._fireConfigChanged()}_showLabelsChanged(t){this._config={...this._config,show_labels:t.target.checked},this._fireConfigChanged()}_showYieldChanged(t){this._config={...this._config,show_yield:t.target.checked},this._fireConfigChanged()}};t([pt({attribute:!1})],mt.prototype,"hass",void 0),t([ut()],mt.prototype,"_config",void 0),mt=t([ht("opendtu-monitor-card-editor")],mt);let vt=class extends at{static{this.styles=[ft,o`
      .empty-state {
        padding: 32px;
        text-align: center;
        color: var(--secondary-text-color, #666);
      }
      .inverter-group-header {
        font-size: 0.9em;
        font-weight: 500;
        color: var(--secondary-text-color);
        padding: 8px 0 4px;
      }
      .ac-summary {
        font-size: 0.8em;
        color: var(--secondary-text-color);
        padding: 4px 0 8px;
        display: flex;
        gap: 16px;
        flex-wrap: wrap;
      }
      .ac-summary span {
        white-space: nowrap;
      }
    `]}static getConfigElement(){return document.createElement("opendtu-monitor-card-editor")}static getStubConfig(){return{title:"Solar Panels",layout:"grid",columns:4,show_labels:!0,show_yield:!0}}setConfig(t){if(!t)throw new Error("Invalid configuration");this._config={layout:"grid",columns:4,show_labels:!0,show_yield:!0,...t}}getCardSize(){return 3}render(){if(!this._config||!this.hass)return W``;const t=this._discoverInverters();if(0===t.length)return W`
        <ha-card>
          ${this._config.title?W`<div class="card-header">${this._config.title}</div>`:""}
          <div class="empty-state">
            No OpenDTU Monitor sensors found. Make sure the integration is configured.
          </div>
        </ha-card>
      `;const e=this._buildPanelData(t);return W`
      <ha-card>
        ${this._config.title?W`<div class="card-header">${this._config.title}</div>`:""}
        ${t.length>1?this._renderMultiInverterGrid(t):this._renderSimpleGrid(e)}
      </ha-card>
    `}_renderSimpleGrid(t){const e=this._config.columns||4;return W`
      <div class="grid-container" style="grid-template-columns: repeat(${e}, 1fr)">
        ${t.map(t=>W`
            <opendtu-panel-tile
              .data=${t}
              .showLabel=${this._config.show_labels}
              .showYield=${this._config.show_yield}
            ></opendtu-panel-tile>
          `)}
      </div>
    `}_renderMultiInverterGrid(t){const e=this._config.columns||4;return W`
      ${t.map(t=>{const s=this._buildInverterPanels(t),i=this._getEntityValue(t,"AC","Power"),r=this._getEntityValue(t,"AC","Voltage"),n=this._getEntityValue(t,"AC","Frequency");return W`
          <div class="inverter-group-header">${t.name} (${t.serial})</div>
          <div class="ac-summary">
            ${null!=i?W`<span>AC: ${Math.round(i)} W</span>`:""}
            ${null!=r?W`<span>${r.toFixed(1)} V</span>`:""}
            ${null!=n?W`<span>${n.toFixed(1)} Hz</span>`:""}
          </div>
          <div class="grid-container" style="grid-template-columns: repeat(${e}, 1fr); margin-bottom: 12px;">
            ${s.map(t=>W`
                <opendtu-panel-tile
                  .data=${t}
                  .showLabel=${this._config.show_labels}
                  .showYield=${this._config.show_yield}
                ></opendtu-panel-tile>
              `)}
          </div>
        `})}
    `}_discoverInverters(){const t=new Map;for(const e of Object.keys(this.hass.states)){const s=this.hass.states[e],i=s.attributes.serial,r=s.attributes.section,n=s.attributes.field;if(!i||!r||!n)continue;if(!e.startsWith("sensor."))continue;const o=s.attributes.inverter_name;if(!o)continue;t.has(i)||t.set(i,{serial:i,name:o||i,strings:[],producing:s.attributes.producing||!1,reachable:s.attributes.reachable||!1});const a=t.get(i);if(s.attributes.producing&&(a.producing=!0),s.attributes.reachable&&(a.reachable=!0),"DC"===r){const t=String(s.attributes.string_channel??"0"),i=s.attributes.string_label||`String ${t}`;let r=a.strings.find(e=>e.channel===t);r||(r={channel:t,label:i,entities:{}},a.strings.push(r)),r.entities[n]=e}else{const t=`__${r.toLowerCase()}__`;let s=a.strings.find(e=>e.channel===t);s||(s={channel:t,label:r,entities:{}},a.strings.push(s)),s.entities[n]=e}}for(const e of t.values())e.strings.sort((t,e)=>{const s=!t.channel.startsWith("__"),i=!e.channel.startsWith("__");return s&&!i?-1:!s&&i?1:t.channel.localeCompare(e.channel,void 0,{numeric:!0})});return[...t.values()]}_buildPanelData(t){const e=[];for(const s of t)e.push(...this._buildInverterPanels(s));return e}_buildInverterPanels(t){const e=[];for(const s of t.strings)s.channel.startsWith("__")||e.push({serial:t.serial,inverterName:t.name,stringChannel:s.channel,label:s.label,power:this._readEntityValue(s.entities.Power),voltage:this._readEntityValue(s.entities.Voltage),current:this._readEntityValue(s.entities.Current),yieldDay:this._readEntityValue(s.entities.YieldDay),yieldTotal:this._readEntityValue(s.entities.YieldTotal),irradiation:this._readEntityValue(s.entities.Irradiation),producing:t.producing,reachable:t.reachable});return e}_getEntityValue(t,e,s){const i=`__${e.toLowerCase()}__`,r=t.strings.find(t=>t.channel===i);return r?this._readEntityValue(r.entities[s]):null}_readEntityValue(t){if(!t)return null;const e=this.hass.states[t];if(!e)return null;const s=parseFloat(e.state);return isNaN(s)?null:s}};t([pt({attribute:!1})],vt.prototype,"hass",void 0),t([ut()],vt.prototype,"_config",void 0),vt=t([ht("opendtu-monitor-card")],vt);const yt=window;yt.customCards=yt.customCards||[],yt.customCards.push({type:"opendtu-monitor-card",name:"OpenDTU Monitor",description:"Display solar panel grid from OpenDTU inverters"});export{vt as OpenDTUMonitorCard};
