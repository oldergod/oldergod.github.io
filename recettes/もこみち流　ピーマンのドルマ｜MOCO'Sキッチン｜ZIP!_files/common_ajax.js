/**
 * 
 * common_ajax.js - Ajax部分共通情報用ライブラリ
 * 
 * ○変更履歴
 * 2011.03.24 h.adachi：新規作成
 * 2012.09.18 h.adachi：リニューアル対応
 * 2012.10.29 h.adachi：JSON関連関数追加
 * 2012.11.07 h.adachi：動画コーナー追加対応
 * 2013.03.27 h.adachi：動画コーナー追加対応
 * 2013.04.23 h.adachi：動画コーナー追加対応
 * 2013.07.10 h.adachi：動画コーナー追加対応
 * 2014.03.25 h.adachi：動画コーナー追加対応
 * 2014.06.25 y.abe：MOCO'Sキッチン動画配信先変更対応
 * 2014.07.02 a.matsuda：ZIP!トップページ軽量化対応
 * 2014.09.08 h.adachi：動画コーナー追加対応
 * 2014.10.06 h.adachi：動画コーナー追加対応
 */

// クラス名宣言
commonAjax = function() {};
// オブジェクト生成
var common = new commonAjax();

// 各種変数群
commonAjax.prototype.apiPath = 'http://www.dai2ntv.jp/tool/get_json.php';
//commonAjax.prototype.apiPath = 'http://www.dai2ntv.jp/tool/get_json_test.php';
// commonAjax.prototype.apiPath = 'http://stg.dai2ntv.jp/tool/get_json.php';
commonAjax.prototype.apiPath_emb = 'http://www.dai2ntv.jp/tool/embed.php';
// commonAjax.prototype.apiPath_emb = 'http://stg.dai2ntv.jp/tool/embed.php';

commonAjax.prototype.apiPath_mocos = '/zip/mokomichi/xml/moko_newrecipe.json';

commonAjax.prototype.contDir = new Array(
	'mokomichi',
	'zipmag',
	'gatchaman',
	'kobayashi',
	'radioshow',
	'zippei',
	'week',
	'kotobaneko',
	'happylabo',
	'camera',
	'tangochou',
	'mazinger',
	'hanjuku',
	'boomers',
	'asadance',
	'hakushon',
	'dougashow',
	'radioshow_1',
	'miracle',
	'betsubara',
	'betsubara_1'
);
commonAjax.prototype.labelName = {
	'mokomichi'  : 'mokomichi',
	'zipmag'     : 'zipmag',
	'gatchaman'  : 'gatchaman' ,
	'kobayashi'  : 'kobayashi',
	'radioshow'  : 'radioshow',
	'zippei'     : 'zippei_song',
	'week'       : 'zippei_week',
	'kotobaneko' : 'kotobaneko',
	'happylabo'  : 'happylabo',
	'camera'     : 'zip_camera',
	'tangochou'  : 'tangochou',
	'mazinger'   : 'mazinger',
	'hanjuku'    : 'hanjuku',
	'boomers'    : 'boomers',
	'asadance'   : 'asadance',
	'hakushon'   : 'hakushon',
	'dougashow'  : 'dougashow',
	'radioshow_1'  : 'radioshow_1',
	'miracle'    : 'miracle',
	'betsubara'  : 'betsubara',
	'betsubara_1'  : 'betsubara_1'
};

/**
 * XMLリクエスト用関数(レスポンス：XML)
 */
commonAjax.prototype.parseXML = function(xml_url, div, callback, arg4){
	// Ajax処理実行
	$.ajax({
		type : "GET",
		url : xml_url + common.setQuery(),
		dataType : 'xml',
		success: function(xml){
			callback(div, xml, arg4);
		},
		error: function(){
			if(div == 'link_btn') callback(div);
		}
	});
}

/**
 * XMLリクエスト用関数(レスポンス：JSONP)
 */
commonAjax.prototype.parseJSONP = function(xml_url, div, callback, arg4){
	// Ajax処理実行
	$.ajax({
		type : "GET",
		url : xml_url,
		dataType : 'jsonp',
		success: function(xml){
			callback(div, xml, arg4);
		},
		error: function(XMLHttpRequest, textStatus, errorThrown){
			// エラー表示関数へ
			var page_path = location.href;
			if(page_path.indexOf('movie') != -1){
				mov.dispError(div);
			}else if(
				page_path == 'http://www.ntv.co.jp/zip/index.html' ||
				page_path == 'http://www.ntv.co.jp/zip/'
			){
				top_obj.dispMovieError(arg4,div);
			}
		}
	});
}

/**
 * XMLリクエスト用関数(レスポンス：JSON)
 */
commonAjax.prototype.parseJSON = function(xml_url, div, callback, arg4){
	// Ajax処理実行
	$.ajax({
		type : "GET",
		url : xml_url,
		dataType : 'json',
		success: function(xml){
			callback(div, xml, arg4);
		},
		error: function(XMLHttpRequest, textStatus, errorThrown){
			// エラー表示関数へ
			var page_path = location.href;
			if(page_path.indexOf('movie') != -1){
				mov.dispError(div);
			}else if(
				page_path == 'http://www.ntv.co.jp/zip/index.html' ||
				page_path == 'http://www.ntv.co.jp/zip/'
			){
				top_obj.dispMovieError(arg4,div);
			}
		}
	});
}

/**
 * URLクエリ(アイテムID)取得用関数
 */
