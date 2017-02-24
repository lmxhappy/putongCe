
/***等待时间，等待timeout。相当于sleep timeout。*/
var wait = function(timeout){
	var dtd = $.Deferred(); // 新建一个deferred对象

	var tasks = function(){
					//alert("执行完毕！");
					console.log("执行完毕！开始下一轮测试。");
					dtd.resolve(); // 改变deferred对象的执行状态
	};
	setTimeout(tasks,timeout);
			
	/**必须返回dtd，以后面的链式执行。*/
	return dtd;
};


		
function sleep(milliseconds) {
		  var start = new Date().getTime();
		  for (var i = 0; i < 1e7; i++) {
			if ((new Date().getTime() - start) > milliseconds){
			  break;
			}
		  }
}