// JavaScript Document
<!--
function MM_preloadImages() { //v3.0
  var d=document; if(d.images){ if(!d.MM_p) d.MM_p=new Array();
    var i,j=d.MM_p.length,a=MM_preloadImages.arguments; for(i=0; i<a.length; i++)
    if (a[i].indexOf("#")!=0){ d.MM_p[j]=new Image; d.MM_p[j++].src=a[i];}}
}

function MM_swapImgRestore() { //v3.0
  var i,x,a=document.MM_sr; for(i=0;a&&i<a.length&&(x=a[i])&&x.oSrc;i++) x.src=x.oSrc;
}

function MM_findObj(n, d) { //v4.01
  var p,i,x;  if(!d) d=document; if((p=n.indexOf("?"))>0&&parent.frames.length) {
    d=parent.frames[n.substring(p+1)].document; n=n.substring(0,p);}
  if(!(x=d[n])&&d.all) x=d.all[n]; for (i=0;!x&&i<d.forms.length;i++) x=d.forms[i][n];
  for(i=0;!x&&d.layers&&i<d.layers.length;i++) x=MM_findObj(n,d.layers[i].document);
  if(!x && d.getElementById) x=d.getElementById(n); return x;
}

function MM_swapImage() { //v3.0
  var i,j=0,x,a=MM_swapImage.arguments; document.MM_sr=new Array; for(i=0;i<(a.length-2);i+=3)
   if ((x=MM_findObj(a[i]))!=null){document.MM_sr[j++]=x; if(!x.oSrc) x.oSrc=x.src; x.src=a[i+2];}
}

function MM_openBrWindow(theURL,winName,features) { //v2.0
  window.open(theURL,winName,features);
}

function MM_jumpMenu(targ,selObj,restore){ //v3.0
  eval(targ+".location='"+selObj.options[selObj.selectedIndex].value+"'");
  if (restore) selObj.selectedIndex=0;
}

/**
 * common.js 日テレ内グローバルナビ表示関連スクリプト
 *
 * ○変更履歴
 * 2011.09.15 : s.ebihara GoogleAnalytics導入
 * 2012.02.01 : h.adachi  クリックレート記述追加
 * 2012.11.19 : m.kameyama  メニューに「プレゼント」を追加。「ショッピング」を「通販」に変更。
 * 2013.03.21 : r.kanda 日テレID用処理追加
 * 2013.10.03 : h.adachi シーセンスタグ読み込み処理追加
 *
 */

// Add
// 検索テキスト宣言
document.write("<script type='text/javascript' src='http://www.ntv.co.jp/ad-navi/js2/searchWindow_utf8.js'></script>");

// Google Analytics  ga.js読み込み
var gaJsHost = (("https:" == document.location.protocol) ? "https://ssl." : "http://www.");
document.write(unescape("%3Cscript src='" + gaJsHost + "google-analytics.com/ga.js' type='text/javascript'%3E%3C/script%3E"));

// Google Analytics  トラッキングコードの読み込み
document.write(unescape("%3Cscript src='http://www.ntv.co.jp/ad-navi/ga/matc.js' type='text/javascript' charset='utf-8'%3E%3C/script%3E"));
document.write(unescape("%3Cscript src='http://www.ntv.co.jp/ad-navi/ga/gatrack.js' type='text/javascript' charset='utf-8'%3E%3C/script%3E"));
document.write(unescape("%3Cscript src='http://www.ntv.co.jp/ad-navi/ga/ga_social_tracking.js' type='text/javascript' charset='utf-8'%3E%3C/script%3E"));

// cxense ライブラリ読み込み
document.write(unescape("%3Cscript src='http://www.ntv.co.jp/ad-navi/cx/cx_code.js' type='text/javascript' charset='utf-8'%3E%3C/script%3E"));