commonAjax.prototype.getParam = function(type){
	var returnCode;
	var def_type = 'vid';
	var typeList = {
		'vid'   : 'vid',
		'page'  : 'page'
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

/**
 * キャッシュクリア用クエリ付与関数
 */
commonAjax.prototype.setQuery = function(){
	// キャッシュ対策用タイムスタンプ
	var set_date  = new Date();
	var set_time  = Date.parse(set_date).toString();
	var set_param = '?t=' + set_time.substring(7, 10);
	return set_param;
}

/**
 * レスポンス(時刻)のDateオブジェクト設定対応
 *
 * ○引数
 * time : 形式は"YYYY-MM-DDThh:mm:ss+00:00"
 */
commonAjax.prototype.setTime = function(time){
	// GMTとJSTとの時差(時間)
	var time_diff = 9;
	
	// 各要素を日付オブジェクトに設定
	var set_date  = new Date();
	set_date.setYear(parseInt(time.substring(0,4),10));
	set_date.setMonth(parseInt(time.substring(5,7),10)-1);
	set_date.setDate(parseInt(time.substring(8,10),10));
	set_date.setHours(parseInt(time.substring(11,13),10));
	set_date.setMinutes(parseInt(time.substring(14,16),10));
	set_date.setSeconds(parseInt(time.substring(17,19),10));
	
	// GMT→JSTに変換
	set_date.setTime(set_date.getTime() + (time_diff*60*60*1000));
	
	return set_date;
}

/**
 * 画像用HTML設定用関数
 */
commonAjax.prototype.MakeImg = function(src, width, height, alt, border) {
	var str = '';
	str += '<img ';
	if(src!=null)    str += 'src="'    + src    + '" ';
	if(width!=null)  str += 'width="'  + width  + '" ';
	if(height!=null) str += 'height="' + height + '" ';
	if(alt!=null)    str += 'alt="'    + alt    + '" ';
	if(border!=null) str += 'border="' + border + '" ';
	str += ' />';
	return str;
}

/**
 * 指定したByte数までで文字をカットし最後に"…"をつける関数
 */
commonAjax.prototype.CountLength = function(str, Byte) {
	if (str.length == null ) return;
	
	// 不要文字列カット
	var br_txt = '<br />';
	var len = (Byte - br_txt.length)/2;
	if(str.length >= len){
		var str1 = str.substring(0, len);
		var str2 = str.substring(len, str.length);
		str2 = str2.replace(br_txt, "", "g");
		str = str1 + str2;
	}
	
	var returnCode = "";
	var r = 0;
	
	for (var i = 0; i < str.length; i++) {
		var c = str.charCodeAt(i);
		// Shift_JIS: 0x0 ～ 0x80, 0xa0 , 0xa1 ～ 0xdf , 0xfd ～ 0xff
		// Unicode : 0x0 ～ 0x80, 0xf8f0, 0xff61 ～ 0xff9f, 0xf8f1 ～ 0xf8f3
		if ( (c >= 0x0 && c < 0x81) 
			|| (c == 0xf8f0) 
			|| (c >= 0xff61 && c < 0xffa0) 
			|| (c >= 0xf8f1 && c < 0xf8f4)) 
		{
			r += 1;
		} else {
			r += 2;
		}
		if (r >= Byte) {
			return returnCode + "…";
		}
		returnCode += str.substring(i, i+1);
	}
	return returnCode;
}

/**
 * システム日付取得 + フォーマット設定(yyyymmdd)用関数
 * 引数(no, point)
 * 1. no	: 対象日からn日
 * 2. point	:'before'：n日前、'after'：n日後、''：当日
 */
commonAjax.prototype.getDate = function(no, point){
	var today_date = '';
	var this_date  = new Date();
	
	if(point=='before'){
		this_date.setTime(this_date.getTime() - (24*60*60*1000)*no);
	}else if(point=='after'){
		this_date.setTime(this_date.getTime() + (24*60*60*1000)*no);
	}	
	var currentYear   = this_date.getYear();
	currentYear       = (currentYear < 2000) ? currentYear + 1900 : currentYear;
	var currentMonth  = this_date.getMonth() + 1;
	var currentDay    = this_date.getDate();
	var currentHour   = this_date.getHours();
	var currentMinute = this_date.getMinutes();
	var currentSecond = this_date.getSeconds();
	if(currentMonth<10){
		today_date = currentYear + '0' + currentMonth;
	}else{
		today_date = currentYear + currentMonth.toString();
	}
	if(currentDay<10){
		today_date += '0' + currentDay;
	}else{
		today_date += currentDay.toString();
	}
	if(currentHour<10){
		today_date += '0' + currentHour;
	}else{
		today_date += currentHour.toString();
	}
	if(currentMinute<10){
		today_date += '0' + currentMinute;
	}else{
		today_date += currentMinute.toString();
	}
	if(currentSecond<10){
		today_date += '0' + currentSecond;
	}else{
		today_date += currentSecond.toString();
	}
	return today_date;
}

/**
 * 曜日データ取得用関数
 * yyyymmdd ：日付データ(YYYYMMDD)
 */
commonAjax.prototype.getWeek = function(yyyymmdd){
	var week_name   = new Array( "日","月","火","水","木","金","土" );
	var set_date    = new Date(yyyymmdd.substring(0,4) ,yyyymmdd.substring(4,6) - 1 ,yyyymmdd.substring(6,8) );
	var search_week = set_date.getDay();
	return week_name[search_week];
}

/**
 * 改行コード(LF)→<br>変換用関数
 */
commonAjax.prototype.changeLineCode = function(str){
	var returnCode = '';
	
	// Firefoxのみ
	if(navigator.userAgent.indexOf("Firefox") != -1){
		returnCode = str.replace(/\n\n/g,"\n");
	}else{
		returnCode = str;
	}
	REbr = new RegExp(String.fromCharCode(10),"g");
	returnCode = returnCode.replace(REbr,"<br>");
	return returnCode;
}
