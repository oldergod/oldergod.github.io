/**
 * NTV用ダミーHTML
 *
 * ○変更履歴
 * 2012.02.01 : h.adachi submit関数の変更
 */
function headerNtvWindow_utf8()
{
	var searchWindow = '<form name=\"NTVForm\" action=\"http://search.ntv.co.jp/\" method=\"get\" target=\"_top\">';
	searchWindow += '<p class=\"nav-window\"><input type=\"text\" name=\"keyword\" value=\"\" /></p>';
	searchWindow += '<p class=\"nav-btn\"><input type=\"image\" onclick=\"submit_utf8();return false\" name=\"Submit\" value=\"検索\" alt=\"検索\" src=\"http://www.ntv.co.jp/ad-navi/images/spacer.gif\" class=\"searchBtn\" /></p>';
	searchWindow += '<input type=\"hidden\" name=\"page\" value=\"1\" />';
	searchWindow += '<input type=\"hidden\" name=\"category\" value=\"homepage\" />';
	searchWindow += '</form>';
	document.write(searchWindow);
}

/**
 * SEC用ダミーHTML（動画検索用）　※2012/2/1現在で使用されている箇所は不明
 */
function headerSecWindow_utf8()
{
	//FIXME 動作環境の変更や遷移先URLの変更があった場合、URLを新しいものに修正してご使用ください。
	var searchWindow = '<form name=\"NTVForm\" action=\"http://search.ntv.co.jp/movie/\" method=\"get\">';
	searchWindow += '<div class=\"search\">';
	searchWindow += '<div class=\"window\"><input type=\"text\" name=\"keyword\" value=\"\"></div>';
	searchWindow += '<div class=\"btn\" align="right"><input type=\"image\" onclick=\"submit();return false\" name=\"Submit\" value=\"検索\" alt=\"検索\" src=\"http://www.dai2ntv.jp/images/temp/btn_search.gif\" class=\"searchBtn\" /></div>';
	searchWindow += '</div>';
	searchWindow += '<input type=\"hidden\" name=\"page\" value=\"1\" />';
	searchWindow += '<input type=\"hidden\" name=\"category\" value=\"video\" />';
	searchWindow += '<input type=\"hidden\" name=\"sort\" value=\"match\" />';
	searchWindow += '</form>';
	document.write(searchWindow);
}

/**
 * 注目キーワードHTML（動画検索用）　※2012/2/1現在で使用されている箇所は不明
 */
function headerSecKeyword_utf8(keyword)
{
	var keywordLink = '<a href=\"' + '?keyword=' + keyword + '&category=video&page=1&sort=match\">';
	keywordLink += keyword;
	keywordLink += '</a>';
	document.write(keywordLink);
}

/**
 * 検索窓用送信処理
 *
 * ○変更履歴
 * 2012.02.01 : h.adachi クリックレート計測用関数の追加
 */
function submit_utf8() {
	var search_str = document.NTVForm.keyword.value;
	var move_str   = "http://search.ntv.co.jp/?keyword=" + encodeURIComponent(search_str) + "&page=1&category=homepage";
	matcTracker._trackEvent('click_program','search',location.href+'>'+move_str);
	document.NTVForm.submit();
}