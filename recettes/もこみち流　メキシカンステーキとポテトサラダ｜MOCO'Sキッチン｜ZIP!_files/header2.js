/*
 * header2.js 「ZIP!」内ヘッダー表示用スクリプトファイル(リニューアルデザイン用)
 *
 * ■表示内容
 * 1.ロゴ画像
 * 2.各コーナーリンク
 *
 * ○変更履歴
 * 2013.01.11 h.adachi：新規作成
 */

if ( typeof(HeaderMenu) == 'undefined' ) HeaderMenu = function() {};

// オブジェクト生成
var header = new HeaderMenu();

// 各種変数群
HeaderMenu.prototype.pageUrl   = '/zip/';
HeaderMenu.prototype.logoUrl   = 'index.html';
HeaderMenu.prototype.cnrUrl = [
	'',
	'cast/index.html',
	'corner.html',
	'index.html#sectionOrgnCont',
	'http://www.ntvshop.jp/410/p/c/czip/',
	'pon/index.html',
	'index.html#sectionForm',
	'present.html'
];
HeaderMenu.prototype.cnrTxt = [
	'',
	'出演者',
	'コーナー',
	'オリジナルコンテンツ',
	'番組グッズ',
	'データ放送',
	'募集企画',
	'プレゼント'
];
HeaderMenu.prototype.cnrId = [
	'',
	'',
	'',
	'navOrgnCont',
	'',
	'',
	'',
	''
];

HeaderMenu.prototype.headerImage = [
	'',
	'images/menu_cast.png',
	'images/menu_corner.png',
	'images/menu_original.png',
	'images/menu_goods.png',
	'images/menu_data.png',
	'images/menu_recruit.png',
	'images/menu_present.png'
];

/*
 * HTML出力用関数
 */
HeaderMenu.write = function(){
	var str = '';
	// ロゴ画像他
	str += '<div id="sect">\n';
	str += '<h1><a class="transparent" href="' + header.pageUrl + header.logoUrl + '">ZIP!</a></h1>\n';
	
	// 各コーナーリンク
	str += header.corner();
	str += '</div>\n';
	
	// HTML書き込み
	document.write(str);
}

/*
 * 各コーナーリンク設定用関数
 */
HeaderMenu.prototype.corner = function(){
	var str = '';
	str += '<div id="contNav">\n';
	str += '<p class="txtOnair">毎週月～金曜日 あさ5:50～8:00放送</p>\n';
	str += '<ul>\n';
	
	for(var i=1;i<this.cnrTxt.length;i++){
		str += '<li>';
		
		if(this.cnrUrl[i]){
			str += '<a ';
			if(this.cnrUrl[i].indexOf('http') != -1){
				str += 'href="' + this.cnrUrl[i] + '" target="_blank"';
			}else{
				str += 'href="' + this.pageUrl + this.cnrUrl[i] + '"';
			}
			
			if(this.cnrId[i] != '') str += ' id="' + this.cnrId[i] + '"';
			str += '>';
			str += '<img src="' + this.pageUrl + this.headerImage[i] + '" alt="' + this.cnrTxt[i] + '">';
			str += '</a>';
		} else {
			str += '<span>'
			str += '<img src="' + this.pageUrl + this.headerImage[i] + '" alt="' + this.cnrTxt[i] + '">';
			str += '</span>';
		}
		str += '</li>\n';
	}
	str += '</ul>\n';
	str += '</div>\n';
	return str;
}
