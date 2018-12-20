try{jwLibs}catch(e){jwLibs={}; window.jwActiveLibs=[]; window.jwLibData={};}
jwLibs.bulkDOM={
	init:function(){
		window.jwActiveLibs.push("bulkDOM");
		window.jwLibData.bulkDOM={
			events:{
				normal:[
					"jwBulkStyle",
					"jwBulkAddClass",
					"jwBulkRemoveClass",
					"jwBulkToggleClass",
					"jwBulkAddEventListener",
					"jwBulkRemoveEventListener",
					"jwBulkSetAttribute",
					"jwBulkSetAttributeNS",
					"jwBulkSetProp"
				],
				multi:[
					"jwBulkStyleMulti",
					"jwBulkAddClassMulti",
					"jwBulkRemoveClassMulti",
					"jwBulkToggleClassMulti",
					"jwBulkAddEventListenerMulti",
					"jwBulkRemoveEventListenerMulti",
					"jwBulkSetAttributeMulti",
					"jwBulkSetAttributeNSMulti",
					"jwBulkSetPropMulti"
				]
			}
		};
		// CSS styling
		HTMLParagraphElement.prototype.jwBulkStyle=HTMLElement.prototype.jwBulkStyle=function(obj, ef, index){
			// {"rule1":"val1", "rule2":"val2", ...}
			var rule;
			index=index||0;
			for (rule in obj){
				if (ef && typeof obj[rule]=="function"){
					this.style[rule]=obj[rule](obj, rule, this, index);
				} else {
					this.style[rule]=obj[rule];
				}
			}
			this.dispatchEvent(new CustomEvent("jwBulkStyle", {detail:{elem:this, rules:obj}}));
			return this;
		};
		
		// Classes
		HTMLParagraphElement.prototype.jwBulkAddClass=HTMLElement.prototype.jwBulkAddClass=function(arr, ef, index){
			// ["class1", "class2", ...]
			var i;
			index=index||0;
			for (i in arr){
				if (ef && typeof obj[name]=="function"){
					this.classList.add(arr[i](obj, i, this, index));
				} else {
					this.classList.add(arr[i]);
				}
			}
			this.dispatchEvent(new CustomEvent("jwBulkAddClass", {detail:{elem:this, val:arr}}));
			return this;
		};
		HTMLParagraphElement.prototype.jwBulkRemoveClass=HTMLElement.prototype.jwBulkRemoveClass=function(arr, ef, index){
			// ["class1", "class2", ...]
			var i;
			index=index||0;
			for (i in arr){
				if (ef && typeof obj[name]=="function"){
					this.classList.remove(arr[i](obj, i, this, index));
				} else {
					this.classList.remove(arr[i]);
				}
			}
			this.dispatchEvent(new CustomEvent("jwBulkRemoveClass", {detail:{elem:this, val:arr}}));
			return this;
		};
		HTMLParagraphElement.prototype.jwBulkToggleClass=HTMLElement.prototype.jwBulkToggleClass=function(arr, ef, index){
			// ["class1", "class2", ...]
			var i;
			index=index||0;
			for (i in arr){
				if (ef && typeof obj[name]=="function"){
					this.classList.toggle(arr[i](obj, i, this, index));
				} else {
					this.classList.toggle(arr[i]);
				}
			}
			this.dispatchEvent(new CustomEvent("jwBulkToggleClass", {detail:{elem:this, val:arr}}));
			return this;
		};
		
		// Event Listeners
		HTMLParagraphElement.prototype.jwBulkAddEventListener=HTMLElement.prototype.jwBulkAddEventListener=function(obj){
			// {"eventName1":[function1, function2, ...], "eventName2":[function1, function2, ...], ...}
			var type, i;
			for (type in obj){
				for (i in obj[type]){
					this.addEventListener(type, obj[type][i]);
				}
			}
			this.dispatchEvent(new CustomEvent("jwBulkAddEventListener", {detail:{elem:this, rules:obj}}));
			return this;
		};
		HTMLParagraphElement.prototype.jwBulkRemoveEventListener=HTMLElement.prototype.jwBulkRemoveEventListener=function(obj){
			// {"eventName1":[function, function, ...], "eventName2":[function, function, ...], ...}
			var type, i;
			for (type in obj){
				for (i in obj[type]){
					this.removeEventListener(type, obj[type][i]);
				}
			}
			this.dispatchEvent(new CustomEvent("jwBulkRemoveEventListener", {detail:{elem:this, rules:obj}}));
			return this;
		};
		
		// Attributes
		HTMLParagraphElement.prototype.jwBulkSetAttribute=HTMLElement.prototype.jwBulkSetAttribute=function(obj, ef, index){
			// {"name1":"val1", "name2":"val2", ...}
			var name;
			index=index||0;
			for (name in obj){
				if (ef && typeof obj[name]=="function"){
					this.setAttribute(name, obj[name](obj, name, this, index));
				} else {
					this.setAttribute(name, obj[name]);
				}
			}
			this.dispatchEvent(new CustomEvent("jwBulkSetAttribute", {detail:{elem:this, attrs:obj}}));
			return this;
		};
		HTMLParagraphElement.prototype.jwBulkSetAttributeNS=HTMLElement.prototype.jwBulkSetAttributeNS=function(obj, ef, index){
			// {"name1":"val1", "name2":"val2", ...}
			var name;
			index=index||0;
			for (name in obj){
				if (ef && typeof obj[name]=="function"){
					this.setAttributeNS(name, obj[name](obj, name, this, index));
				} else {
					this.setAttributeNS(name, obj[name]);
				}
			}
			this.dispatchEvent(new CustomEvent("jwBulkSetAttributeNS", {detail:{elem:this, attrs:obj}}));
			return this;
		};
		
		// Misc.
		HTMLParagraphElement.prototype.jwBulkSetProp=HTMLElement.prototype.jwBulkSetProp=function(obj, ef, index){
			// obj={"key1":"val1", "key2":"val2", ...}
			// ef=<bool> (True=evaluate object values if they're functions)
			var nameRaw, name, v, i;
			index=index||0;
			for (nameRaw in obj){
				// I have no idea how (or even if) this works. But it works for when the key is only 2 layers (like "style.color")
				// <BlackMagic>
				name=nameRaw.split(".");
				v=this;
				for (i in name){
					if (i==name.length-1){break;}
					v=this[name[i]];
				}
				// </BlackMagic>
				if (ef && typeof obj[nameRaw]=="function"){
					v[name[i]]=obj[nameRaw](obj, nameRaw, this, index);
				} else {
					v[name[i]]=obj[nameRaw];
				}
			}
			this.dispatchEvent(new CustomEvent("jwBulkSetProp", {detail:{elem:this, attrs:obj}}));
			return this;
		};
		HTMLParagraphElement.prototype.jwBulkGetProp=HTMLElement.prototype.jwBulkGetProp=function(arr){
			// ["prop1", "prop2", ...]
			var name, ret, key, v;
			ret={};
			for (i in arr){
				name=arr[i].split(".")
				v=this;
				for (key in name){
					v=v[name[key]]
				}
				ret[arr[i]]=v;
			}
			return ret;
		};
		
		//   O-------------------------------------------------O
		//   |           MULTI BULK FUNCTION THINGS.           |
		//   | APPLY BULK MANIPS. TO MULTIPLE ELEMENTS AT ONCE |
		//   O-------------------------------------------------O
		
		// CSS styling
		NodeList.prototype.jwBulkStyle=HTMLCollection.prototype.jwBulkStyle=function(obj, ef){
			// {"rule1":"val1", "rule2":"val2", ...}
			var elem;
			for (elem=0; elem<this.length; elem++){
				this[elem].jwBulkStyle(obj, ef, elem);
				this[elem].dispatchEvent(new CustomEvent("jwBulkStyleMulti", {detail:{elems:this, rules:obj}}));
			}
			return this;
		};
		
		// Classes
		NodeList.prototype.jwBulkAddClass=HTMLCollection.prototype.jwBulkAddClass=function(classes, ef){
			// ["class1", "class2", ...]
			var elem;
			for (elem=0; elem<this.length; elem++){
				this[elem].jwBulkAddClass(classes, ef, elem);
				this[elem].dispatchEvent(new CustomEvent("jwBulkAddClassMulti", {detail:{elems:this, val:classes}}));
			}
			return this;
		};
		NodeList.prototype.jwBulkRemoveClass=HTMLCollection.prototype.jwBulkRemoveClass=function(classes, ef){
			// ["class1", "class2", ...]
			var elem;
			for (elem=0; elem<this.length; elem++){
				this[elem].classList.remove(classes, ef, elem);
				this[elem].dispatchEvent(new CustomEvent("jwBulkRemoveClassMulti", {detail:{elems:this, val:classes}}));
			}
			return this;
		};
		NodeList.prototype.jwBulkToggleClass=HTMLCollection.prototype.jwBulkToggleClass=function(classes, ef){
			// ["class1", "class2", ...]
			var elem;
			for (elem=0; elem<this.length; elem++){
				this[elem].classList.toggle(classes, ef, elem);
				this[elem].dispatchEvent(new CustomEvent("jwBulkToggleClassMulti", {detail:{elems:this, val:classes}}));
			}
			return this;
		};
		
		// Event Listeners
		NodeList.prototype.jwBulkAddEventListener=HTMLCollection.prototype.jwBulkAddEventListener=function(obj){
			// {"eventName1":[function1, function2, ...], "eventName2":[function1, function2, ...], ...}
			var elem;
			for (elem=0; elem<this.length; elem++){
				this[elem].jwBulkAddEventListener(obj);
				this[elem].dispatchEvent(new CustomEvent("jwBulkAddEventListenerMulti", {detail:{elems:this, funcs:obj}}));
			}
			return this;
		};
		NodeList.prototype.jwBulkRemoveEventListener=HTMLCollection.prototype.jwBulkRemoveEventListener=function(obj){
			// {"eventName1":[function, function, ...], "eventName2":[function, function, ...], ...}
			var elem;
			for (elem=0; elem<this.length; elem++){
				this[elem].jwBulkRemoveEventListener(obj);
				this[elem].dispatchEvent(new CustomEvent("jwBulkRemoveEventListenerMulti", {detail:{elems:this, funcs:obj}}));
			}
			return this;
		};
		
		// Attributes
		NodeList.prototype.jwBulkSetAttribute=HTMLCollection.prototype.jwBulkSetAttribute=function(obj, ef){
			// {"name1":"val1", "name2":"val2", ...}
			var elem;
			for (elem=0; elem<this.length; elem++){
				this[elem].jwBulkSetAttribute(obj, ef, elem);
				this[elem].dispatchEvent(new CustomEvent("jwBulkSetAttributeMulti", {detail:{elems:this, attrs:obj}}));
			}
			return this;
		};
		NodeList.prototype.jwBulkSetAttributeNS=HTMLCollection.prototype.jwBulkSetAttributeNS=function(obj, ef){
			// {"name1":"val1", "name2":"val2", ...}
			var elem;
			for (elem=0; elem<this.length; elem++){
				this[elem].jwBulkSetAttributeNS(obj, ef, elem);
				this[elem].dispatchEvent(new CustomEvent("jwBulkSetAttributeNSMulti", {detail:{elems:this, attrs:obj}}));
			}
			return this;
		};
		
		// Misc.
		NodeList.prototype.jwBulkSetProp=HTMLCollection.prototype.jwBulkSetProp=function(obj, ef){
			// {"key1":"val1", "key2":"val2", ...}
			var elem;
			for (elem=0; elem<this.length; elem++){
				this[elem].jwBulkSetProp(obj, ef, elem);
				this[elem].dispatchEvent(new CustomEvent("jwBulkSetPropMulti", {detail:{elems:this, attrs:obj}}));
			}
			return this;
		};
		NodeList.prototype.jwBulkGetProp=HTMLCollection.prototype.jwBulkGetProp=function(arr){
			// ["prop1", "prop2", ...]
			var ret, elem, elemprops, prop;
			ret=[];
			for (elem=0; elem<this.length; elem++){
				ret[elem]={elem:this[elem], props:{}};
				proparr=this[elem].jwBulkGetProp(arr);
				for (prop in proparr){
					ret[elem].props[prop]=proparr[prop];
				}
			}
			return ret;
		};
	}
};
