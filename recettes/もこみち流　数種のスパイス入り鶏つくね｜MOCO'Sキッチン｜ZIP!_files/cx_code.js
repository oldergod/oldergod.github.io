/**
 * 
 * cx_code.js - �����p�^�O���ߍ��ݗp���C�u����
 * 
 * ���ύX����
 * 2013.10.03 h.adachi�F�V�K�쐬
 * 2013.10.09 h.adachi�F�������O�Ώۃh���C�����X�g�ǉ�
 *
 */

// �N���X���錾
if ( typeof(cxenseSearch) == 'undefined' ) cxenseSearch = function() {};
// �I�u�W�F�N�g����
var cx_search = new cxenseSearch();

// �h���C�����X�g(�ʏ�ȊO)
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
// �h���C�����X�g(�������O�Ώ�)
cxenseSearch.prototype.exDomainList = new Array(
	'search.ntv.co.jp',
	'3min.ntv.co.jp'
);
// �R���e���c�^�C�v(�ʏ�ȊO)
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
// �T�C�gID���X�g
cxenseSearch.prototype.idList = {
	'ntv'     : '9222309366332723953',
	'st-ntv'  : '9222327561052763873',
	'news'    : '9222326868661617879',
	'movie'   : '9222327390885409873',
	'shop'    : '9222326868661617880',
	'st-news' : '9222327390885430873'
};

/**
 * �^�O�������ݗp�֐�
 *
 * type : ���s���C�u����(ga or none)
 */
cxenseSearch.writeTag = function(type){
	// �������ߍ��݃^�O�ɑ΂��Ă̊֐�������
	cx_code = function(){return false;};
	
	// �T�C�g�ɑΉ�����T�C�gID���擾
	var path = location.href;
	var site_id = cx_search.getId(path, type);
	
	// ���s����ga_code.js���ۂ�
	if(site_id != ''){
		// ���O�Ώۃh���C�����X�g�Ƃ̃}�b�`���O���{
		var write_flag = true;
		var len = cx_search.exDomainList.length;
		for(var i=0;i<len;i++){
			if(path.indexOf(cx_search.exDomainList[i]) != -1){
				write_flag = false;
				break;
			}
		}
		
		// ���O�ΏۈȊO�̃h���C���̏ꍇ�̂ݏ����o��
		if(write_flag){
			// �g���b�L���O�X�N���v�g�̐ݒ�`�����o��
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
 * �T�C�gID�擾�p�֐�
 *
 * path : �T�C�gURL
 * type : ���s���C�u����(ga or none)
 */
cxenseSearch.prototype.getId = function(path, type){
	var site_id = '';
	
	// �o�^�h���C�����X�g�Ƃ̃}�b�`���O���{
	var len = this.domainList.length;
	for(var i=0;i<len;i++){
		if(path.indexOf(this.domainList[i]) != -1){
			// �ʃT�C�gID��ێ�����ꍇ�͂��̒l��ݒ�
			site_id = this.idList[this.typeList[i]];
			break;
		}
	}
	
	// �Y�����Ȃ��ꍇ�͋��ʂ̃T�C�gID��ݒ�
	if(site_id == '' && type != 'ga') site_id = this.idList['ntv'];
	
	// ���e����Web�p�Ή�
	if(site_id == this.idList['shop']){
		var mode_param = this.getParam('mode');
		// �w��̃N�G��������ꍇ��meta�^�O��t������
		if(mode_param){
			//jquery���ǂ܂�Ă��邩���m�F
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
 * URL�N�G���擾�p�֐�(���e����Web �y�[�W���[�h����)
 */
cxenseSearch.prototype.getParam = function(type){
	var returnCode;
	var def_type = 'mode';
	var typeList = {
		'mode' : 'ismodesmartphone'
	};
	var get_param = (type!=undefined)? typeList[type] : typeList[def_type];
	
	// �p�����[�^���X�g����
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