// global_nav
function navWrite()
{
	var click_str = 'onClick="javascript:matcTracker._trackEvent(\'click_program\',\'globalnavi\',document.URL+\'>\'+this.href);"';
	
	var menu_1='<div id="menu_nav">\n';
	var menu_2='<ul id="menu_nav_ul">\n'; // id属性つけました(NTVID)
	var menu_3='<li class="ntvtop"><a href="http://www.ntv.co.jp/count/ntvtop.html" target="_top" ' + click_str + '><span>日テレ HOME</span></a></li>\n';
	var menu_4='<li class="nav_program"><a href="http://www.ntv.co.jp/count/program.html" target="_top" ' + click_str + '><span>番組表</span></a></li>\n';
	var menu_5='<li class="nav_news"><a href="http://www.ntv.co.jp/count/news-info.html" target="_top" ' + click_str + '><span>ニュース・情報</span></a></li>\n';
	var menu_6='<li class="nav_drama"><a href="http://www.ntv.co.jp/count/drama.html" target="_top" ' + click_str + '><span>ドラマ</span></a></li>\n';
	var menu_7='<li class="nav_variety"><a href="http://www.ntv.co.jp/count/variety.html" target="_top" ' + click_str + '><span>バラエティ・音楽</span></a></li>\n';
	var menu_8='<li class="nav_sports"><a href="http://www.ntv.co.jp/count/sportsmenu.html" target="_top" ' + click_str + '><span>スポーツ</span></a></li>\n';
	var menu_9='<li class="nav_movie"><a href="http://www.ntv.co.jp/count/movie-anime.html" target="_top" ' + click_str + '><span>映画・アニメ</span></a></li>\n';
	var menu_10='<li class="nav_mini"><a href="http://www.ntv.co.jp/count/mini.html" target="_top" ' + click_str + '><span>ミニ番組</span></a></li>\n';
	var menu_11='<li class="nav_event"><a href="http://www.ntv.co.jp/count/event.html" target="_top" ' + click_str + '><span>イベント</span></a></li>\n';
	var menu_12='<li class="nav_shop"><a href="http://www.ntv.co.jp/count/goods.html" target="_top" ' + click_str + '><span>通販</span></a></li>\n';
	var menu_13='<li class="nav_douga"><a href="http://www.ntv.co.jp/count/dai2.html" target="_top" ' + click_str + '><span>動画</span></a></li>\n';
	var menu_14='<li class="nav_present"><a href="http://www.ntv.co.jp/count/present.html" target="_top" ' + click_str + '><span>プレゼント</span></a></li>\n';
	var menu_15='<li class="nav-search">\n';
	var menu_16='<script language="JavaScript" type="text/javascript" charset="UTF-8">headerNtvWindow_utf8();</script>\n';
	var menu_17='</li>\n';
	var menu_18='</ul>\n';
	var menu_19='</div>\n';
	var menu_all= menu_1+menu_2+menu_3+menu_4+menu_5+menu_6+menu_7+menu_8+menu_9+menu_10+menu_11+menu_12+menu_13+menu_14+menu_15+menu_16+menu_17+menu_18+menu_19;
	document.write(menu_all);
	ntvidCheckLogin(); // (NTVID)
	
	// cxenseタグ書き込み
	cxenseSearch.writeTag();
}

// global_footer
function footerWrite()
{
	var foot_1='<div id="global_footer">';
	var foot_2='<ul>';
	var foot_3='<li><span>(c) Nippon Television Network Corporation</span></li>';
	var foot_4='</ul>';
	var foot_5='</div>';
	var foot_all= foot_1+foot_2+foot_3+foot_4+foot_5;
	document.write(foot_all);
}

