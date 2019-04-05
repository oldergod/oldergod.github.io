/**
 * 
 * contents.js - 放送内容ページ関連Ajax処理の実行用スクリプト
 * 
 * ○変更履歴
 * 2012.10.26 h.adachi：新規作成
 * 2013.01.19 h.adachi：動画自動取り下げ処理追加
 * 2013.01.29 h.adachi：「笑いの単語チョウ」関連対応追加＋MCMS動画終了時刻による制御を追加
 * 2013.04.05 h.adachi：「BOOMERS」関連対応追加＋MCMS動画終了時刻による制御を追加
 * 2014.03.25 h.adachi：動画コーナー追加対応
 * 2014.09.10 h.adachi：動画コーナー追加対応＋コンソール表示部カット
 * 2014.10.10 h.adachi：動画コーナー追加対応
 *
 */

if ( typeof(contentsSetting) == 'undefined' ) contentsSetting = function() {};

// 各種オブジェクト生成
var cnt = new contentsSetting();

// 各種変数群
contentsSetting.prototype.fileName    = 'xml/monthlist.xml';
contentsSetting.prototype.selectText  = 'バックナンバー';
contentsSetting.prototype.bnPrefix    = 'backnumber_';
contentsSetting.prototype.bnSuffix    = '.html';
contentsSetting.prototype.divPullDown = {
	'top'    : 'monthList_top',
	'bottom' : 'monthList_btm',
	'prev'   : 'prev',
	'next'   : 'next'
};

contentsSetting.prototype.fileNameJson = 'xml/datelist.json';
contentsSetting.prototype.ArtSuffix    = '.html';
contentsSetting.prototype.ArticleId    = 'article';
contentsSetting.prototype.divArticle = {
	'prev'   : 'prev',
	'next'   : 'next'
};

// DOMLoadイベント
$(document).ready(function($) {
	// バックナンバー用プルダウン表示
	var page_path  = location.href;
	if(page_path.lastIndexOf(cnt.bnPrefix) != -1){
		common.parseXML(cnt.fileName, '', cnt.setPulldown);
	}else if($('.'+ cnt.ArticleId)){
		if(page_path.lastIndexOf('zip/tangochou/')==-1){
			common.parseJSON(cnt.fileNameJson, '', cnt.setPrevNext);
		}
	}
	
	// player用idがある場合のみ処理を実施
	if($('#playerArea').html() != null){
		cnt.playerDisplay();
	}
});

/**
 * プレイヤー表示制御用関数
 */
