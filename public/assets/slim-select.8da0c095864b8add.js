(self.webpackChunk=self.webpackChunk||[]).push([[946],{7295:(e,t,i)=>{"use strict";i.r(t),i.d(t,{slim:()=>d});var n,s,a={};n=window,s=function(){return i={},e.m=t=[function(e,t,i){function n(e,t){t=t||{bubbles:!1,cancelable:!1,detail:void 0};var i=document.createEvent("CustomEvent");return i.initCustomEvent(e,t.bubbles,t.cancelable,t.detail),i}var s;t.__esModule=!0,t.hasClassInTree=function(e,t){function i(e,t){return t&&e&&e.classList&&e.classList.contains(t)?e:null}return i(e,t)||function e(t,n){return t&&t!==document?i(t,n)?t:e(t.parentNode,n):null}(e,t)},t.ensureElementInView=function(e,t){var i=e.scrollTop+e.offsetTop,n=i+e.clientHeight,s=t.offsetTop,a=s+t.clientHeight;s<i?e.scrollTop-=i-s:n<a&&(e.scrollTop+=a-n)},t.putContent=function(e,t,i){var n=e.offsetHeight,s=e.getBoundingClientRect(),a=i?s.top:s.top-n,o=i?s.bottom:s.bottom+n;return a<=0?"below":o>=window.innerHeight?"above":i?t:"below"},t.debounce=function(e,t,i){var n;return void 0===t&&(t=100),void 0===i&&(i=!1),function(){for(var s=[],a=0;a<arguments.length;a++)s[a]=arguments[a];var o=self,l=i&&!n;clearTimeout(n),n=setTimeout((function(){n=null,i||e.apply(o,s)}),t),l&&e.apply(o,s)}},t.isValueInArrayOfObjects=function(e,t,i){if(!Array.isArray(e))return e[t]===i;for(var n=0,s=e;n<s.length;n++){var a=s[n];if(a&&a[t]&&a[t]===i)return!0}return!1},t.highlight=function(e,t,i){var n=e,s=new RegExp("("+t.trim()+")(?![^<]*>[^<>]*</)","i");if(!e.match(s))return e;var a=e.match(s).index,o=a+e.match(s)[0].toString().length,l=e.substring(a,o);return n.replace(s,'<mark class="'+i+'">'+l+"</mark>")},t.kebabCase=function(e){var t=e.replace(/[A-Z\u00C0-\u00D6\u00D8-\u00DE]/g,(function(e){return"-"+e.toLowerCase()}));return e[0]===e[0].toUpperCase()?t.substring(1):t},"function"!=typeof(s=window).CustomEvent&&(n.prototype=s.Event.prototype,s.CustomEvent=n)},function(e,t,i){t.__esModule=!0;var n=(s.prototype.newOption=function(e){return{id:e.id?e.id:String(Math.floor(1e8*Math.random())),value:e.value?e.value:"",text:e.text?e.text:"",innerHTML:e.innerHTML?e.innerHTML:"",selected:!!e.selected&&e.selected,display:void 0===e.display||e.display,disabled:!!e.disabled&&e.disabled,placeholder:!!e.placeholder&&e.placeholder,class:e.class?e.class:void 0,data:e.data?e.data:{},mandatory:!!e.mandatory&&e.mandatory}},s.prototype.add=function(e){this.data.push({id:String(Math.floor(1e8*Math.random())),value:e.value,text:e.text,innerHTML:"",selected:!1,display:!0,disabled:!1,placeholder:!1,class:void 0,mandatory:e.mandatory,data:{}})},s.prototype.parseSelectData=function(){this.data=[];for(var e=0,t=this.main.select.element.childNodes;e<t.length;e++){var i=t[e];if("OPTGROUP"===i.nodeName){for(var n={label:i.label,options:[]},s=0,a=i.childNodes;s<a.length;s++){var o=a[s];if("OPTION"===o.nodeName){var l=this.pullOptionData(o);n.options.push(l),l.placeholder&&""!==l.text.trim()&&(this.main.config.placeholderText=l.text)}}this.data.push(n)}else"OPTION"===i.nodeName&&(l=this.pullOptionData(i),this.data.push(l),l.placeholder&&""!==l.text.trim()&&(this.main.config.placeholderText=l.text))}},s.prototype.pullOptionData=function(e){return{id:!!e.dataset&&e.dataset.id||String(Math.floor(1e8*Math.random())),value:e.value,text:e.text,innerHTML:e.innerHTML,selected:e.selected,disabled:e.disabled,placeholder:"true"===e.dataset.placeholder,class:e.className,style:e.style.cssText,data:e.dataset,mandatory:!!e.dataset&&"true"===e.dataset.mandatory}},s.prototype.setSelectedFromSelect=function(){if(this.main.config.isMultiple){for(var e=[],t=0,i=this.main.select.element.options;t<i.length;t++){var n=i[t];if(n.selected){var s=this.getObjectFromData(n.value,"value");s&&s.id&&e.push(s.id)}}this.setSelected(e,"id")}else{var a=this.main.select.element;if(-1!==a.selectedIndex){var o=a.options[a.selectedIndex].value;this.setSelected(o,"value")}}},s.prototype.setSelected=function(e,t){void 0===t&&(t="id");for(var i=0,n=this.data;i<n.length;i++){var s=n[i];if(s.hasOwnProperty("label")){if(s.hasOwnProperty("options")){var a=s.options;if(a)for(var o=0,l=a;o<l.length;o++){var r=l[o];r.placeholder||(r.selected=this.shouldBeSelected(r,e,t))}}}else s.selected=this.shouldBeSelected(s,e,t)}},s.prototype.shouldBeSelected=function(e,t,i){if(void 0===i&&(i="id"),Array.isArray(t))for(var n=0,s=t;n<s.length;n++){var a=s[n];if(i in e&&String(e[i])===String(a))return!0}else if(i in e&&String(e[i])===String(t))return!0;return!1},s.prototype.getSelected=function(){for(var e={text:"",placeholder:this.main.config.placeholderText},t=[],i=0,n=this.data;i<n.length;i++){var s=n[i];if(s.hasOwnProperty("label")){if(s.hasOwnProperty("options")){var a=s.options;if(a)for(var o=0,l=a;o<l.length;o++){var r=l[o];r.selected&&(this.main.config.isMultiple?t.push(r):e=r)}}}else s.selected&&(this.main.config.isMultiple?t.push(s):e=s)}return this.main.config.isMultiple?t:e},s.prototype.addToSelected=function(e,t){if(void 0===t&&(t="id"),this.main.config.isMultiple){var i=[],n=this.getSelected();if(Array.isArray(n))for(var s=0,a=n;s<a.length;s++){var o=a[s];i.push(o[t])}i.push(e),this.setSelected(i,t)}},s.prototype.removeFromSelected=function(e,t){if(void 0===t&&(t="id"),this.main.config.isMultiple){for(var i=[],n=0,s=this.getSelected();n<s.length;n++){var a=s[n];String(a[t])!==String(e)&&i.push(a[t])}this.setSelected(i,t)}},s.prototype.onDataChange=function(){this.main.onChange&&this.isOnChangeEnabled&&this.main.onChange(JSON.parse(JSON.stringify(this.getSelected())))},s.prototype.getObjectFromData=function(e,t){void 0===t&&(t="id");for(var i=0,n=this.data;i<n.length;i++){var s=n[i];if(t in s&&String(s[t])===String(e))return s;if(s.hasOwnProperty("options")&&s.options)for(var a=0,o=s.options;a<o.length;a++){var l=o[a];if(String(l[t])===String(e))return l}}return null},s.prototype.search=function(e){if(""!==(this.searchValue=e).trim()){var t=this.main.config.searchFilter,i=this.data.slice(0);e=e.trim();var n=i.map((function(i){if(i.hasOwnProperty("options")){var n=i,s=[];if(n.options&&(s=n.options.filter((function(i){return t(i,e)}))),0!==s.length){var a=Object.assign({},n);return a.options=s,a}}return i.hasOwnProperty("text")&&t(i,e)?i:null}));this.filtered=n.filter((function(e){return e}))}else this.filtered=null},s);function s(e){this.contentOpen=!1,this.contentPosition="below",this.isOnChangeEnabled=!0,this.main=e.main,this.searchValue="",this.data=[],this.filtered=null,this.parseSelectData(),this.setSelectedFromSelect()}function a(e){return void 0!==e.text||(console.error("Data object option must have at least have a text value. Check object: "+JSON.stringify(e)),!1)}t.Data=n,t.validateData=function(e){if(!e)return console.error("Data must be an array of objects"),!1;for(var t=0,i=0,n=e;i<n.length;i++){var s=n[i];if(s.hasOwnProperty("label")){if(s.hasOwnProperty("options")){var o=s.options;if(o)for(var l=0,r=o;l<r.length;l++)a(r[l])||t++}}else a(s)||t++}return 0===t},t.validateOption=a},function(e,t,i){t.__esModule=!0;var n=i(3),s=i(4),a=i(5),o=i(1),l=i(0),r=(c.prototype.validate=function(e){var t="string"==typeof e.select?document.querySelector(e.select):e.select;if(!t)throw new Error("Could not find select element");if("SELECT"!==t.tagName)throw new Error("Element isnt of type select");return t},c.prototype.selected=function(){if(this.config.isMultiple){for(var e=[],t=0,i=s=this.data.getSelected();t<i.length;t++){var n=i[t];e.push(n.value)}return e}var s;return(s=this.data.getSelected())?s.value:""},c.prototype.set=function(e,t,i,n){void 0===t&&(t="value"),void 0===i&&(i=!0),void 0===n&&(n=!0),this.config.isMultiple&&!Array.isArray(e)?this.data.addToSelected(e,t):this.data.setSelected(e,t),this.select.setValue(),this.data.onDataChange(),this.render(),i&&this.close()},c.prototype.setSelected=function(e,t,i,n){void 0===t&&(t="value"),void 0===i&&(i=!0),void 0===n&&(n=!0),this.set(e,t,i,n)},c.prototype.setData=function(e){if(o.validateData(e)){for(var t=JSON.parse(JSON.stringify(e)),i=this.data.getSelected(),n=0;n<t.length;n++)t[n].value||t[n].placeholder||(t[n].value=t[n].text);if(this.config.isAjax&&i)if(this.config.isMultiple)for(var s=0,a=i.reverse();s<a.length;s++){var l=a[s];t.unshift(l)}else{for(t.unshift(i),n=0;n<t.length;n++)t[n].placeholder||t[n].value!==i.value||t[n].text!==i.text||delete t[n];var r=!1;for(n=0;n<t.length;n++)t[n].placeholder&&(r=!0);r||t.unshift({text:"",placeholder:!0})}this.select.create(t),this.data.parseSelectData(),this.data.setSelectedFromSelect()}else console.error("Validation problem on: #"+this.select.element.id)},c.prototype.addData=function(e){o.validateData([e])?(this.data.add(this.data.newOption(e)),this.select.create(this.data.data),this.data.parseSelectData(),this.data.setSelectedFromSelect(),this.render()):console.error("Validation problem on: #"+this.select.element.id)},c.prototype.open=function(){var e=this;if(this.config.isEnabled&&!this.data.contentOpen){if(this.beforeOpen&&this.beforeOpen(),this.config.isMultiple&&this.slim.multiSelected?this.slim.multiSelected.plus.classList.add("ss-cross"):this.slim.singleSelected&&(this.slim.singleSelected.arrowIcon.arrow.classList.remove("arrow-down"),this.slim.singleSelected.arrowIcon.arrow.classList.add("arrow-up")),this.slim[this.config.isMultiple?"multiSelected":"singleSelected"].container.classList.add("above"===this.data.contentPosition?this.config.openAbove:this.config.openBelow),this.config.addToBody){var t=this.slim.container.getBoundingClientRect();this.slim.content.style.top=t.top+t.height+window.scrollY+"px",this.slim.content.style.left=t.left+window.scrollX+"px",this.slim.content.style.width=t.width+"px"}if(this.slim.content.classList.add(this.config.open),"up"===this.config.showContent.toLowerCase()||"down"!==this.config.showContent.toLowerCase()&&"above"===l.putContent(this.slim.content,this.data.contentPosition,this.data.contentOpen)?this.moveContentAbove():this.moveContentBelow(),!this.config.isMultiple){var i=this.data.getSelected();if(i){var n=i.id,s=this.slim.list.querySelector('[data-id="'+n+'"]');s&&l.ensureElementInView(this.slim.list,s)}}setTimeout((function(){e.data.contentOpen=!0,e.config.searchFocus&&e.slim.search.input.focus(),e.afterOpen&&e.afterOpen()}),this.config.timeoutDelay)}},c.prototype.close=function(){var e=this;this.data.contentOpen&&(this.beforeClose&&this.beforeClose(),this.config.isMultiple&&this.slim.multiSelected?(this.slim.multiSelected.container.classList.remove(this.config.openAbove),this.slim.multiSelected.container.classList.remove(this.config.openBelow),this.slim.multiSelected.plus.classList.remove("ss-cross")):this.slim.singleSelected&&(this.slim.singleSelected.container.classList.remove(this.config.openAbove),this.slim.singleSelected.container.classList.remove(this.config.openBelow),this.slim.singleSelected.arrowIcon.arrow.classList.add("arrow-down"),this.slim.singleSelected.arrowIcon.arrow.classList.remove("arrow-up")),this.slim.content.classList.remove(this.config.open),this.data.contentOpen=!1,this.search(""),setTimeout((function(){e.slim.content.removeAttribute("style"),e.data.contentPosition="below",e.config.isMultiple&&e.slim.multiSelected?(e.slim.multiSelected.container.classList.remove(e.config.openAbove),e.slim.multiSelected.container.classList.remove(e.config.openBelow)):e.slim.singleSelected&&(e.slim.singleSelected.container.classList.remove(e.config.openAbove),e.slim.singleSelected.container.classList.remove(e.config.openBelow)),e.slim.search.input.blur(),e.afterClose&&e.afterClose()}),this.config.timeoutDelay))},c.prototype.moveContentAbove=function(){var e=0;this.config.isMultiple&&this.slim.multiSelected?e=this.slim.multiSelected.container.offsetHeight:this.slim.singleSelected&&(e=this.slim.singleSelected.container.offsetHeight);var t=e+this.slim.content.offsetHeight-1;this.slim.content.style.margin="-"+t+"px 0 0 0",this.slim.content.style.height=t-e+1+"px",this.slim.content.style.transformOrigin="center bottom",this.data.contentPosition="above",this.config.isMultiple&&this.slim.multiSelected?(this.slim.multiSelected.container.classList.remove(this.config.openBelow),this.slim.multiSelected.container.classList.add(this.config.openAbove)):this.slim.singleSelected&&(this.slim.singleSelected.container.classList.remove(this.config.openBelow),this.slim.singleSelected.container.classList.add(this.config.openAbove))},c.prototype.moveContentBelow=function(){this.data.contentPosition="below",this.config.isMultiple&&this.slim.multiSelected?(this.slim.multiSelected.container.classList.remove(this.config.openAbove),this.slim.multiSelected.container.classList.add(this.config.openBelow)):this.slim.singleSelected&&(this.slim.singleSelected.container.classList.remove(this.config.openAbove),this.slim.singleSelected.container.classList.add(this.config.openBelow))},c.prototype.enable=function(){this.config.isEnabled=!0,this.config.isMultiple&&this.slim.multiSelected?this.slim.multiSelected.container.classList.remove(this.config.disabled):this.slim.singleSelected&&this.slim.singleSelected.container.classList.remove(this.config.disabled),this.select.triggerMutationObserver=!1,this.select.element.disabled=!1,this.slim.search.input.disabled=!1,this.select.triggerMutationObserver=!0},c.prototype.disable=function(){this.config.isEnabled=!1,this.config.isMultiple&&this.slim.multiSelected?this.slim.multiSelected.container.classList.add(this.config.disabled):this.slim.singleSelected&&this.slim.singleSelected.container.classList.add(this.config.disabled),this.select.triggerMutationObserver=!1,this.select.element.disabled=!0,this.slim.search.input.disabled=!0,this.select.triggerMutationObserver=!0},c.prototype.search=function(e){if(this.data.searchValue!==e)if(this.slim.search.input.value=e,this.config.isAjax){var t=this;this.config.isSearching=!0,this.render(),this.ajax&&this.ajax(e,(function(i){t.config.isSearching=!1,Array.isArray(i)?(i.unshift({text:"",placeholder:!0}),t.setData(i),t.data.search(e),t.render()):"string"==typeof i?t.slim.options(i):t.render()}))}else this.data.search(e),this.render()},c.prototype.setSearchText=function(e){this.config.searchText=e},c.prototype.render=function(){this.config.isMultiple?this.slim.values():(this.slim.placeholder(),this.slim.deselect()),this.slim.options()},c.prototype.destroy=function(e){void 0===e&&(e=null);var t=e?document.querySelector("."+e+".ss-main"):this.slim.container,i=e?document.querySelector("[data-ssid="+e+"]"):this.select.element;if(t&&i&&(document.removeEventListener("click",this.documentClick),"auto"===this.config.showContent&&window.removeEventListener("scroll",this.windowScroll,!1),i.style.display="",delete i.dataset.ssid,i.slim=null,t.parentElement&&t.parentElement.removeChild(t),this.config.addToBody)){var n=e?document.querySelector("."+e+".ss-content"):this.slim.content;if(!n)return;document.body.removeChild(n)}},c);function c(e){var t=this;this.ajax=null,this.addable=null,this.beforeOnChange=null,this.onChange=null,this.beforeOpen=null,this.afterOpen=null,this.beforeClose=null,this.afterClose=null,this.windowScroll=l.debounce((function(e){t.data.contentOpen&&("above"===l.putContent(t.slim.content,t.data.contentPosition,t.data.contentOpen)?t.moveContentAbove():t.moveContentBelow())})),this.documentClick=function(e){e.target&&!l.hasClassInTree(e.target,t.config.id)&&t.close()};var i=this.validate(e);i.dataset.ssid&&this.destroy(i.dataset.ssid),e.ajax&&(this.ajax=e.ajax),e.addable&&(this.addable=e.addable),this.config=new n.Config({select:i,isAjax:!!e.ajax,showSearch:e.showSearch,searchPlaceholder:e.searchPlaceholder,searchText:e.searchText,searchingText:e.searchingText,searchFocus:e.searchFocus,searchHighlight:e.searchHighlight,searchFilter:e.searchFilter,closeOnSelect:e.closeOnSelect,showContent:e.showContent,placeholderText:e.placeholder,allowDeselect:e.allowDeselect,allowDeselectOption:e.allowDeselectOption,hideSelectedOption:e.hideSelectedOption,deselectLabel:e.deselectLabel,isEnabled:e.isEnabled,valuesUseText:e.valuesUseText,showOptionTooltips:e.showOptionTooltips,selectByGroup:e.selectByGroup,limit:e.limit,timeoutDelay:e.timeoutDelay,addToBody:e.addToBody}),this.select=new s.Select({select:i,main:this}),this.data=new o.Data({main:this}),this.slim=new a.Slim({main:this}),this.select.element.parentNode&&this.select.element.parentNode.insertBefore(this.slim.container,this.select.element.nextSibling),e.data?this.setData(e.data):this.render(),document.addEventListener("click",this.documentClick),"auto"===this.config.showContent&&window.addEventListener("scroll",this.windowScroll,!1),e.beforeOnChange&&(this.beforeOnChange=e.beforeOnChange),e.onChange&&(this.onChange=e.onChange),e.beforeOpen&&(this.beforeOpen=e.beforeOpen),e.afterOpen&&(this.afterOpen=e.afterOpen),e.beforeClose&&(this.beforeClose=e.beforeClose),e.afterClose&&(this.afterClose=e.afterClose),this.config.isEnabled||this.disable()}t.default=r},function(e,t,i){t.__esModule=!0;var n=(s.prototype.searchFilter=function(e,t){return-1!==e.text.toLowerCase().indexOf(t.toLowerCase())},s);function s(e){this.id="",this.isMultiple=!1,this.isAjax=!1,this.isSearching=!1,this.showSearch=!0,this.searchFocus=!0,this.searchHighlight=!1,this.closeOnSelect=!0,this.showContent="auto",this.searchPlaceholder="Search",this.searchText="No Results",this.searchingText="Searching...",this.placeholderText="Select Value",this.allowDeselect=!1,this.allowDeselectOption=!1,this.hideSelectedOption=!1,this.deselectLabel="x",this.isEnabled=!0,this.valuesUseText=!1,this.showOptionTooltips=!1,this.selectByGroup=!1,this.limit=0,this.timeoutDelay=200,this.addToBody=!1,this.main="ss-main",this.singleSelected="ss-single-selected",this.arrow="ss-arrow",this.multiSelected="ss-multi-selected",this.add="ss-add",this.plus="ss-plus",this.values="ss-values",this.value="ss-value",this.valueText="ss-value-text",this.valueDelete="ss-value-delete",this.content="ss-content",this.open="ss-open",this.openAbove="ss-open-above",this.openBelow="ss-open-below",this.search="ss-search",this.searchHighlighter="ss-search-highlight",this.addable="ss-addable",this.list="ss-list",this.optgroup="ss-optgroup",this.optgroupLabel="ss-optgroup-label",this.optgroupLabelSelectable="ss-optgroup-label-selectable",this.option="ss-option",this.optionSelected="ss-option-selected",this.highlighted="ss-highlighted",this.disabled="ss-disabled",this.hide="ss-hide",this.id="ss-"+Math.floor(1e5*Math.random()),this.style=e.select.style.cssText,this.class=e.select.className.split(" "),this.isMultiple=e.select.multiple,this.isAjax=e.isAjax,this.showSearch=!1!==e.showSearch,this.searchFocus=!1!==e.searchFocus,this.searchHighlight=!0===e.searchHighlight,this.closeOnSelect=!1!==e.closeOnSelect,e.showContent&&(this.showContent=e.showContent),this.isEnabled=!1!==e.isEnabled,e.searchPlaceholder&&(this.searchPlaceholder=e.searchPlaceholder),e.searchText&&(this.searchText=e.searchText),e.searchingText&&(this.searchingText=e.searchingText),e.placeholderText&&(this.placeholderText=e.placeholderText),this.allowDeselect=!0===e.allowDeselect,this.allowDeselectOption=!0===e.allowDeselectOption,this.hideSelectedOption=!0===e.hideSelectedOption,e.deselectLabel&&(this.deselectLabel=e.deselectLabel),e.valuesUseText&&(this.valuesUseText=e.valuesUseText),e.showOptionTooltips&&(this.showOptionTooltips=e.showOptionTooltips),e.selectByGroup&&(this.selectByGroup=e.selectByGroup),e.limit&&(this.limit=e.limit),e.searchFilter&&(this.searchFilter=e.searchFilter),null!=e.timeoutDelay&&(this.timeoutDelay=e.timeoutDelay),this.addToBody=!0===e.addToBody}t.Config=n},function(e,t,i){t.__esModule=!0;var n=i(0),s=(a.prototype.setValue=function(){if(this.main.data.getSelected()){if(this.main.config.isMultiple)for(var e=this.main.data.getSelected(),t=0,i=this.element.options;t<i.length;t++){var n=i[t];n.selected=!1;for(var s=0,a=e;s<a.length;s++)a[s].value===n.value&&(n.selected=!0)}else e=this.main.data.getSelected(),this.element.value=e?e.value:"";this.main.data.isOnChangeEnabled=!1,this.element.dispatchEvent(new CustomEvent("change",{bubbles:!0})),this.main.data.isOnChangeEnabled=!0}},a.prototype.addAttributes=function(){this.element.tabIndex=-1,this.element.style.display="none",this.element.dataset.ssid=this.main.config.id},a.prototype.addEventListeners=function(){var e=this;this.element.addEventListener("change",(function(t){e.main.data.setSelectedFromSelect(),e.main.render()}))},a.prototype.addMutationObserver=function(){var e=this;this.main.config.isAjax||(this.mutationObserver=new MutationObserver((function(t){e.triggerMutationObserver&&(e.main.data.parseSelectData(),e.main.data.setSelectedFromSelect(),e.main.render(),t.forEach((function(t){"class"===t.attributeName&&e.main.slim.updateContainerDivClass(e.main.slim.container)})))})),this.observeMutationObserver())},a.prototype.observeMutationObserver=function(){this.mutationObserver&&this.mutationObserver.observe(this.element,{attributes:!0,childList:!0,characterData:!0})},a.prototype.disconnectMutationObserver=function(){this.mutationObserver&&this.mutationObserver.disconnect()},a.prototype.create=function(e){this.element.innerHTML="";for(var t=0,i=e;t<i.length;t++){var n=i[t];if(n.hasOwnProperty("options")){var s=n,a=document.createElement("optgroup");if(a.label=s.label,s.options)for(var o=0,l=s.options;o<l.length;o++){var r=l[o];a.appendChild(this.createOption(r))}this.element.appendChild(a)}else this.element.appendChild(this.createOption(n))}},a.prototype.createOption=function(e){var t=document.createElement("option");return t.value=""!==e.value?e.value:e.text,t.innerHTML=e.innerHTML||e.text,e.selected&&(t.selected=e.selected),!1===e.display&&(t.style.display="none"),e.disabled&&(t.disabled=!0),e.placeholder&&t.setAttribute("data-placeholder","true"),e.mandatory&&t.setAttribute("data-mandatory","true"),e.class&&e.class.split(" ").forEach((function(e){t.classList.add(e)})),e.data&&"object"==typeof e.data&&Object.keys(e.data).forEach((function(i){t.setAttribute("data-"+n.kebabCase(i),e.data[i])})),t},a);function a(e){this.triggerMutationObserver=!0,this.element=e.select,this.main=e.main,this.element.disabled&&(this.main.config.isEnabled=!1),this.addAttributes(),this.addEventListeners(),this.mutationObserver=null,this.addMutationObserver(),this.element.slim=e.main}t.Select=s},function(e,t,i){t.__esModule=!0;var n=i(0),s=i(1),a=(o.prototype.containerDiv=function(){var e=document.createElement("div");return e.style.cssText=this.main.config.style,this.updateContainerDivClass(e),e},o.prototype.updateContainerDivClass=function(e){this.main.config.class=this.main.select.element.className.split(" "),e.className="",e.classList.add(this.main.config.id),e.classList.add(this.main.config.main);for(var t=0,i=this.main.config.class;t<i.length;t++){var n=i[t];""!==n.trim()&&e.classList.add(n)}},o.prototype.singleSelectedDiv=function(){var e=this,t=document.createElement("div");t.classList.add(this.main.config.singleSelected);var i=document.createElement("span");i.classList.add("placeholder"),t.appendChild(i);var n=document.createElement("span");n.innerHTML=this.main.config.deselectLabel,n.classList.add("ss-deselect"),n.onclick=function(t){t.stopPropagation(),e.main.config.isEnabled&&e.main.set("")},t.appendChild(n);var s=document.createElement("span");s.classList.add(this.main.config.arrow);var a=document.createElement("span");return a.classList.add("arrow-down"),s.appendChild(a),t.appendChild(s),t.onclick=function(){e.main.config.isEnabled&&(e.main.data.contentOpen?e.main.close():e.main.open())},{container:t,placeholder:i,deselect:n,arrowIcon:{container:s,arrow:a}}},o.prototype.placeholder=function(){var e=this.main.data.getSelected();if(null===e||e&&e.placeholder){var t=document.createElement("span");t.classList.add(this.main.config.disabled),t.innerHTML=this.main.config.placeholderText,this.singleSelected&&(this.singleSelected.placeholder.innerHTML=t.outerHTML)}else{var i="";e&&(i=e.innerHTML&&!0!==this.main.config.valuesUseText?e.innerHTML:e.text),this.singleSelected&&(this.singleSelected.placeholder.innerHTML=e?i:"")}},o.prototype.deselect=function(){if(this.singleSelected){if(!this.main.config.allowDeselect)return void this.singleSelected.deselect.classList.add("ss-hide");""===this.main.selected()?this.singleSelected.deselect.classList.add("ss-hide"):this.singleSelected.deselect.classList.remove("ss-hide")}},o.prototype.multiSelectedDiv=function(){var e=this,t=document.createElement("div");t.classList.add(this.main.config.multiSelected);var i=document.createElement("div");i.classList.add(this.main.config.values),t.appendChild(i);var n=document.createElement("div");n.classList.add(this.main.config.add);var s=document.createElement("span");return s.classList.add(this.main.config.plus),s.onclick=function(t){e.main.data.contentOpen&&(e.main.close(),t.stopPropagation())},n.appendChild(s),t.appendChild(n),t.onclick=function(t){e.main.config.isEnabled&&(t.target.classList.contains(e.main.config.valueDelete)||(e.main.data.contentOpen?e.main.close():e.main.open()))},{container:t,values:i,add:n,plus:s}},o.prototype.values=function(){if(this.multiSelected){for(var e,t=this.multiSelected.values.childNodes,i=this.main.data.getSelected(),n=[],s=0,a=t;s<a.length;s++){var o=a[s];e=!0;for(var l=0,r=i;l<r.length;l++){var c=r[l];String(c.id)===String(o.dataset.id)&&(e=!1)}e&&n.push(o)}for(var d=0,h=n;d<h.length;d++){var u=h[d];u.classList.add("ss-out"),this.multiSelected.values.removeChild(u)}for(t=this.multiSelected.values.childNodes,c=0;c<i.length;c++){e=!1;for(var p=0,m=t;p<m.length;p++)o=m[p],String(i[c].id)===String(o.dataset.id)&&(e=!0);e||(0!==t.length&&HTMLElement.prototype.insertAdjacentElement?0===c?this.multiSelected.values.insertBefore(this.valueDiv(i[c]),t[c]):t[c-1].insertAdjacentElement("afterend",this.valueDiv(i[c])):this.multiSelected.values.appendChild(this.valueDiv(i[c])))}if(0===i.length){var f=document.createElement("span");f.classList.add(this.main.config.disabled),f.innerHTML=this.main.config.placeholderText,this.multiSelected.values.innerHTML=f.outerHTML}}},o.prototype.valueDiv=function(e){var t=this,i=document.createElement("div");i.classList.add(this.main.config.value),i.dataset.id=e.id;var n=document.createElement("span");if(n.classList.add(this.main.config.valueText),n.innerHTML=e.innerHTML&&!0!==this.main.config.valuesUseText?e.innerHTML:e.text,i.appendChild(n),!e.mandatory){var s=document.createElement("span");s.classList.add(this.main.config.valueDelete),s.innerHTML=this.main.config.deselectLabel,s.onclick=function(i){i.preventDefault(),i.stopPropagation();var n=!1;if(t.main.beforeOnChange||(n=!0),t.main.beforeOnChange){for(var s=t.main.data.getSelected(),a=JSON.parse(JSON.stringify(s)),o=0;o<a.length;o++)a[o].id===e.id&&a.splice(o,1);!1!==t.main.beforeOnChange(a)&&(n=!0)}n&&(t.main.data.removeFromSelected(e.id,"id"),t.main.render(),t.main.select.setValue(),t.main.data.onDataChange())},i.appendChild(s)}return i},o.prototype.contentDiv=function(){var e=document.createElement("div");return e.classList.add(this.main.config.content),e},o.prototype.searchDiv=function(){var e=this,t=document.createElement("div"),i=document.createElement("input"),n=document.createElement("div");t.classList.add(this.main.config.search);var a={container:t,input:i};return this.main.config.showSearch||(t.classList.add(this.main.config.hide),i.readOnly=!0),i.type="search",i.placeholder=this.main.config.searchPlaceholder,i.tabIndex=0,i.setAttribute("aria-label",this.main.config.searchPlaceholder),i.setAttribute("autocapitalize","off"),i.setAttribute("autocomplete","off"),i.setAttribute("autocorrect","off"),i.onclick=function(t){setTimeout((function(){""===t.target.value&&e.main.search("")}),10)},i.onkeydown=function(t){"ArrowUp"===t.key?(e.main.open(),e.highlightUp(),t.preventDefault()):"ArrowDown"===t.key?(e.main.open(),e.highlightDown(),t.preventDefault()):"Tab"===t.key?e.main.data.contentOpen?e.main.close():setTimeout((function(){e.main.close()}),e.main.config.timeoutDelay):"Enter"===t.key&&t.preventDefault()},i.onkeyup=function(t){var s=t.target;if("Enter"===t.key){if(e.main.addable&&t.ctrlKey)return n.click(),t.preventDefault(),void t.stopPropagation();var a=e.list.querySelector("."+e.main.config.highlighted);a&&a.click()}else"ArrowUp"===t.key||"ArrowDown"===t.key||("Escape"===t.key?e.main.close():e.main.config.showSearch&&e.main.data.contentOpen?e.main.search(s.value):i.value="");t.preventDefault(),t.stopPropagation()},i.onfocus=function(){e.main.open()},t.appendChild(i),this.main.addable&&(n.classList.add(this.main.config.addable),n.innerHTML="+",n.onclick=function(t){if(e.main.addable){t.preventDefault(),t.stopPropagation();var i=e.search.input.value;if(""===i.trim())return void e.search.input.focus();var n=e.main.addable(i),a="";if(!n)return;"object"==typeof n?s.validateOption(n)&&(e.main.addData(n),a=n.value?n.value:n.text):(e.main.addData(e.main.data.newOption({text:n,value:n})),a=n),e.main.search(""),setTimeout((function(){e.main.set(a,"value",!1,!1)}),100),e.main.config.closeOnSelect&&setTimeout((function(){e.main.close()}),100)}},t.appendChild(n),a.addable=n),a},o.prototype.highlightUp=function(){var e=this.list.querySelector("."+this.main.config.highlighted),t=null;if(e)for(t=e.previousSibling;null!==t&&t.classList.contains(this.main.config.disabled);)t=t.previousSibling;else{var i=this.list.querySelectorAll("."+this.main.config.option+":not(."+this.main.config.disabled+")");t=i[i.length-1]}if(t&&t.classList.contains(this.main.config.optgroupLabel)&&(t=null),null===t){var s=e.parentNode;if(s.classList.contains(this.main.config.optgroup)&&s.previousSibling){var a=s.previousSibling.querySelectorAll("."+this.main.config.option+":not(."+this.main.config.disabled+")");a.length&&(t=a[a.length-1])}}t&&(e&&e.classList.remove(this.main.config.highlighted),t.classList.add(this.main.config.highlighted),n.ensureElementInView(this.list,t))},o.prototype.highlightDown=function(){var e=this.list.querySelector("."+this.main.config.highlighted),t=null;if(e)for(t=e.nextSibling;null!==t&&t.classList.contains(this.main.config.disabled);)t=t.nextSibling;else t=this.list.querySelector("."+this.main.config.option+":not(."+this.main.config.disabled+")");if(null===t&&null!==e){var i=e.parentNode;i.classList.contains(this.main.config.optgroup)&&i.nextSibling&&(t=i.nextSibling.querySelector("."+this.main.config.option+":not(."+this.main.config.disabled+")"))}t&&(e&&e.classList.remove(this.main.config.highlighted),t.classList.add(this.main.config.highlighted),n.ensureElementInView(this.list,t))},o.prototype.listDiv=function(){var e=document.createElement("div");return e.classList.add(this.main.config.list),e},o.prototype.options=function(e){void 0===e&&(e="");var t,i=this.main.data.filtered||this.main.data.data;if((this.list.innerHTML="")!==e)return(t=document.createElement("div")).classList.add(this.main.config.option),t.classList.add(this.main.config.disabled),t.innerHTML=e,void this.list.appendChild(t);if(this.main.config.isAjax&&this.main.config.isSearching)return(t=document.createElement("div")).classList.add(this.main.config.option),t.classList.add(this.main.config.disabled),t.innerHTML=this.main.config.searchingText,void this.list.appendChild(t);if(0===i.length){var n=document.createElement("div");return n.classList.add(this.main.config.option),n.classList.add(this.main.config.disabled),n.innerHTML=this.main.config.searchText,void this.list.appendChild(n)}for(var s=function(e){if(e.hasOwnProperty("label")){var t=e,i=document.createElement("div");i.classList.add(a.main.config.optgroup);var n=document.createElement("div");n.classList.add(a.main.config.optgroupLabel),a.main.config.selectByGroup&&a.main.config.isMultiple&&n.classList.add(a.main.config.optgroupLabelSelectable),n.innerHTML=t.label,i.appendChild(n);var s=t.options;if(s){for(var o=0,l=s;o<l.length;o++){var r=l[o];i.appendChild(a.option(r))}if(a.main.config.selectByGroup&&a.main.config.isMultiple){var c=a;n.addEventListener("click",(function(e){e.preventDefault(),e.stopPropagation();for(var t=0,n=i.children;t<n.length;t++){var s=n[t];-1!==s.className.indexOf(c.main.config.option)&&s.click()}}))}}a.list.appendChild(i)}else a.list.appendChild(a.option(e))},a=this,o=0,l=i;o<l.length;o++)s(l[o])},o.prototype.option=function(e){if(e.placeholder){var t=document.createElement("div");return t.classList.add(this.main.config.option),t.classList.add(this.main.config.hide),t}var i=document.createElement("div");i.classList.add(this.main.config.option),e.class&&e.class.split(" ").forEach((function(e){i.classList.add(e)})),e.style&&(i.style.cssText=e.style);var s=this.main.data.getSelected();i.dataset.id=e.id,this.main.config.searchHighlight&&this.main.slim&&e.innerHTML&&""!==this.main.slim.search.input.value.trim()?i.innerHTML=n.highlight(e.innerHTML,this.main.slim.search.input.value,this.main.config.searchHighlighter):e.innerHTML&&(i.innerHTML=e.innerHTML),this.main.config.showOptionTooltips&&i.textContent&&i.setAttribute("title",i.textContent);var a=this;i.addEventListener("click",(function(t){t.preventDefault(),t.stopPropagation();var i=this.dataset.id;if(!0===e.selected&&a.main.config.allowDeselectOption){var n=!1;if(a.main.beforeOnChange&&a.main.config.isMultiple||(n=!0),a.main.beforeOnChange&&a.main.config.isMultiple){for(var o=a.main.data.getSelected(),l=JSON.parse(JSON.stringify(o)),r=0;r<l.length;r++)l[r].id===i&&l.splice(r,1);!1!==a.main.beforeOnChange(l)&&(n=!0)}n&&(a.main.config.isMultiple?(a.main.data.removeFromSelected(i,"id"),a.main.render(),a.main.select.setValue(),a.main.data.onDataChange()):a.main.set(""))}else{if(e.disabled||e.selected)return;if(a.main.config.limit&&Array.isArray(s)&&a.main.config.limit<=s.length)return;if(a.main.beforeOnChange){var c=void 0,d=JSON.parse(JSON.stringify(a.main.data.getObjectFromData(i)));d.selected=!0,a.main.config.isMultiple?(c=JSON.parse(JSON.stringify(s))).push(d):c=JSON.parse(JSON.stringify(d)),!1!==a.main.beforeOnChange(c)&&a.main.set(i,"id",a.main.config.closeOnSelect)}else a.main.set(i,"id",a.main.config.closeOnSelect)}}));var o=s&&n.isValueInArrayOfObjects(s,"id",e.id);return(e.disabled||o)&&(i.onclick=null,a.main.config.allowDeselectOption||i.classList.add(this.main.config.disabled),a.main.config.hideSelectedOption&&i.classList.add(this.main.config.hide)),o?i.classList.add(this.main.config.optionSelected):i.classList.remove(this.main.config.optionSelected),i},o);function o(e){this.main=e.main,this.container=this.containerDiv(),this.content=this.contentDiv(),this.search=this.searchDiv(),this.list=this.listDiv(),this.options(),this.singleSelected=null,this.multiSelected=null,this.main.config.isMultiple?(this.multiSelected=this.multiSelectedDiv(),this.multiSelected&&this.container.appendChild(this.multiSelected.container)):(this.singleSelected=this.singleSelectedDiv(),this.container.appendChild(this.singleSelected.container)),this.main.config.addToBody?(this.content.classList.add(this.main.config.id),document.body.appendChild(this.content)):this.container.appendChild(this.content),this.content.appendChild(this.search.container),this.content.appendChild(this.list)}t.Slim=a}],e.c=i,e.d=function(t,i,n){e.o(t,i)||Object.defineProperty(t,i,{enumerable:!0,get:n})},e.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},e.t=function(t,i){if(1&i&&(t=e(t)),8&i)return t;if(4&i&&"object"==typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(e.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&i&&"string"!=typeof t)for(var s in t)e.d(n,s,function(e){return t[e]}.bind(null,s));return n},e.n=function(t){var i=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(i,"a",i),i},e.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},e.p="",e(e.s=2).default;function e(n){if(i[n])return i[n].exports;var s=i[n]={i:n,l:!1,exports:{}};return t[n].call(s.exports,s,s.exports,e),s.l=!0,s.exports}var t,i},"object"==typeof a&&"object"==typeof module?module.exports=s():"function"==typeof define&&define.amd?define([],s):"object"==typeof a?a.SlimSelect=s():n.SlimSelect=s();const o=a.SlimSelect;function l(e,t){var i=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),i.push.apply(i,n)}return i}function r(e){for(var t=1;t<arguments.length;t++){var i=null!=arguments[t]?arguments[t]:{};t%2?l(Object(i),!0).forEach((function(t){c(e,t,i[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(i)):l(Object(i)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(i,t))}))}return e}function c(e,t,i){return t in e?Object.defineProperty(e,t,{value:i,enumerable:!0,configurable:!0,writable:!0}):e[t]=i,e}var d=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return new o(r({select:e,searchPlaceholder:"Recherche"},t))}}}]);