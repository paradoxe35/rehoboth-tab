(window.webpackJsonp=window.webpackJsonp||[]).push([[33],{141:function(t,e,n){"use strict";n.r(e);var a=n(0),r=n(9),o=n(3),c=n(7),i=n(53),l=n(168),s=n(217);e.default=function(t){var e=t.blog.data,n=t.comment,d=Object(o.useRef)(null);return Object(o.useEffect)((function(){d.current&&d.current.appendChild(document.createRange().createContextualFragment(n))}),[]),Object(a.h)(l.a,{bgColor:"rgba(5, 13, 24, 0.616)",title:"Blog - ".concat(e.title),imageSrc:e.image.public_path},Object(a.h)("div",{className:"container"},Object(a.h)("div",{className:"row justify-content-center"},Object(a.h)("div",{className:"col-lg-8 col-md-10 py-4 mb-5"},Object(a.h)("div",{className:"acticle-blog",dangerouslySetInnerHTML:{__html:Object(i.a)(JSON.parse(e.content).blocks)}}),Object(a.h)("hr",null),Object(a.h)("div",{className:"py-1 text-muted text-xs"},"Posté en ",e.date," ",null!=e&&e.category?Object(a.h)(a.Fragment,null," - ",Object(a.h)(r.InertiaLink,{href:route("guest.blog",{category:null==e?void 0:e.category.id}).toString()},null==e?void 0:e.category.name)):""," - Par ",Object(a.h)(s.a,{name:Object(c.a)(e.author)})),Object(a.h)("div",{className:"mt-4",ref:d})))))}},154:function(t,e,n){"use strict";var a=n(0),r=n(167),o=n.n(r),c=n(3),i=n(5),l=n(7);function s(t,e){return function(t){if(Array.isArray(t))return t}(t)||function(t,e){if("undefined"==typeof Symbol||!(Symbol.iterator in Object(t)))return;var n=[],a=!0,r=!1,o=void 0;try{for(var c,i=t[Symbol.iterator]();!(a=(c=i.next()).done)&&(n.push(c.value),!e||n.length!==e);a=!0);}catch(t){r=!0,o=t}finally{try{a||null==i.return||i.return()}finally{if(r)throw o}}return n}(t,e)||function(t,e){if(!t)return;if("string"==typeof t)return d(t,e);var n=Object.prototype.toString.call(t).slice(8,-1);"Object"===n&&t.constructor&&(n=t.constructor.name);if("Map"===n||"Set"===n)return Array.from(t);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return d(t,e)}(t,e)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function d(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,a=new Array(e);n<e;n++)a[n]=t[n];return a}function u(){var t=h(["\n    background-size: cover; \n    transition: opacity 500ms ease 500ms; \n    position: absolute;\n    ","\n"]);return u=function(){return t},t}function m(){var t=h(["\n    position: absolute; \n    top: 0;\n    bottom: 0;\n    left: 0;\n    right: 0;\n    transition: opacity 500ms ease 0s;\n"]);return m=function(){return t},t}function b(){var t=h(["\n    display: block;\n    overflow: hidden;\n    position: relative;\n    transition-duration: .2s;\n    transition-property: box-shadow;\n"]);return b=function(){return t},t}function h(t,e){return e||(e=t.slice(0)),Object.freeze(Object.defineProperties(t,{raw:{value:Object.freeze(e)}}))}var p=i.a.div(b()),f=i.a.div(m()),v=i.a.div(u(),(function(t){return t.load?"\n            opacity: 0;\n            top: 0;\n            bottom: 0;\n            left: 0;\n            right: 0;\n        ":"\n            opacity: 1;\n            left: 0;\n            top: 0;\n            bottom: 0;\n            right: 0;\n        "}));e.a=function(t){var e=t.image,n=t.title,r=void 0===n?null:n,i=t.height,d=void 0===i?"auto":i,u=t.className,m=void 0===u?null:u,b=s(Object(c.useState)(!1),2),h=b[0],g=b[1],y=Object(c.useRef)(null),j=Object(c.useRef)(null);return Object(c.useEffect)((function(){if(j.current&&"auto"==d){var t=0,n=function(){if(j.current){var n=j.current.getBoundingClientRect();t!==n.width&&(t=n.width,j.current.style.height="".concat(e.height/e.width*t,"px"))}};n();var a=null;return 0===t&&(a=Object(l.k)(j.current,(function(e){0===t&&e&&n()}))),window.addEventListener("resize",Object(l.n)(n,50)),function(){window.removeEventListener("resize",Object(l.n)(n,50)),a&&a()}}}),[]),Object(c.useEffect)((function(){y.current&&o()(y.current,{load:function(t){var n=new Image;n.onload=function(){return g(!0)},n.src=t.getAttribute("data-src"),n.style.width="100%",n.style.height=d,"100%"==d&&(n.style.objectFit="cover"),n.alt=r||e.caption,t.parentElement.appendChild(n)}}).observe()}),[]),Object(a.h)(p,{ref:j,style:{height:d},className:m},Object(a.h)("img",{style:{display:"block",width:"100%",height:"100%"},src:"data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMDAwIiBoZWlnaHQ9IjEwMDAiPjwvc3ZnPg==",role:"presentation"}),Object(a.h)(v,{load:h,style:{backgroundImage:"url(".concat(e.thumbnail,")")}}),Object(a.h)(f,{style:{opacity:h?"1":"0"}},Object(a.h)("div",{style:{visibility:"hidden",opacity:"0",width:"0",height:"0px",margin:"0",padding:"0"},ref:y,"data-src":e.public_path})))}},156:function(t,e,n){"use strict";var a=n(0);n(3);e.a=function(t){var e=t.sm,n=void 0===e?void 0:e,r=t.className,o=void 0===r?null:r;return Object(a.h)("div",{className:"d-flex justify-content-center align-items-center ".concat(o)},Object(a.h)("div",{className:"spinner-border ".concat(n?"spinner-border-".concat(n):""),role:"status"},Object(a.h)("span",{className:"visually-hidden"},"Loading...")))}},168:function(t,e,n){"use strict";var a=n(0),r=n(3),o=n(175),c=n.n(o),i=n(69),l=n(5),s=n(169),d=n.n(s),u=n(9);function m(){var t=p(["\n    padding-top: 110.5px;\n    padding-bottom: 103px;\n"]);return m=function(){return t},t}function b(){var t=p(['\n    min-height: 257px;\n    position: relative;\n    background-position: 50% 40%;\n    background-repeat: no-repeat;\n    background-size: cover;\n    &:before {\n        content: "";\n        background: '," ;\n        position: absolute;\n        bottom: 0;\n        top: 0;\n        left: 0;\n        right: 0;\n        z-index: 9;\n    }\n"]);return b=function(){return t},t}function h(){var t=p(["\n    z-index: 20;\n    h1.h3 {\n        color: #dbdbdb;\n        border-top: solid 1px rgba(255,255,255,.1);\n        border-bottom: solid 1px rgba(255,255,255,.1);\n        display: block;\n        z-index: 20;\n        padding: 10px;\n        position: relative;\n    }\n"]);return h=function(){return t},t}function p(t,e){return e||(e=t.slice(0)),Object.freeze(Object.defineProperties(t,{raw:{value:Object.freeze(e)}}))}var f=l.a.div(h()),v=l.a.div(b(),(function(t){return t.color||"var(--bs-bg-color-hero)"})),g=l.a.div(m());e.a=function(t){var e=t.title,n=void 0===e?"":e,o=t.imageSrc,l=void 0===o?null:o,s=t.children,m=t.headTitle,b=void 0===m?null:m,h=t.heroClass,p=void 0===h?"mb-4":h,y=t.bgColor,j=void 0===y?void 0:y,O=Object(r.useRef)(null),w=Object(u.usePage)().props.appName;return Object(r.useEffect)((function(){var t=O.current,e=function(){var e=document.body.clientWidth;t.style.width=e+"px"};if(t)return window.addEventListener("resize",e),function(){window.removeEventListener("resize",e)}}),[O.current]),Object(a.h)(c.a,{className:"nav--muted"},Object(a.h)(a.Fragment,null,Object(a.h)(i.a,null,Object(a.h)("title",null,n||b?(b||n)+" - ":"",w)),Object(a.h)(v,{color:j,className:p,style:{backgroundImage:"url(".concat(l||d.a,")")},ref:O},Object(a.h)(f,{className:"px-lg-6 px-lg-7 container"},Object(a.h)(g,{className:"h-100 justify-content-center text-center row"},Object(a.h)("div",{className:"col-lg-6"},Object(a.h)("h1",{className:"h3 font-weight-bold m-0",style:{lineHeight:1}},n))))),s))}},169:function(t,e){t.exports="/assets/images/hero.a26fc46e9ed8d1b8.jpg"},217:function(t,e,n){"use strict";var a=n(0),r=n(3),o=n(258),c=n(5),i=n(24),l=n(154),s=n(156);function d(t,e){return function(t){if(Array.isArray(t))return t}(t)||function(t,e){if("undefined"==typeof Symbol||!(Symbol.iterator in Object(t)))return;var n=[],a=!0,r=!1,o=void 0;try{for(var c,i=t[Symbol.iterator]();!(a=(c=i.next()).done)&&(n.push(c.value),!e||n.length!==e);a=!0);}catch(t){r=!0,o=t}finally{try{a||null==i.return||i.return()}finally{if(r)throw o}}return n}(t,e)||function(t,e){if(!t)return;if("string"==typeof t)return u(t,e);var n=Object.prototype.toString.call(t).slice(8,-1);"Object"===n&&t.constructor&&(n=t.constructor.name);if("Map"===n||"Set"===n)return Array.from(t);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return u(t,e)}(t,e)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function u(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,a=new Array(e);n<e;n++)a[n]=t[n];return a}function m(){var t=function(t,e){e||(e=t.slice(0));return Object.freeze(Object.defineProperties(t,{raw:{value:Object.freeze(e)}}))}(["\n    text-align: start;\n    text-decoration: none;\n    text-shadow: none;\n    text-transform: none;\n    letter-spacing: normal;\n    word-break: normal;\n    word-spacing: normal;\n    white-space: normal;\n    line-break: auto;\n    font-size: .875rem;\n    max-width: 276px;\n    font-style: normal;\n    font-weight: 400;\n    line-height: 1.5;\n    background-color: var(--bs-light);\n    background-clip: padding-box;\n    overflow: hidden;\n    border-radius: .3rem;\n    .popover-header {\n        padding: .5rem 1rem;\n        margin-bottom: 0;\n        font-size: 1rem;\n        background-color: #f0f0f0;\n        border-bottom: 1px solid #d8d8d8;\n        border-top-left-radius: calc(.3rem - 1px);\n        border-top-right-radius: calc(.3rem - 1px);\n        margin-top: 0;\n        font-weight: 500;\n        line-height: 1.2;\n    }\n    .popover-body {\n        padding: 1rem 1rem;\n        overflow: hidden;\n        color: #212529;\n    }\n"]);return m=function(){return t},t}var b=c.a.div(m());e.a=function(t){var e=t.name,n=d(Object(r.useState)(null),2),c=n[0],u=n[1],m=d(Object(r.useState)(!1),2),h=m[0],p=m[1];Object(r.useEffect)((function(){!c&&h&&Object(i.b)(route("guest.app.profiles",{name:e})).then((function(t){var e=t.data.profile;return u({data:e})})).catch((function(){return u(void 0)}))}),[h]);return Object(a.h)(o.Popover,{isOpen:h,positions:["top","right","left","bottom"],containerStyle:{zIndex:"1030"},padding:10,onClickOutside:function(){return p(!1)},content:function(t){var n=t.position,r=t.childRect,i=t.popoverRect;return Object(a.h)(o.ArrowContainer,{position:n,childRect:r,popoverRect:i,arrowColor:"#c7ae68",arrowSize:10,arrowStyle:{opacity:"1"},className:"popover-arrow-container",arrowClassName:"popover-arrow"},Object(a.h)(b,{className:"shadow-lg"},Object(a.h)("h3",{className:"popover-header"},e),Object(a.h)("div",{className:"popover-body"},null===c&&Object(a.h)(s.a,{sm:"sm"}),(null==c?void 0:c.data)&&Object(a.h)(a.Fragment,null,Object(a.h)(l.a,{image:c.data.image}),c.data.phone&&Object(a.h)("div",{className:"text-sm text-muted my-1"},"Phone: ",Object(a.h)("a",{href:"tel:".concat(c.data.phone)},c.data.phone)),c.data.email&&Object(a.h)("div",{className:"text-sm text-muted my-1"},"Email: ",Object(a.h)("a",{href:"mailto:".concat(c.data.email)},c.data.email)),c.data.description&&Object(a.h)("div",{className:"text-sm text-muted my-1"},c.data.description)))))}},Object(a.h)("a",{href:"javascript:;",onClick:function(){c&&!c.data||p(!0)}},e))}},53:function(t,e,n){"use strict";n.d(e,"a",(function(){return o}));var a=n(60),r={makeParagraph:function(t){return'<p class="blog_post_text"> '.concat(t.data.text,"</p>")},makeCode:function(t){var e="code-".concat(Math.random());return Object(a.b)("https://unpkg.com/@highlightjs/cdn-assets@10.4.0/styles/atom-one-dark.min.css"),Object(a.a)("https://unpkg.com/@highlightjs/cdn-assets@10.4.0/highlight.min.js",(function(){var t=window.hljs;window.setTimeout((function(){var n=document.getElementById(e);n&&t.highlightBlock(n)}),500)})),"<pre id=".concat(e,' class="prettyprint"><code>').concat(t.code,"</code></pre>")},makeImage:function(t){var e=t.data.caption?'<div class="blog_caption">\n                                <p class="text-sm">'.concat(t.data.caption,"</p>\n                            </div>"):"";return t.data.withBackground?'\n            <div class="cdx-simple-image__picture cdx-simple-image__picture--with-background">\n                <img src="'.concat(t.data.url,'" class="img-cover-full" alt="').concat(t.data.caption,'" />\n            </div>\n            <small><em>').concat(e,"</em></small>\n        "):'\n            <div class="d-flex justify-content-center">\n                <article style="max-height: 550px;max-width:80%">\n                    <img src="'.concat(t.data.url,'" class="img-cover-full" alt="').concat(t.data.caption,'" />\n                    <small><em>').concat(e,"</em></small>\n                </article>\n            </div>\n        ")},makeEmbed:function(t){var e=t.data.caption?'<div class="blog_caption">\n                <p class="text-sm">'.concat(t.data.caption,"</p>\n            </div>"):"";return'\n            <div class="my-4">\n                <div class="ratio">\n                    <iframe width="560" height="315" src="'.concat(t.data.embed,'" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>\n                </div>\n                <small><em>').concat(e,"</em></small>\n            </div>")},makeHeader:function(t){return"<h".concat(t.data.level,' class="blog_post_h').concat(t.data.level,'">').concat(t.data.text,"</h").concat(t.data.level,">")},makeList:function(t){if("unordered"===t.data.style){var e=t.data.items.map((function(t){return"<li>".concat(t,"</li>")}));return'<ul class="blog_post_ul my-2">\n                            '.concat(e.join(""),"\n                        </ul>")}var n=t.data.items.map((function(t){return"<li>".concat(t,"</li>")}));return'<ul class="blog_post_ul my-2">\n                            '.concat(n.join(""),"\n                        </ul>")},makeDelimeter:function(t){return'<div class="text-center"><div class="ce-delimiter cdx-block my-3"></div></div>\n'},makeTelegramPost:function(t){var e=new URL(t.data.url).pathname.slice(1);return'<div class="my-3">\n                <script async src="https://telegram.org/js/telegram-widget.js?14" data-telegram-post="'.concat(e,'" data-width="100%" data-color="5E72E4"><\/script>\n            </div>')},makeLinkTool:function(t){var e=t.data.meta;return'\n            <div class="card my-4 shadow-none border border-darken-1">\n                <div class="card-body">\n                    <div class="d-flex justify-content-between mb-3">\n                        <div>\n                            <a href="'.concat(t.data.link,'" target="_blank">\n                                <h5 class="card-title">').concat(e.title,'</h5>\n                            </a>\n                            <div class="card-text link-tool__description">').concat(e.description,"</div>\n                        </div>\n                        ").concat(e.image.url.constructor===String&&e.image.url.length?'\n                            <a href="'.concat(t.data.link,'" target="_blank">\n                                <div style="height: 65px;width: 65px;">\n                                    <img src="').concat(e.image.url,'" class="img-cover-full" alt="').concat(e.title,'" />\n                                </div>\n                            </a>\n                        '):"",'\n                    </div>\n                    <div class="mt-2 mb-2">\n                        <div class="card-subtitle">\n                            <a href="').concat(t.data.link,'" target="_blank" class="card-link text-sm text-muted">\n                                ').concat(new URL(t.data.link).origin,"\n                            </a>\n                        </div>\n                    </div>\n                </div>\n            </div>\n        ")}},o=function(t){var e=r;return t.map((function(t){var n="";switch(t.type){case"delimiter":n+=e.makeDelimeter(t);break;case"image":n+=e.makeImage(t);break;case"list":n+=e.makeList(t);break;case"header":n+=e.makeHeader(t);break;case"paragraph":n+=e.makeParagraph(t);break;case"embed":n+=e.makeEmbed(t);break;case"linkTool":n+=e.makeLinkTool(t);break;case"code":n+=e.makeCode(t.data);break;case"telegramPost":n+=e.makeTelegramPost(t);break;default:return""}return n})).join("\n")}},60:function(t,e,n){"use strict";n.d(e,"a",(function(){return r})),n.d(e,"b",(function(){return c}));var a={},r=function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null;if(t in a)a[t].loaded?e&&e():a[t].callbacks.push(e);else{a[t]={loaded:!1,callbacks:[e]};var n=document.createElement("script");n.setAttribute("src",t),n.async=!0,n.onload=function(){a[t].loaded=!0,a[t].callbacks.forEach((function(t){return t&&t()}))},n.setAttribute("charset","utf-8"),document.head.appendChild(n)}},o=[],c=function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null;if(o.includes(t))e&&e();else{var n=document.createElement("link");n.href=t,n.onload=e,n.rel="stylesheet",o.push(t),document.head.appendChild(n)}}}}]);