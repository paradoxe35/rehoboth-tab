(self.webpackChunk=self.webpackChunk||[]).push([[998],{7943:(e,t,r)=>{"use strict";r.d(t,{$A:()=>m,Q:()=>v,dU:()=>h,IB:()=>b,DO:()=>p});var n=r(9748),a=r(2155),o=r(2818),u=r(5384);function i(e){return function(e){if(Array.isArray(e))return l(e)}(e)||function(e){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(e))return Array.from(e)}(e)||function(e,t){if(!e)return;if("string"==typeof e)return l(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);"Object"===r&&e.constructor&&(r=e.constructor.name);if("Map"===r||"Set"===r)return Array.from(e);if("Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))return l(e,t)}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function l(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,n=new Array(t);r<t;r++)n[r]=e[r];return n}function c(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function s(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?c(Object(r),!0).forEach((function(t){f(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):c(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function f(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}var d={cover:null,details:{},tickets:{},schedules:{},photos:[],other_info:{}},m=s({},d);function v(){m=s({},d)}var h=function(e,t){var r=(0,n.useRef)([]),a=(0,n.useCallback)((function(e){var r=e.target,n=r.value,a=r.name,u=r.type,l=r.checked;if(t){var c=t.split("."),s="checkbox"===u||"radio"===u?l:n;c.length<=1?m[t][a]=s:(0,o.LH)(m,[].concat(i(c),[a]),s)}}),[]);(0,n.useEffect)((function(){for(var t in e){var n=e[t];n&&!r.current.includes(n)&&(e[t].addEventListener("change",a),r.current.push(n),a({target:n}))}}),[e])},b=function(){var e=new FormData,t=new FormData;t.set("cover",m.cover),m.photos.forEach((function(t){return e.append("photos[]",t)}));var r=s({},m);return delete r.cover,delete r.photos,{formData:r,pictures:e,cover:t}},p=function(e,t,r,n){t(!0),(0,a.xm)("post",e.toString(),r).then((function(e){var t=e.data;u.d.success(null==t?void 0:t.message),n&&n(t)})).finally((function(){return t(!1)}))}},5691:(e,t,r)=>{"use strict";r.d(t,{N:()=>o,X:()=>u});var n=r(6400),a=r(9748),o=a.default.memo((0,a.forwardRef)((function(e,t){var r=e.label,o=void 0===r?"":r,u=e.type,i=void 0===u?"text":u,l=e.defaultValue,c=void 0===l?void 0:l,s=e.value,f=void 0===s?void 0:s,d=e.onChange,m=void 0===d?void 0:d,v=e.name,h=void 0===v?void 0:v,b=e.placeholder,p=void 0===b?void 0:b,y=(0,a.useMemo)((function(){return Math.random()}),[]);return(0,n.h)("div",{className:"mb-3"},(0,n.h)("label",{htmlFor:"input-".concat(y),className:"form-label"},o),(0,n.h)("input",{ref:t,type:i,value:f,onChange:m,defaultValue:c,name:h,placeholder:p,className:"form-control text-xs",id:"input-".concat(y)}))}))),u=a.default.memo((0,a.forwardRef)((function(e,t){var r=e.defaultChecked,o=void 0===r?void 0:r,u=e.label,i=void 0===u?"":u,l=e.checked,c=void 0===l?void 0:l,s=e.onChange,f=void 0===s?void 0:s,d=e.name,m=void 0===d?void 0:d,v=(0,a.useMemo)((function(){return Math.random()}),[]);return(0,n.h)("div",{className:"form-check my-3"},(0,n.h)("input",{className:"form-check-input",id:"checkbox-".concat(v),type:"checkbox",name:m,ref:t,defaultChecked:o,onChange:f,checked:c}),(0,n.h)("label",{className:"form-check-label",htmlFor:"checkbox-".concat(v)},i))})))},8322:(e,t,r)=>{"use strict";r.d(t,{Z:()=>p});var n=r(6400),a=r(9748),o=r(7943),u=r(5691),i=r(7757),l=r.n(i),c=r(516);function s(e,t,r,n,a,o,u){try{var i=e[o](u),l=i.value}catch(e){return void r(e)}i.done?t(l):Promise.resolve(l).then(n,a)}const f=function(e){var t=e.onChange,o=void 0===t?void 0:t,i=(0,a.useRef)(null),f=(0,a.useRef)(null),d=(0,c.I8)(o);return(0,a.useEffect)((function(){var e;return(e=l().mark((function e(){var t;return l().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!i.current){e.next=6;break}return e.next=3,r.e(338).then(r.t.bind(r,5725,23));case 3:t=e.sent.default,f.current=t({container:i.current}),f.current.on("change",d);case 6:case"end":return e.stop()}}),e)})),function(){var t=this,r=arguments;return new Promise((function(n,a){var o=e.apply(t,r);function u(e){s(o,n,a,u,i,"next",e)}function i(e){s(o,n,a,u,i,"throw",e)}u(void 0)}))})(),function(){return f.current&&f.current.destroy()}}),[]),(0,n.h)(u.N,{ref:i,label:"Recherche d'adresse"})};var d=r(5909),m=r(4687),v=r(9607),h=r(2818),b=r(962);const p=function(e){var t=e.placejsOnChange,r=e.sectionKey,i=e.$address,l=e.label,s=void 0===l?"Renseigner votre adresse map manuellement":l,p=(0,c.oj)(),y=p.ref,g=p.refs,w=g.lat,S=g.lng,O=(0,a.useRef)(null),j=(0,a.useRef)({lat:null,lng:null});(0,o.dU)(g,r);var N=(0,a.useCallback)((function(e){var r=e.suggestion;w.value="".concat(r.latlng.lat),S.value="".concat(r.latlng.lng),(0,h.bt)(w),(0,h.bt)(S),t&&t(r)}),[S,S,t]);return(0,n.h)(a.default.Fragment,null,(0,n.h)("div",{className:"row"},(0,n.h)("div",{className:"col-12"},(0,n.h)(f,{onChange:N})),(0,n.h)("div",{className:"col-12"},(0,n.h)(v.Z,null,s)),(0,n.h)("div",{className:"col-lg-6"},(0,n.h)(u.N,{defaultValue:i.latitude,label:"Latitude",name:"lat",ref:y,placeholder:"ex: -2.5056"})),(0,n.h)("div",{className:"col-lg-6"},(0,n.h)(u.N,{defaultValue:i.longitude,label:"Longitude",name:"lng",ref:y,placeholder:"ex: 28.8594"})),(0,n.h)("div",{className:"col-12"},(0,n.h)("a",{onClick:function(){var e=/^(-?\d+(\.\d+)?)$/;e.test(w.value.trim())&&e.test(S.value.trim())&&(j.current={lat:w.value.trim(),lng:S.value.trim()},O.current&&O.current.show())},href:"javascript:;",className:"text-sm btn-link"},"Aperçu Map"))),(0,n.h)(d.Z,{render:j,modalRef:O},(function(e){var t=e.current,r=t.lat,a=t.lng;return(0,n.h)(m.h,{width:"100%",height:"400",frameBorder:"1",style:{border:"1px solid grey"},scrolling:"no",src:(0,b.DB)(r,a)})})))}},119:(e,t,r)=>{"use strict";r.r(t),r.d(t,{default:()=>O});var n=r(6400),a=r(9748),o=r(1008),u=r(2155),i=r(5691),l=r(516),c=r(8322),s=r(2818),f=r(1838),d=r(5384),m=r(9607);function v(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){if("undefined"==typeof Symbol||!(Symbol.iterator in Object(e)))return;var r=[],n=!0,a=!1,o=void 0;try{for(var u,i=e[Symbol.iterator]();!(n=(u=i.next()).done)&&(r.push(u.value),!t||r.length!==t);n=!0);}catch(e){a=!0,o=e}finally{try{n||null==i.return||i.return()}finally{if(a)throw o}}return r}(e,t)||function(e,t){if(!e)return;if("string"==typeof e)return h(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);"Object"===r&&e.constructor&&(r=e.constructor.name);if("Map"===r||"Set"===r)return Array.from(e);if("Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))return h(e,t)}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function h(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,n=new Array(t);r<t;r++)n[r]=e[r];return n}var b=null,p=null,y=function(e){var t=e.pref;return(0,n.h)(a.default.Fragment,null,(0,n.h)(i.N,{defaultValue:p.venue,ref:t,name:"venue",label:"Lieu"}),(0,n.h)(i.N,{defaultValue:p.address,ref:t,name:"address",label:"Adresse"}),(0,n.h)(i.N,{defaultValue:p.city,ref:t,label:"Ville",name:"city"}),(0,n.h)(i.N,{defaultValue:p.state,ref:t,label:"Etat",name:"state"}),(0,n.h)(i.N,{defaultValue:p.country,ref:t,label:"Pays",name:"country"}))},g=function(){var e=(0,l.oj)(),t=e.ref,r=e.refs,o=r.country,u=r.city,f=r.state,d=(0,a.useCallback)((function(e){o.value=e.country||"",u.value=e.city||"",f.value=e.county||"",(0,s.bt)(f),(0,s.bt)(u),(0,s.bt)(o)}),[o,u,f]);return(0,n.h)(a.default.Fragment,null,(0,n.h)("div",{className:"row"},(0,n.h)("div",{className:"col-lg-6 mb-3"},(0,n.h)(m.Z,null,"L'adresse de l'Église"),(0,n.h)(y,{pref:t})),(0,n.h)("div",{className:"col-lg-6 mb-3"},(0,n.h)(m.Z,null,"Coordonnées de l'Église"),(0,n.h)(i.N,{defaultValue:b.email,name:"email",label:"Email"}),(0,n.h)(i.N,{defaultValue:b.phone,name:"phone",label:"Phone"}),(0,n.h)("div",{className:"mb-3"},(0,n.h)("label",{htmlFor:"descriptin",className:"form-label"},"Description"),(0,n.h)("textarea",{className:"form-control",name:"description",id:"descriptin",rows:3},b.description)))),(0,n.h)(m.Z,null,"Adresse map"),(0,n.h)(c.Z,{sectionKey:null,label:"Renseigner votre adresse map",$address:p,placejsOnChange:d}))},w=function(e){var t=e.formRef,r=v((0,a.useState)(!1),2),o=r[0],i=r[1];return(0,n.h)(f.Z,{loading:o,onClick:function(){i(!0);var e=new FormData(t.current);(0,u.xm)("post",route("admin.settings.church-details").toString(),e).finally((function(){return i(!1)})).then((function(e){var t=e.data.message;return d.d.success(t)}))},type:"button",className:"btn-sm text-sm mt-3",text:"Enregistrer"})},S=function(){var e=(0,a.useRef)(null);return(0,n.h)(o.Z,null,(0,n.h)("form",{method:"post",onSubmit:function(e){return e.preventDefault()},ref:e,autoComplete:"off"},(0,n.h)(g,null),(0,n.h)(w,{formRef:e})))};const O=function(e){return b=window.$details||{},p=b.address||{},(0,a.render)((0,n.h)(S,null),e),function(){return(0,a.unmountComponentAtNode)(e)}}},1008:(e,t,r)=>{"use strict";r.d(t,{Z:()=>a});var n=r(6400);r(9748);const a=function(e){var t=e.cardClass,r=void 0===t?"":t,a=e.bodyClass,o=void 0===a?"":a,u=e.children,i=e.border,l=void 0!==i&&i,c=e.className,s=void 0===c?"":c,f=e.title,d=void 0===f?void 0:f;return(0,n.h)("div",{className:"card ".concat(l?"":"border-0"," ").concat(r," ").concat(s)},d&&(0,n.h)("div",{className:"card-header"},d),(0,n.h)("div",{className:"card-body ".concat(o)},u))}},4687:(e,t,r)=>{"use strict";r.d(t,{h:()=>f,S:()=>d});var n=r(6400),a=r(9748),o=r(978);function u(){return(u=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e}).apply(this,arguments)}function i(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){if("undefined"==typeof Symbol||!(Symbol.iterator in Object(e)))return;var r=[],n=!0,a=!1,o=void 0;try{for(var u,i=e[Symbol.iterator]();!(n=(u=i.next()).done)&&(r.push(u.value),!t||r.length!==t);n=!0);}catch(e){a=!0,o=e}finally{try{n||null==i.return||i.return()}finally{if(a)throw o}}return r}(e,t)||function(e,t){if(!e)return;if("string"==typeof e)return l(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);"Object"===r&&e.constructor&&(r=e.constructor.name);if("Map"===r||"Set"===r)return Array.from(e);if("Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))return l(e,t)}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function l(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,n=new Array(t);r<t;r++)n[r]=e[r];return n}var c=function(e){var t=e.children,r=e.className,u=void 0===r?null:r,l=(0,a.useRef)(null),c=i((0,a.useState)(!0),2),s=c[0],f=c[1];return(0,a.useEffect)((function(){l.current&&(l.current.onload=function(){return f(!1)},l.current.onError=function(){return f(!1)})}),[l.current]),(0,n.h)(a.default.Fragment,null,s&&(0,n.h)(o.Z,{className:"my-5 ".concat(u)}),t(l,s))},s={visibility:"hidden",opacity:"0"},f=function(e){var t=e.loaderClass;return delete e.loaderClass,(0,n.h)(c,{className:t},(function(t,r){return(0,n.h)("iframe",u({hidden:r},e,{ref:t}))}))},d=function(e){return(0,n.h)(c,null,(function(t,r){return(0,n.h)("object",u({style:r?s:{}},e,{ref:t}))}))}},9607:(e,t,r)=>{"use strict";r.d(t,{Z:()=>a});var n=r(6400);r(9748);const a=function(e){var t=e.children;return(0,n.h)("div",{className:"text-xs text-muted mt-3 mb-2"},t)}},978:(e,t,r)=>{"use strict";r.d(t,{Z:()=>a});var n=r(6400);r(9748);const a=function(e){var t=e.sm,r=void 0===t?void 0:t,a=e.className,o=void 0===a?null:a;return(0,n.h)("div",{className:"d-flex justify-content-center align-items-center ".concat(o)},(0,n.h)("div",{className:"spinner-border ".concat(r?"spinner-border-".concat(r):""),role:"status"},(0,n.h)("span",{className:"visually-hidden"},"Loading...")))}},1838:(e,t,r)=>{"use strict";r.d(t,{Z:()=>o});var n=r(6400),a=r(9748);const o=function(e){var t=e.color,r=void 0===t?"primary":t,o=e.text,u=void 0===o?null:o,i=e.className,l=void 0===i?"":i,c=e.type,s=void 0===c?"button":c,f=e.loading,d=void 0!==f&&f,m=e.onClick,v=void 0===m?void 0:m,h=e.disabled,b=void 0===h?void 0:h;return(0,n.h)("button",{onClick:v,disabled:d||b,className:"btn btn-".concat(r," ").concat(l," text-white"),type:s},(0,n.h)("div",{className:"d-flex align-content-center align-items-center"},(0,n.h)("span",null,u),d&&(0,n.h)(a.default.Fragment,null,(0,n.h)("span",{className:"mx-1"}),(0,n.h)("span",{className:"spinner-border spinner-border-sm",role:"status","aria-hidden":"true"}),(0,n.h)("span",{className:"visually-hidden"},"Chargement..."))))}},5909:(e,t,r)=>{"use strict";r.d(t,{Z:()=>l});var n=r(6400),a=r(9748),o=r(1472);function u(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){if("undefined"==typeof Symbol||!(Symbol.iterator in Object(e)))return;var r=[],n=!0,a=!1,o=void 0;try{for(var u,i=e[Symbol.iterator]();!(n=(u=i.next()).done)&&(r.push(u.value),!t||r.length!==t);n=!0);}catch(e){a=!0,o=e}finally{try{n||null==i.return||i.return()}finally{if(a)throw o}}return r}(e,t)||function(e,t){if(!e)return;if("string"==typeof e)return i(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);"Object"===r&&e.constructor&&(r=e.constructor.name);if("Map"===r||"Set"===r)return Array.from(e);if("Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))return i(e,t)}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function i(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,n=new Array(t);r<t;r++)n[r]=e[r];return n}const l=function(e){var t=e.children,r=e.modalRef,i=void 0===r?null:r,l=e.keepAlive,c=void 0!==l&&l,s=e.render,f=void 0===s?null:s,d=e.size,m=void 0===d?"lg":d,v=e.footer,h=void 0===v?null:v,b=(0,a.useRef)(null),p=(0,a.useRef)(null),y=u((0,a.useState)(!1),2),g=y[0],w=y[1];return(0,a.useEffect)((function(){return p.current&&(b.current=new o.u_(p.current),i.current=b.current,p.current.addEventListener("hide.bs.modal",(function(){return w(!1)})),p.current.addEventListener("show.bs.modal",(function(){return w(!0)}))),function(){return b.current&&b.current.dispose()}}),[]),(0,a.createPortal)((0,n.h)("div",{className:"modal fade",ref:p,tabIndex:-1,role:"dialog","aria-hidden":"true"},(0,n.h)("div",{className:"modal-dialog modal-dialog-centered ".concat(m?"modal-".concat(m):""," modal-dialog-scrollable"),role:"document"},(0,n.h)("div",{className:"modal-content"},(0,n.h)("div",{className:"modal-body pb-2"},c||g?t(f,p.current):[]),(0,n.h)("div",{className:"modal-footer"},(0,n.h)("button",{type:"button",className:"btn btn-secondary btn-sm text-white","data-bs-dismiss":"modal"},"Fermer"),h)))),document.body)}},516:(e,t,r)=>{"use strict";r.d(t,{oj:()=>b,I8:()=>p,YI:()=>y,lq:()=>g,tJ:()=>w,Lj:()=>S,I0:()=>O,w:()=>j,$i:()=>N});var n=r(7757),a=r.n(n),o=r(9748);r(2818);function u(e,t,r,n,a,o,u){try{var i=e[o](u),l=i.value}catch(e){return void r(e)}i.done?t(l):Promise.resolve(l).then(n,a)}function i(e){return(i="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function l(e,t){var r;if("undefined"==typeof Symbol||null==e[Symbol.iterator]){if(Array.isArray(e)||(r=v(e))||t&&e&&"number"==typeof e.length){r&&(e=r);var n=0,a=function(){};return{s:a,n:function(){return n>=e.length?{done:!0}:{done:!1,value:e[n++]}},e:function(e){throw e},f:a}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var o,u=!0,i=!1;return{s:function(){r=e[Symbol.iterator]()},n:function(){var e=r.next();return u=e.done,e},e:function(e){i=!0,o=e},f:function(){try{u||null==r.return||r.return()}finally{if(i)throw o}}}}function c(e){return function(e){if(Array.isArray(e))return h(e)}(e)||function(e){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(e))return Array.from(e)}(e)||v(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function s(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function f(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?s(Object(r),!0).forEach((function(t){d(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):s(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function d(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function m(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){if("undefined"==typeof Symbol||!(Symbol.iterator in Object(e)))return;var r=[],n=!0,a=!1,o=void 0;try{for(var u,i=e[Symbol.iterator]();!(n=(u=i.next()).done)&&(r.push(u.value),!t||r.length!==t);n=!0);}catch(e){a=!0,o=e}finally{try{n||null==i.return||i.return()}finally{if(a)throw o}}return r}(e,t)||v(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function v(e,t){if(e){if("string"==typeof e)return h(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);return"Object"===r&&e.constructor&&(r=e.constructor.name),"Map"===r||"Set"===r?Array.from(e):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?h(e,t):void 0}}function h(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,n=new Array(t);r<t;r++)n[r]=e[r];return n}var b=function(){var e=m((0,o.useState)({}),2),t=e[0],r=e[1];return{ref:(0,o.useCallback)((function(e){e instanceof HTMLInputElement&&e.hasAttribute("name")&&r((function(t){return e.name in t&&t[e.name]===e?t:f(f({},t),{},d({},e.name,e))}))}),[]),refs:t}},p=function(e){var t=(0,o.useRef)(e);return t.current=e,(0,o.useCallback)((function(){t.current&&t.current.apply(t,arguments)}),[])},y=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],t=(0,o.useMemo)((function(){return(e||[]).map((function(e,t){return{id:"option_".concat(t),checked:!(null==e||!e.default),data:e}}))}),[e]),r=(0,o.useState)(t.length),n=m(r,2),a=n[0],u=n[1],i=(0,o.useState)(t),l=m(i,2),s=l[0],f=l[1],d=(0,o.useRef)(null);d.current=s,(0,o.useEffect)((function(){f((function(e){return[].concat(c(e),[{id:"option_".concat(a),checked:0===a,data:{}}])}))}),[a]);var v=(0,o.useCallback)((function(e){return f((function(t){return 1==t.length?t:t.filter((function(t){return t.id!=e}))}))}),[]);return{count:a,setCount:u,options:s,setOptions:f,onDelete:v}},g=function(){for(var e=arguments.length,t=new Array(e),r=0;r<e;r++)t[r]=arguments[r];var n=t.filter(Boolean);return n.length?0===n.length?n[0]:function(e){var t,r=l(n);try{for(r.s();!(t=r.n()).done;){var a=t.value;"function"==typeof a?a(e):a&&(a.current=e)}}catch(e){r.e(e)}finally{r.f()}}:null},w=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null,t=arguments.length>1?arguments[1]:void 0,r=(0,o.useState)(e||{}),n=m(r,2),a=n[0],u=n[1],i=(0,o.useRef)(null);(0,o.useEffect)((function(){u(e||{})}),[e]),(0,o.useEffect)((function(){i.current=a}),[a]);var l=(0,o.useCallback)((function(e,r){var n=e.page,a=i.current.meta;a&&a.current_page!=n&&t&&t(n,r)}),[]);return{listData:a,setListData:u,onPageChange:l,paginator:i}},S=function(){var e=m((0,o.useState)(null),2),t=e[0],r=e[1],n=m((0,o.useState)(!1),2),a=n[0],u=n[1],l=(0,o.useRef)(!1),c=(0,o.useRef)(null);(0,o.useEffect)((function(){a||null===t||(l.current=!0,u(!0))}),[t]);var s=(0,o.useCallback)((function(e){return r(e)}),[r]),f=(0,o.useCallback)((function(e){c.current!==e&&Array.isArray(e)&&(e.forEach((function(t,r){"object"===i(e[r])&&null!==e[r]&&(e[r].uid=r)})),c.current=e)}),[]);return{pswpIndex:t,setPswpIndex:r,pswpOpen:a,setPswpOpen:u,loadPswp:l.current,handleClickImage:s,mapImagesUid:f}},O=function(e,t){var r=m((0,o.useState)(null),2),n=r[0],a=r[1];(0,o.useEffect)((function(){e in t&&a(t[e])}),[t]);return{error:n,onKeyUp:function(){return a(null)}}},j=function(){var e=m((0,o.useState)({}),2),t=e[0],r=e[1],n=m((0,o.useState)(null),2),a=n[0],u=n[1],i=m((0,o.useState)(null),2);return{errors:t,setErrors:r,success:a,setSuccess:u,loading:i[0],setLoading:i[1]}},N=function(e){var t=m((0,o.useState)(!1),2),n=t[0],i=t[1],l=m((0,o.useState)(0),2),c=l[0],s=l[1];return(0,o.useEffect)((function(){c&&function(){var t,n=(t=a().mark((function t(){var n;return a().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(n={language:"fr"},!navigator.share){t.next=4;break}return navigator.share(e,n),t.abrupt("return");case 4:return i(!0),t.next=7,r.e(687).then(r.t.bind(r,2854,23));case 7:navigator.share(e,n),i(!1);case 9:case"end":return t.stop()}}),t)})),function(){var e=this,r=arguments;return new Promise((function(n,a){var o=t.apply(e,r);function i(e){u(o,n,a,i,l,"next",e)}function l(e){u(o,n,a,i,l,"throw",e)}i(void 0)}))});return function(){return n.apply(this,arguments)}}()()}),[c]),{open:c,setOption:s,loading:n}}}}]);