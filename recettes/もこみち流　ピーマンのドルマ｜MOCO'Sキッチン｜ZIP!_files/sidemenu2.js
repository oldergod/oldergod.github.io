/*
 * sidemenu2.js 「ZIP!」内サイドメニュー表示用スクリプトファイル
 *
 * ■表示内容
 * 1.レクタングルバナー
 * 2.コーナー別バナー
 *
 * ○変更履歴
 * 2012.10.24 h.adachi：新規作成
 * 2013.04.15 h.adachi：動画コーナー追加対応
 * 2013.07.10 h.adachi：動画コーナー追加対応
 * 2014.09.08 h.adachi：動画コーナー追加対応
 * 2014.10.06 h.adachi：動画コーナー追加対応
 * 2014.10.15 h.adachi：応募フォームバナー変更（ZIP!ラジオショー）
 */

if ( typeof(SideMenu) == 'undefined' ) SideMenu = function() {};

// オブジェクト生成
var side = new SideMenu();

// 各種変数群
SideMenu.prototype.siteUrl  = '/zip/';

/*
 * HTML出力用関数
 */
SideMenu.write = function(){
	var str = '';
	// レクタングルバナー
	str += side.adRec();
	
	var page_path = location.href;
	// MOCO'Sキッチン
	if(page_path.indexOf(side.siteUrl + 'mokomichi/') != -1){
		str += '<div class="banner"><a target="_blank" href="http://app.ntv.co.jp/myntv/sys/enquete/input/?enquete_id=496"><img alt="MOCO\'Sキッチンリクエスト募集" src="/zip/mokomichi/images/banner_mokomichi_request.png"></a></div>\n';
		str += '<div class="banner"><a target="_blank" href="http://www.nitteleplus.com/program/variety/mocos.html"><img alt="ZIP!スピンオフ MOCO\'Sキッチン CSオリジナル版 日テレプラスで毎月新作を放送中！" src="/zip/mokomichi/images/banner_mokomichi_cs.png"></a></div>\n';
		str += '<div class="banner"><a target="_blank" href="http://www.ntvshop.jp/410/p/c/cmocos/"><img alt="MOCO\'Sキッチングッズページ" src="/zip/mokomichi/images/banner_mokomichi_goods.png"></a></div>\n';
		str += '<div class="banner"><a href="http://vod.ntv.co.jp/top/" target="_blank"><img src="/zip/mokomichi/images/banner_mokomichi_nod.png" alt="日テレオンデマンド"></a></div>\n';
	// HAPPY LABO
	}else if(page_path.indexOf(side.siteUrl + 'happylabo/') != -1){
		str += '<div class="banner"><a href="/zip/marieclairestyle/index.html" target="_blank"><img src="/zip/marieclairestyle/images2/banner.png" width="300" height="200" alt="ZIP!×marie claire"></a></div>\n';
	// おはよう忍者隊ガッチャマン
	}else if(page_path.indexOf(side.siteUrl + 'gatchaman/') != -1){
		str += '<div class="banner"><a target="_blank" href="http://www.jointv.jp/"><img alt="ガッチャマン×JoinTV" src="/zip/gatchaman/images/banner_gatchaman_jointv.png"></a></div>\n';
		str += '<div class="banner"><a target="_blank" href="http://www.ntvshop.jp/410/p/c/czip/"><img alt="ガッチャマングッズページ" src="/zip/gatchaman/images/banner_gatchaman_goods.png"></a></div>\n';
	// ZIP!RADIOショー
	}else if(page_path.indexOf(side.siteUrl + 'radioshow/') != -1){
		str += '<div class="banner"><a target="_blank" href="http://app.ntv.co.jp/myntv/sys/enquete/input/?enquete_id=1382"><img alt="べつばらZIP! トークテーマやZIP!ファミリーへの質問を大募集!" src="/zip/betsubara/images/banner_betsubara_theme.png"></a></div>\n';
	// ZIP!スマイルキャラバン
	}else if(page_path.indexOf(side.siteUrl + 'caravan/') != -1){
		str += '<div class="linkOtherService" id="fbLikeBox">\n';
		str += '<h3>スマイルキャラバンFacebook</h3>\n';
		str += '<div id="fbLikeBoxCode">\n';
		str += '<div class="fb-like-box" data-href="http://www.facebook.com/zipsmilecaravan" data-width="296" data-height="362" data-show-faces="false" data-border-color="#ffffff" data-stream="true" data-header="false"></div>\n';
		str += '</div>\n';
		str += '</div>\n';
		
		str += '<div class="banner"><a href="/zip/smile/index.html" target="_blank"><img src="images/banner_caravan_zippei.png" alt="ZIP!スマイルキャラバン"></a></div>\n';
	// マジンガーZIP!
	}else if(page_path.indexOf(side.siteUrl + 'mazinger/') != -1){
		/////////////////////////////////////////////////////////////////////////////////
		//  ここに  マジンガーZIP!  のバナーを記述する
		/////////////////////////////////////////////////////////////////////////////////
	// 半熟ことば
	}else if(page_path.indexOf(side.siteUrl + 'hanjuku/') != -1){
		/////////////////////////////////////////////////////////////////////////////////
		//  ここに  半熟ことば  のバナーを記述する
		/////////////////////////////////////////////////////////////////////////////////
	// BOOMERS
	}else if(page_path.indexOf(side.siteUrl + 'boomers/') != -1){
		str += '<div class="banner"><a href="/zip/marieclairestyle/index.html" target="_blank"><img src="/zip/marieclairestyle/images2/banner.png" width="300" height="200" alt="ZIP!×marie claire"></a></div>\n';
	// ZIP!PRESENTS あさダンス体操
	}else if(page_path.indexOf(side.siteUrl + 'asadance/') != -1){
		/////////////////////////////////////////////////////////////////////////////////
		//  ここに  ZIP!PRESENTS あさダンス体操  のバナーを記述する
		/////////////////////////////////////////////////////////////////////////////////
	// おはようハクション大魔王
	}else if(page_path.indexOf(side.siteUrl + 'hakushon/') != -1){
		str += '<div class="banner"><a href="http://www.4cast.co.jp/mbtools/qr/2425/" target="_blank"><img src="/zip/hakushon/images/img_hulu.png" width="300" height="84" alt="おはようハクション大魔王Huluで見逃し配信中！"></a></div>\n';
	// 1分動画笑
	}else if(page_path.indexOf(side.siteUrl + 'dougashow/') != -1){
		/////////////////////////////////////////////////////////////////////////////////
		//  ここに  1分動画笑  のバナーを記述する
		/////////////////////////////////////////////////////////////////////////////////
	}else if(page_path.indexOf(side.siteUrl + 'miracle/') != -1){
		/////////////////////////////////////////////////////////////////////////////////
		//  ここに  ミラクルムービーメーカー  のバナーを記述する
		/////////////////////////////////////////////////////////////////////////////////
	// べつばらZIP!
	}else if(page_path.indexOf(side.siteUrl + 'betsubara/') != -1){
		str += '<div class="banner"><a target="_blank" href="http://app.ntv.co.jp/myntv/sys/enquete/input/?enquete_id=1382"><img alt="べつばらZIP! トークテーマやZIP!ファミリーへの質問を大募集!" src="/zip/betsubara/images/banner_betsubara_theme.png"></a></div>\n';
	}
	
	// HTML書き込み
	document.write(str);
}

/*
 * レクタングルバナー設定用関数
 */
SideMenu.prototype.adRec = function(){
	var str = '';
	str += '<div id="ad">\n';
	str += '<!-- PLACEHOLDERtag start-->\n';
	str += '<script language=\'JavaScript\'>CM8ShowAd(\'Largerec_300x250\')</script>\n';
	str += '<!-- PLACEHOLDERtag end-->\n';
	str += '</div>\n';
	return str;
}