contentsSetting.prototype.playerDisplay = function(){
	// まずプレイヤーを見た目から消す
	$('#playerArea').hide();
	
	// timeタグの属性'endtime'の値を取得
	var time_value = '';
	var time_attr  = document.getElementsByTagName('time');
	var len = time_attr.length;
	for(var i=0;i<len;i++){
		var len2 = time_attr[i].attributes.length;
		for(var j=0;j<len2;j++){
			if(time_attr[i].attributes[j].nodeName == 'endtime'){
				time_value = time_attr[i].attributes[j].nodeValue;
				break;
			}
		}
		if(time_value!=undefined) break;
	}
	
	// 上から掲載日数、終了時刻（単語チョウ以外、単語チョウ）、マリ・クレール実施の曜日判定用リスト、マリ・クレール記事判定フラグ
	var disp_day = 7;
	var end_time  = '080000';
	var end_time2 = '080000';
	var marieclaile_week = new Array(false, false, false, false, false, true, false);
	var marieclaile_flag = false;
	
	// 記事の日付から7日後の日付を算出
	// metaから記事日付を取得
	var end_date;
	var m_data = document.getElementsByTagName('meta');
	var len    = m_data.length;
	
	// metaのnameが'Date'のcontentの値を取得
	for(var i=0;i<len;i++){
		if(m_data[i].name == 'Date'){
			var len2 = m_data[i].attributes.length;
			for(var j=0;j<len2;j++){
				if(m_data[i].attributes[j].nodeName == 'content'){
					end_date = m_data[i].attributes[j].nodeValue;
					break;
				}
			}
		}
		if(end_date!=undefined) break;
	}
	
	// 日付が取得できる場合のみ処理続行
	if(end_date || time_value){
		// 記事の曜日を取得
		var this_date = new Date(end_date.substring(0,4), parseInt(end_date.substring(5,7),10)-1, parseInt(end_date.substring(8,10),10));
		var this_week = this_date.getDay();
		
		// HAPPY LABOとBOOMERSの場合は曜日からマリ・クレール記事であるかを判定
		var url = location.href;
		if(url.indexOf('zip/happylabo/') != -1 || url.indexOf('zip/boomers/') != -1){
			marieclaile_flag = marieclaile_week[this_week];
		}
		
		// 終了日時を取得～タイムスタンプの値を取得
		var end_movie = '';
		// MCMSで登録された終了時刻を設定
		if(time_value){
			end_movie = new Date(time_value.substring(0,4), parseInt(time_value.substring(4,6),10)-1, parseInt(time_value.substring(6,8),10), parseInt(time_value.substring(8,10),10), parseInt(time_value.substring(10,12),10), parseInt(time_value.substring(12,14),10));
		// 7日後の日付を設置（時刻は固定の終了時刻）
		}else{
			if(url.indexOf('zip/tangochou/') != -1 || url.indexOf('zip/dougashow/') != -1){
				end_movie = new Date(end_date.substring(0,4), parseInt(end_date.substring(5,7),10)-1, parseInt(end_date.substring(8,10),10)+disp_day, parseInt(end_time2.substring(0,2),10), parseInt(end_time2.substring(2,4),10), parseInt(end_time2.substring(4,6),10));
			}else{
				end_movie = new Date(end_date.substring(0,4), parseInt(end_date.substring(5,7),10)-1, parseInt(end_date.substring(8,10),10)+disp_day, parseInt(end_time.substring(0,2),10), parseInt(end_time.substring(2,4),10), parseInt(end_time.substring(4,6),10));
			}
		}
		end_movie = end_movie.getTime();
		
		// キャッシュ対策用タイムスタンプ設定～phpリクエスト～サーバー時刻取得（タイムスタンプ）
		var set_date  = new Date();
		var set_time  = Date.parse(set_date).toString();
		var set_param = '?t=' + set_time.substring(7, 10);
		var now_time = $.ajax({
			url   : "/zip/js/api/gettime.php" + set_param,
			async : false,
			error : ''
		}).responseText;
		
		// サーバー日付を設定～タイムスタンプの値を取得
		var comp_date = new Date(now_time.substring(0,4), parseInt(now_time.substring(5,7),10)-1, parseInt(now_time.substring(8,10),10), parseInt(now_time.substring(11,13),10), parseInt(now_time.substring(14,16),10), parseInt(now_time.substring(17,19),10));
		var comp_date = comp_date.getTime();
		
		// マリ・クレール記事は常時プレイヤーを表示
		if(marieclaile_flag){
			$('#playerArea').show();
		// 時刻を比較して再生機管内ならプレイヤーを表示
		}else{
			if(end_movie > comp_date){
				$('#playerArea').show();
			}
		}
	}
	
	// ミラクルムービーメーカーのトップは常時表示
	if(location.href.indexOf('zip/miracle/') != -1 && !time_value) $('#playerArea').show();
	// べつばらZIP!は常時表示
	if(location.href.indexOf('zip/betsubara/') != -1) $('#playerArea').show();
}

/**
 * バックナンバー表示用関数
 */
