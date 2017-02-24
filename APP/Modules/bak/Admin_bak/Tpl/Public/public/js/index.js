$(function () {

	$('#search_button').button();
	
	/*
	同时打开两个对话框
	$('#reg').dialog();
	$('#login').dialog();
	*/
	
	$('#reg').dialog({
		title : '知问注册',
		buttons : {
			'提交' : function () {
				alert('正在Ajax提交中...');
			},
			'取消' : function () {
				$(this).dialog('close');
			}
		},
		//position : 'left top',
		//width : 500,
		//height : 400,
		//minWidth : 300,
		//minHeight : 300
		//maxWidth : 700,
		//show : 'puff',
		//hide : 'puff',
		//autoOpen : false,
		//draggable : false,
		//resizable : false,
		modal : true,
		closeText : '关闭'
	});
	
	
	//$('#reg_a').click(function () {
	//	$('#reg').dialog('open');
	//});
	
});


























