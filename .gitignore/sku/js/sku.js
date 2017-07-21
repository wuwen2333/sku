/**
 * 么么嗖 笔试题 sku选择
 * @authors Wuwen (540016845@qq.com)
 * @date    2017-07-19 
 */

var sku = {};
// 库存json数据
sku.skusData = [
		{
			"id":"072001",
			"image":"",
			"attrs": {
				"color": "Red",
				"size": "XL",
				"pattern": "Normal"
			},
			"instock": true
		},
		{
			"id":"072002",
			"image":"",
			"attrs": {
				"color": "Red",
				"size": "M",
				"pattern": "Normal"
			},
			"instock": true
		},
		{
			"id":"072003",
			"image":"",
			"attrs": {
				"color": "Red",
				"size": "XL",
				"pattern": "Wide"
			},
			"instock": true
		},
		{
			"id":"072004",
			"image":"",
			"attrs": {
				"color": "Red",
				"size": "XL",
				"pattern": "Wide"
			},
			"instock": true
		},
		{
			"id":"072005",
			"image":"",
			"attrs": {
				"color": "Blue",
				"size": "XL",
				"pattern": "Wide"
			},
			"instock": true
		},
		{
			"id":"072006",
			"image":"",
			"attrs": {
				"color": "Blue",
				"size": "XL",
				"pattern": "Normal"
			},
			"instock": true
		},
		{
			"id":"072007",
			"image":"",
			"attrs": {
				"color": "Green",
				"size": "XL",
				"pattern": "Normal"
			},
			"instock": true
		},
		{
			"id":"072008",
			"image":"",
			"attrs": {
				"color": "Green",
				"size": "M",
				"pattern": "Normal"
			},
			"instock": true
		},
		{
			"id":"072009",
			"image":"",
			"attrs": {
				"color": "Green",
				"size": "XL",
				"pattern": "Normal"
			},
			"instock": false
		},
		{
			"id":"072010",
			"image":"",
			"attrs": {
				"color": "Blue",
				"size": "XL",
				"pattern": "Normal"
			},
			"instock": false
		},
		{
			"id":"072011",
			"image":"",
			"attrs": {
				"color": "Blue",
				"size": "XL",
				"pattern": "Normal"
			},
			"instock": false
		},
		{
			"id":"072012",
			"image":"",
			"attrs": {
				"color": "Blue",
				"size": "XL",
				"pattern": "Normal"
			},
			"instock": false
		},
		{
			"id":"072013",
			"image":"",
			"attrs": {
				"color": "Red",
				"size": "M",
				"pattern": "Normal"
			},
			"instock": false
		},
		{
			"id":"072014",
			"image":"",
			"attrs": {
				"color": "Red",
				"size": "XL",
				"pattern": "Normal"
			},
			"instock": false
		},
		{
			"id":"072015",
			"image":"",
			"attrs": {
				"color": "Red",
				"size": "XL",
				"pattern": "Wide"
			},
			"instock": false
		}
	];
// 属性文描
sku.attrDescribe = {
	"color":"颜色",
	"size":"尺码",
	"pattern":"规格"
}
// 属性数据
sku.attrsObj = {};
// 选择的数据
sku.selectedSpecs = {};
// 获取属性及初始选择数据
sku.getAttrData = function(){
	var _data = sku.skusData;
	var _attrsObj = {};
	var hasGetInitSelected = false;
	for(var i = 0 ; i< _data.length;i++){
		if(!hasGetInitSelected && _data[i].instock){
			sku.selectedSpecs = _data[i];
			hasGetInitSelected = true;
		}
		var attrItem = _data[i].attrs;
		for (var key in attrItem){
			if(!_attrsObj[key]){
				_attrsObj[key] = [];
			}
			if(_attrsObj[key].indexOf(attrItem[key]) < 0 ){
				_attrsObj[key].push(attrItem[key]);
			}
		}
	}
	sku.attrsObj = _attrsObj;
}

// 渲染属性列表
sku.render = function(){
	var attrsObj = sku.attrsObj;
	var outputHtml = '';
	for(var key in attrsObj){
		outputHtml += '<div class="item '+key+'">'
						+'<p class="tit">'+ sku.attrDescribe[key] +'</p>'
						+'<ul>'
		for(var i = 0;i < attrsObj[key].length; i++){
			outputHtml += '<li data-id="'+key+'-'+i+'" class="'
							+ (sku.selectedSpecs.attrs[key] == attrsObj[key][i] ? 'active':'')
							+'">'+attrsObj[key][i]+'</li>';
		}
		outputHtml +='</ul></div>';
	}
	$('.spec-wrap').append(outputHtml);
	sku.updateSpecStatus();
}
// 高亮
sku.active = function($el){
	$el.addClass('active').siblings().removeClass('active');
}
// 绑定事件
sku.bindEvents = function(){
	$('.spec-wrap').on('click','li',function(){
		var $this = $(this);
		if(!$this.hasClass('disable','active')){
			var thisId = $this.attr('data-id').split('-');
			sku.selectedSpecs.attrs[thisId[0]] = sku.attrsObj[thisId[0]][thisId[1]];
			sku.active($this);			
			sku.updateSpecStatus();
		}	
	})

}
// 更新库存状态
sku.updateSpecStatus = function(){
	var _data = sku.skusData;
	var _selectedObj = sku.selectedSpecs;
	var hasAddId = false;
	renderInfo(sku.selectedSpecs.attrs);
	// 遍历属性
	for(var key in sku.attrsObj){
		var instockArr = [];

		// 遍历skus数据
		for(var i = 0; i < _data.length ; i++){
			var item = _data[i];
			if(item.instock && item.attrs[key] == _selectedObj.attrs[key]){
				
				// 遍历属性值
				$.each(item.attrs, function(key2,val) {
					 var id = key2 + '-' +sku.attrsObj[key2].indexOf(val);
					 if(instockArr.indexOf(id) < 0 && key2 !=key){
					 	instockArr.push(id);
					 }
				});
				
			}
		}
		var $attrs = $('.spec-wrap').find('.item').not('.'+key);
		$attrs.each(function(){
			$(this).find('li').removeClass('disable').not('[data-id="' +instockArr.join('"],[data-id="')+'"]').addClass('disable');
		})
	} 

	console.log(sku.selectedSpecs);

	function renderInfo(selectedAttr){		
		var selectArr = [];
		for(var item in selectedAttr){
			selectArr.push(selectedAttr[item]);
		}
		var output = '您已选择:' +selectArr.join(' / ');
		$('.spec-preview').find('.info').html(output);
	}

}
sku.init = function(){
	this.getAttrData();
	this.bindEvents();
	this.render();
}

sku.init();