/* matc.js
 * MITSUE-LINKS Auto Tracking Code
 * Version 2.2.6
 * Copyright (C) 2011 MITSUE-LINKS
 * 
 * This JavaScript was created using "gatag.js" provided by Goodwebpractices.com.
 */


//変更可能箇所

//統合解析ドメイン（対象ドメインを「|」で追加）
//var integrateddomain = /^(|(3min|app(|li)|id|cr|search|blog|vod|cu|nm|join|hakone|au|apps|harry|kinro-ghibli|shiyagare|hybrid|talk|vote|conan|(liveplus\.stream)|((time|hangover)\.campaign)|(www\.z-sat)|file|info|pon|gaki|gakisp|omikuji|senryokugai|omotenashi|kinro|zoo|furi2arashi|akumu|kindaichi2014|sorajiro|contents|best-artist|(www\.best-artist)|no1|(www\.no1)|gyoten|(www\.gyoten)|kasoh|(www\.kasoh)|gurunai|(www\.gurunai)|sugotoku|www(|1|4))\.)(ntv\.co\.jp|dai2ntv\.jp|news24\.jp|anpanman\.jp|chisuimaru\.com|genic\.tv|ghibli\.jp|lupin-3rd\.net|ntveco\.jp|ntventa\.jp|ntvg-tv\.jp|ntvshop\.jp|ntvsports\.jp|jointv\.jp|wiz-tv\.com|uniba\.jp|janai\.jp|tv60\.jp|3min-cooking\.jp|themusicday\.jp|idol-hole\.com|24htv\.jp|nittele\.jp|furi2\.tv|kiseiju\.jp|sensors\.jp|jinsei-shuuryo-quiz\.tv)$/i;
var integrateddomain = /^(|(3min|app(|li)|id|cr|search|blog|vod|cu|nm|join|hakone|au|apps|harry|kinro-ghibli|shiyagare|hybrid|talk|vote|conan|(liveplus\.stream)|((time|hangover)\.campaign)|(www\.z-sat)|file|info|pon|gaki|gakisp|omikuji|senryokugai|omotenashi|kinro|zoo|furi2arashi|akumu|kindaichi2014|sorajiro|nube|higanbana|contents|best-artist|(www\.best-artist)|no1|(www\.no1)|gyoten|(www\.gyoten)|kasoh|(www\.kasoh)|gurunai|(www\.gurunai)|sugotoku|www(|1|4))\.)(ntv\.co\.jp|dai2ntv\.jp|news24\.jp|anpanman\.jp|chisuimaru\.com|genic\.tv|ghibli\.jp|lupin-3rd\.net|ntveco\.jp|ntventa\.jp|ntvg-tv\.jp|ntvshop\.jp|ntvsports\.jp|jointv\.jp|wiz-tv\.com|uniba\.jp|janai\.jp|tv60\.jp|3min-cooking\.jp|themusicday\.jp|idol-hole\.com|24htv\.jp|nittele\.jp|furi2\.tv|kiseiju\.jp|sensors\.jp|jinsei-shuuryo-quiz\.tv)$/i;
//統合解析サブドメイン（対象ドメインを「|」で追加）
var subdomain = /^subdomain$/i;
//外部遷移トラッキングドメイン（デフォルトは「.*」。対象を絞る際は、対象ドメインを「|」で追加）
var externaldomain = /\./i;
//外部遷移トラッキングパス（任意入力。先頭の「/」は必須）
var externalpath = '/outgoing/';
//ダウンロードトラッキング対象拡張子（対象拡張子を「|」で追加）
var filetypes = /\.(doc|eps|svg|xls|ppt|pdf|zip|vsd|vxd|rar|exe|wma|mov|avi|wmv|mp3|mp4|m4v|jpg|sit|sea|gif)/i;


//以下、変更不可

//「onload」重複対応
if (window.addEventListener) {
    window.addEventListener('load', autotracking, false);
} else if (window.attachEvent) {
    window.attachEvent('onload', autotracking);
}

//条件分岐
function autotracking() {
	if(typeof matcTracker._trackPageview != 'function') return;
	var anchors = document.getElementsByTagName("a");
	for(var l = 0; l < anchors.length; l++) {
		var hn = anchors[l].hostname;
		var path = anchors[l].pathname + anchors[l].search;
		var matchtype = path.match(filetypes);
		if(anchors[l].protocol == "mailto:") {
			startListening(anchors[l],"click",trackMailto);
		} else if(matchtype) {
			startListening(anchors[l],"click",multipletrack);
		} else if(hn.match(subdomain)||hn == location.hostname) {
		} else if(hn.match(integrateddomain)) {
			startListening(anchors[l],"click",integrationtrack);
		} else if(anchors[l].protocol.match(/http/i) && hn.match(externaldomain)) {
			startListening(anchors[l],"click",multipletrack);
		} else {}
	}
}

//クリック判定
function startListening(obj,evnt,func) {
	if(obj.addEventListener) {
		obj.addEventListener(evnt,func,false);
	} else if(obj.attachEvent) {
		obj.attachEvent("on" + evnt,func);
	}
}
//メールリンクのトラッキング
function trackMailto(evnt) {
	var href = (evnt.srcElement) ? evnt.srcElement.href : this.href;
	var mailto = "/mailto/" + href.substring(7);
	if(typeof(matcTracker) == "object") matcTracker._trackPageview(mailto);
}
//ダウンロード・外部リンクのトラッキング
function multipletrack(evnt) {
	var e = (evnt.srcElement) ? evnt.srcElement : this;
	while(e.tagName != "A") {
		e = e.parentNode;
	}
	var lnk = (e.pathname.charAt(0) == "/") ? e.pathname : "/" + e.pathname;
	if(e.search && e.pathname.indexOf(e.search) == -1) lnk += e.search;
	if(e.hostname == location.host||e.hostname.match(integrateddomain)) {
		matcTracker._trackPageview(lnk);
	} else {
		lnk = externalpath + e.hostname + lnk;
		matcTracker._trackPageview(lnk);
		matcTracker._trackEvent('transition to external sites',e.href,document.URL);
	}
}
//統合ドメインへの遷移トラッキング
function integrationtrack(evnt) {
	var e = (evnt.srcElement) ? evnt.srcElement : this;
	while(e.tagName != "A") {
		e = e.parentNode;
	}
	if(typeof(matcTracker) == "object") {
		matcTracker._trackEvent('transition between sites',location.hostname+'>'+e.hostname,document.URL.replace('index.html','')+'>'+e.href.replace('index.html',''));
		if(e.hash) { var ehash = false; } else { var ehash = true; }
		if(e.onclick) {
		} else if(e.target) {
			window.open(matcTracker._getLinkerUrl(e.href,ehash),e.target);
			evnt.returnValue = false;
			if(evnt.preventDefault) evnt.preventDefault();
		} else {
			matcTracker._link(e.href,ehash);
			evnt.returnValue = false;
			if(evnt.preventDefault) evnt.preventDefault();
		}
	}
}