function writeFlashHTML2( arg )
{
  /**
   * スクリプト
   */
   
  var parm = []
  
  //すべての引数を順番に
  for( i = 0 ; i < arguments.length ; i++ )
  {
		//属性名と属性値をあらわす文字列を配列parmへセットする
		parm[i] = arguments[i].split(' ').join('').split('=')
    
    //有効な属性名があれば属性値で変数化( 無効な名前は無視 )
    switch (parm[i][0])
    {
			case '_swf'     : var _swf     = parm[i][1] ; break ; // フラッシュのURL
			case '_quality' : var _quality = parm[i][1] ; break ; // 画質
			case '_loop'    : var _loop    = parm[i][1] ; break ; // 繰り返し
			case '_bgcolor' : var _bgcolor = parm[i][1] ; break ; // 背景色
			case '_wmode'   : var _wmode   = parm[i][1] ; break ; // 背景透明(WinIEのみ)
			case '_play'    : var _play    = parm[i][1] ; break ; // 自動再生
			case '_menu'    : var _menu    = parm[i][1] ; break ; // 右クリックメニュー
			case '_scale'   : var _scale   = parm[i][1] ; break ; // 幅高さが%の時の縦横比等
			case '_salign'  : var _salign  = parm[i][1] ; break ; // 表示領域内表示位置
			case '_height'  : var _height  = parm[i][1] ; break ; // ムービーの高さ
			case '_width'   : var _width   = parm[i][1] ; break ; // ムービーの幅
			case '_hspace'  : var _hspace  = parm[i][1] ; break ; // まわりの余白(水平方向)
			case '_vspace'  : var _vspace  = parm[i][1] ; break ; // まわりの余白(垂直方向)
			case '_align'   : var _align   = parm[i][1] ; break ; // 表示位置
			case '_class'   : var _class   = parm[i][1] ; break ; // クラス
			case '_id'      : var _id      = parm[i][1] ; break ; // ID名
			case '_name'    : var _name    = parm[i][1] ; break ; // ムービー名
			case '_style'   : var _style   = parm[i][1] ; break ; // スタイル
			case '_declare' : var _declare = parm[i][1] ; break ; // 読み込まれるだけで実行しない
			default        :;
    }
  }

  // タグ用文字列生成
  var htm = ""
  
  htm+="<object classid='clsid:d27cdb6e-ae6d-11cf-96b8-444553540000'"
  htm+="        codebase='http://download.macromedia.com/pub/shockwave/"
                    htm+="cabs/flash/swflash.cab#version=7,0,19,0'"
  if(!!_width)   htm+="        width    = '" + _width   + "'"
  if(!!_height)  htm+="        height   = '" + _height  + "'"
  if(!!_hspace)  htm+="        hspace   = '" + _hspace  + "'"
  if(!!_vspace)  htm+="        vspace   = '" + _vspace  + "'"
  if(!!_align)   htm+="        align    = '" + _align   + "'"
  if(!!_class)   htm+="        class    = '" + _class   + "'"
  if(!!_id)      htm+="        id       = '" + _id      + "'"
  if(!!_name)    htm+="        name     = '" + _name    + "'"
  if(!!_style)   htm+="        style    = '" + _style   + "'"
  if(!!_declare) htm+="                    " + _declare  
  htm+=">"
  if(!!_swf)     htm+="<param  name     = 'movie'   value ='" + _swf     + "'>"
  if(!!_quality) htm+="<param  name     = 'quality' value ='" + _quality + "'>"
  if(!!_loop)    htm+="<param  name     = 'loop'    value ='" + _loop    + "'>"
  if(!!_bgcolor) htm+="<param  name     = 'bgcolor' value ='" + _bgcolor + "'>"
  if(!!_play)    htm+="<param  name     = 'play'    value ='" + _play    + "'>"
  if(!!_menu)    htm+="<param  name     = 'menu'    value ='" + _menu    + "'>"
  if(!!_scale)   htm+="<param  name     = 'scale'   value ='" + _scale   + "'>"
  if(!!_salign)  htm+="<param  name     = 'salign'  value ='" + _salign  + "'>"
  if(!!_wmode)   htm+="<param  name     = 'wmode'   value ='" + _wmode   + "'>"
  htm+=""
  htm+="<embed                          "
  htm+="        pluginspage='http://www.macromedia.com/go/getflashplayer'"
  if(!!_width)   htm+="        width    = '" + _width   + "'"
  if(!!_height)  htm+="        height   = '" + _height  + "'"
  if(!!_hspace)  htm+="        hspace   = '" + _hspace  + "'"
  if(!!_vspace)  htm+="        vspace   = '" + _vspace  + "'"
  if(!!_align)   htm+="        align    = '" + _align   + "'"
  if(!!_class)   htm+="        class    = '" + _class   + "'"
  if(!!_id)      htm+="        id       = '" + _id      + "'"
  if(!!_name)    htm+="        name     = '" + _name    + "'"
  if(!!_style)   htm+="        style    = '" + _style   + "'"
  htm+="        type     = 'application/x-shockwave-flash' "
  if(!!_declare) htm+="                    " + _declare  
  if(!!_swf)     htm+="        src      = '" + _swf     + "'"
  if(!!_quality) htm+="        quality  = '" + _quality + "'"
  if(!!_loop)    htm+="        loop     = '" + _loop    + "'"
  if(!!_bgcolor) htm+="        bgcolor  = '" + _bgcolor + "'"
  if(!!_play)    htm+="        play     = '" + _play    + "'"
  if(!!_menu)    htm+="        menu     = '" + _menu    + "'"
  if(!!_scale)   htm+="        scale    = '" + _scale   + "'"
  if(!!_salign)  htm+="        salign   = '" + _salign  + "'"
  htm+="></embed>"
  htm+="</object>"

  //書き出し処理
  document.write(htm)
}

