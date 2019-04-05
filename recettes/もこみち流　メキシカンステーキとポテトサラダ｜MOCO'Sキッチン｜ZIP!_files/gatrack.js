try {
var matcTracker = _gat._getTracker("UA-24692652-1");
matcTracker._setDomainName("none");
matcTracker._setAllowLinker(true);
matcTracker._setAllowAnchor(true);
//•ª’PˆÊŒv‘ª
if(document.cookie.search(/__utmb/i) == -1) {
	var matcTime = new Date();
	var matcH = matcTime.getHours();
	if(matcH < 10) { matcH = "0" + matcH; }
	matcH = String(matcH);
	var matcM = matcTime.getMinutes();
	if(matcM < 10) { matcM = "0" + matcM; }
	matcM = String(matcM);
	var matcBM = (matcM < 30) ? "00" : "30";
	matcTracker._setCustomVar(1,"access_time_30",matcH+":"+matcBM,2);
	matcTracker._setCustomVar(2,"access_time",matcH+":"+matcM,2);
}
matcTracker._trackPageLoadTime();
matcTracker._trackPageview();
} catch(err) {}