$(function () {
	
	//登录页背景随机
	var rand = Math.floor(Math.random() * 5) + 1;
	$('body')
	.css('background','url(' + ThinkPHP['IMG'] + '/login_bg' + rand + '.jpg) no-repeat')
	.css('background-size', '100%');
	
	
});