//NTVIDログインチェック用関数(NTVID)
function ntvidCheckLogin(){
	var auth_url='http://www.ntv.co.jp/ntvid/bring.html?return_uri='+encodeURIComponent(top.location.href);
	var menu_url='https://id.ntv.co.jp/shop/customer/menu.aspx';
	var loginHtml='<a href="'+auth_url+'" target="_top">ログイン</a>';
	var mypageHtml='<a href="'+menu_url+'" target="_blank">マイページ</a>';
	if(getCookie('ntvid_session')){
		statusDisplay(mypageHtml,'ntvid_mypage');
	}else{
		statusDisplay(loginHtml,'ntvid_login');
	}
	function statusDisplay(html,classname){
		var s=document.createElement('li');
		s.id='ntvid_status';
		s.innerHTML =html;
		s.className=classname;
		var insartPoint=document.getElementById('menu_nav_ul').appendChild(s);
	}
	function getCookie(name){
		var result=false;
		var allcookies=document.cookie;
		if(allcookies!=''){
			var cookies=allcookies.split(';');
			for(var i=0;i<cookies.length;i++){
				var cookie=cookies[i].split('=');
				if(cookie[0].replace(/(^\s+)|(\s+$)/g, '')==name){
					return decodeURIComponent(cookie[1].replace(/(^\s+)|(\s+$)/g, ''));
				}
			}
		}
		return false;
	}
}
//NTVIDログイン完了時用関数(NTVID)
(function(){
if(getParam('ntvidchk')){
	setCookie('ntvid_session','1','','/','14');
	top.location.href=deleteParam('ntvidchk');
}

function getParam(type){
	var allParams=top.location.search;
	if(allParams){
		allParams=allParams.substring(1);
		var arrayParams=allParams.split('&');
		for(var i=0;i<arrayParams.length;i++){
			param=arrayParams[i].split('=');
			paramName=param[0].replace(/(^\s+)|(\s+$)/g, '');
			paramValue=param[1].replace(/(^\s+)|(\s+$)/g, '');
			if(paramName==type){
				return paramValue;
			}
		}
	}
	return false;
}

function deleteParam(type){
	var allParams=top.location.search;
	if(allParams){
		delParam='';
		allParams=allParams.substring(1);
		var arrayParams=allParams.split('&');
		for(var i=0;i<arrayParams.length;i++){
			param=arrayParams[i].split('=');
			paramName=param[0].replace(/(^\s+)|(\s+$)/g, '');
			paramValue=param[1].replace(/(^\s+)|(\s+$)/g, '');
			if(paramName==type){
				arrayParams[i]='';
			}
			if(arrayParams[i]!=''){
				if(delParam==''){
					delParam+='?'+arrayParams[i];
				}else{
					delParam+='&'+arrayParams[i];
				}
			}
		}
		reloadUri=top.location.href.replace(top.location.search,delParam);
		return reloadUri;
	}
	return top.location.href;
}

function setCookie(name,value,domain,path,expires,secure){
	if(!name) return;
	var str=name+"="+encodeURIComponent(value);
	if(domain){
		if(domain==1)domain=top.location.hostname.replace(/^[^\.]*/,"");
		str+="; domain="+domain;
	}
	if(path){
		if(path==1)path=location.pathname;
		str+="; path="+path;
	}
	if(expires){
		var nowtime=new Date().getTime();
		expires=new Date(nowtime+(60*60*24*1000*expires));
		expires=expires.toGMTString();
		str+="; expires="+expires;
	}
	if(secure&&location.protocol=="https:"){
		str+="; secure";
	}
	top.document.cookie=str;
}

}());
//-->