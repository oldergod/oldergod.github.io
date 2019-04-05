/**
 * 
 * cx_code.js - 検索用タグ埋め込み用ライブラリ
 * 
 * ○変更履歴
 * 2013.10.03 h.adachi：新規作成
 * 2013.10.09 h.adachi：検索除外対象ドメインリスト追加
 *
 */

// クラス名宣言
if ( typeof(cxenseSearch) == 'undefined' ) cxenseSearch = function() {};
// オブジェクト生成
var cx_search = new cxenseSearch();

// ドメインリスト(通常以外)
cxenseSearch.prototype.domainList = new Array(
	'www1.ntv.co.jp',
	'www.ntv.co.jp',
	'appli.ntv.co.jp',
	'ntveco.jp',
	'ntvg-tv.jp',
	'ntv-stg.4cast.co.jp',
	'ntv.4cast.co.jp',
	'vod.ntv.co.jp',
	//'www.dai2ntv.jp',
	'www.ntvshop.jp',
	'st-www.news24.jp',
	'www1.news24.jp',
	'www.news24.jp',
	'news24.jp'
);
// ドメインリスト(検索除外対象)
cxenseSearch.prototype.exDomainList = new Array(
	'search.ntv.co.jp',
	'3min.ntv.co.jp'
);
// コンテンツタイプ(通常以外)
cxenseSearch.prototype.typeList = new Array(
	'ntv',
	'ntv',
	'ntv',
	'ntv',
	'ntv',
	'st-ntv',
	'st-ntv',
	'movie',
	//'movie',
	'shop',
	'st-news',
	'news',
	'news',
	'news'
);
// サイトIDリスト
cxenseSearch.prototype.idList = {
	'ntv'     : '9222309366332723953',
	'st-ntv'  : '9222327561052763873',
	'news'    : '9222326868661617879',
	'movie'   : '9222327390885409873',
	'shop'    : '9222326868661617880',
	'st-news' : '9222327390885430873'
};

/**
 * タグ書き込み用関数
 *
 * type : 実行ライブラリ(ga or none)
 */
cxenseSearch.writeTag = function(type){
	// 既存埋め込みタグに対しての関数無効化
	cx_code = function(){return false;};
	
	// サイトに対応するサイトIDを取得
	var path = location.href;
	var site_id = cx_search.getId(path, type);
	
	// 実行元がga_code.jsか否か
	if(site_id != ''){
		// 除外対象ドメインリストとのマッチング実施
		var write_flag = true;
		var len = cx_search.exDomainList.length;
		for(var i=0;i<len;i++){
			if(path.indexOf(cx_search.exDomainList[i]) != -1){
				write_flag = false;
				break;
			}
		}
		
		// 除外対象以外のドメインの場合のみ書き出し
		if(write_flag){
			// トラッキングスクリプトの設定～書き出し
			var str = '';
			str += '<!-- Cxense script begin -->';
			str += '<div id="cX-root" style="display:none"></div>';
			str += '<script type="text/javascript">';
			str += 'var cX = cX || {}; cX.callQueue = cX.callQueue || [];';
			str += 'cX.callQueue.push([\'setSiteId\', \'' + site_id + '\']);';
			str += 'cX.callQueue.push([\'sendPageViewEvent\']);';
			str += '</script>';
			str += '<script type="text/javascript">';
			str += '(function() { try { var scriptEl = document.createElement(\'script\'); scriptEl.type = \'text/javascript\'; scriptEl.async = \'async\';';
			str += 'scriptEl.src = (\'https:\' == document.location.protocol) ? \'https://scdn.cxense.com/cx.js\' : \'http://cdn.cxense.com/cx.js\';';
			str += 'var targetEl = document.getElementsByTagName(\'script\')[0]; targetEl.parentNode.insertBefore(scriptEl, targetEl); } catch (e) {};} ());';
			str += '</script>';
			str += '<!-- Cxense script end -->';
			document.write(str);
		}
	}
}

/**
 * サイトID取得用関数
 *
 * path : サイトURL
 * type : 実行ライブラリ(ga or none)
 */
cxenseSearch.prototype.getId = function(path, type){
	var site_id = '';
	
	// 登録ドメインリストとのマッチング実施
	var len = this.domainList.length;
	for(var i=0;i<len;i++){
		if(path.indexOf(this.domainList[i]) != -1){
			// 個別サイトIDを保持する場合はその値を設定
			site_id = this.idList[this.typeList[i]];
			break;
		}
	}
	
	// 該当しない場合は共通のサイトIDを設定
	if(site_id == '' && type != 'ga') site_id = this.idList['ntv'];
	
	// 日テレ屋Web用対応
	if(site_id == this.idList['shop']){
		var mode_param = this.getParam('mode');
		// 指定のクエリがある場合はmetaタグを付加する
		if(mode_param){
			//jqueryが読まれているかを確認
			if(typeof jQuery == 'function'){
				$('head').append('<meta name="cXenseParse:ntv-fordevice" content="mobile"/>\n');
			}else{
				var elem      = document.getElementsByTagName("head");
				var elem_html = elem[0].innerHTML;
				var meta_str  = '<meta name="cXenseParse:ntv-fordevice" content="mobile"/>\n';
				elem_html += meta_str;
				elem[0].innerHTML += meta_str;
			}
		}
	}
	return site_id;
}

/**
 * URLクエリ取得用関数(日テレ屋Web ページモード判定)
 */
cxenseSearch.prototype.getParam = function(type){
	var returnCode;
	var def_type = 'mode';
	var typeList = {
		'mode' : 'ismodesmartphone'
	};
	var get_param = (type!=undefined)? typeList[type] : typeList[def_type];
	
	// パラメータリスト生成
	if(location.search.length > 0){
		var prm_list = new Array();
		var choice      = location.search.substring(1);
		var choiceValue = choice.split('&');
		
		for(var i=0;i<choiceValue.length;i++){
			var name  = '', value = '';
			var pos = choiceValue[i].indexOf('=');
			name  = choiceValue[i].substring(0,pos);
			value = choiceValue[i].substring(pos+1,choiceValue[i].length);
			if(pos!=-1) prm_list[name] = value;
		}
	}else{
		return '';
	}
	returnCode = (prm_list[get_param]!=undefined)? prm_list[get_param] : '';
	return returnCode;
}