contentsSetting.prototype.setPulldown = function(div, xml){
	var str = '';
	var list_flg = false;
	
	var count = 0;
	var month_list = new Array();
	
	str += '<form id="backNumber">\n';
	str += '<select name="select" id="select" onchange="contentsSetting.navi(this)">\n';
	str += '<option selected="selected">' + cnt.selectText + '</option>\n';
	// ループ開始
	$(xml).find('date').each(function(){
		var data = $(this).text();
		list_flg = true;
		// 以下、リストHTML
		str += '<option value="' + data + '">' + data.substring(0,4) + '年' + parseInt(data.substring(4,6),10) + '月</option>\n';
		
		// 前後リンク判定用リスト生成
		month_list[count] = data;
		count++;
	});
	str += '</select>\n';
	str += '</form>\n';
	// 出力処理
	if(list_flg){
		$('#' + cnt.divPullDown['top']).html(str);
		$('#' + cnt.divPullDown['bottom']).html(str);
	}
	
	// 開始月と終了月を取得
	var top_month = $(xml).find('top').text();
	var end_month = $(xml).find('end').text();
	cnt.setPrevNextBn(month_list, top_month, end_month);
}

/**
 * バックナンバー内前後リンク表示用関数
 */
contentsSetting.prototype.setPrevNextBn = function(list, top, end){
	// URL情報～リストの該当月取得
	var page_path  = location.href;
	var pos_month  = page_path.lastIndexOf('.html');
	var page_month = page_path.substring(pos_month-6, pos_month);
	
	var prev_month, next_month;
	var len = list.length;
	
	if(page_month == top){
		prev_month = list[1];
	}else if(page_month == end){
		next_month = list[(len-1)-1];
	}
	
	if(!prev_month && !next_month){
		for(var i=1;i<len-1;i++){
			if(page_month == list[i]){
				prev_month = list[i+1], next_month = list[i-1];
				break;
			}
		}
	}
	
	// HTML生成～出力
	var prev_str = '', next_str = '';
	if(prev_month){
		prev_str += '<a href="' + cnt.bnPrefix + prev_month + cnt.bnSuffix + '">前へ</a>';
	}else{
		prev_str += '<span>前へ</span>';
	}
	$('#' + cnt.divPullDown['prev']).html(prev_str);	
	
	if(next_month){
		next_str += '<a href="' + cnt.bnPrefix + next_month + cnt.bnSuffix + '">次へ</a>';
	}else{
		next_str += '<span>次へ</span>';
	}
	$('#' + cnt.divPullDown['next']).html(next_str);
}

/**
 * プルダウンのリンク遷移用関数
 */
contentsSetting.navi = function(obj) {
	url = cnt.bnPrefix + obj.options[obj.selectedIndex].value + cnt.bnSuffix;
	if(url != "") { location.href = url };
}

/**
 * 記事ページ内前後リンク制御用関数
 */
contentsSetting.prototype.setPrevNext = function(div, xml){
	var len = xml.items.length;
	
	// ページ内記事ID取得
	var page_path = location.href;
	var pos1 = page_path.lastIndexOf('/');
	var pos2 = page_path.lastIndexOf('.html');
	var item_id = page_path.substring(pos1+1, pos2);
	
	// 記事IDとマスタファイルとのマッチング～前後リンクのID取得
	var prev_id, next_id;
	if(len > 1){
		for(var i=0;i<len;i++){
			var page_id = xml.items[i].page;
			if(page_id == item_id){
				if(i==0){
					prev_id = xml.items[1].page;
				}else if(i==len-1){
					next_id = xml.items[(len-1)-1].page;
				}else{
					prev_id = xml.items[i+1].page;
					next_id = xml.items[i-1].page;
				}
				break;
			}
		}
	}
	
	// HTML生成～出力
	var prev_str = '', next_str = '';
	if(prev_id){
		prev_str += '<a href="' + prev_id + cnt.ArtSuffix + '">前へ</a>';
	}else{
		prev_str += '<span>前へ</span>';
	}
	$('#' + cnt.divArticle['prev']).html(prev_str);	
	
	if(next_id){
		next_str += '<a href="' + next_id + cnt.ArtSuffix + '">次へ</a>';
	}else{
		next_str += '<span>次へ</span>';
	}
	$('#' + cnt.divArticle['next']).html(next_str);
}