/**时间相关的**/

function curSec()
{
	var myDate = new Date();
	var hour = myDate.getHours(); //获取当前小时数(0-23)
	var min = myDate.getMinutes(); //获取当前分钟数(0-59)
	var sec = myDate.getSeconds(); //获取当前秒数(0-59)搜索
	
	var cur = hour + ":"+ min + ":" +sec;
	console.log("cur time:"+cur);
	
	return cur;
}