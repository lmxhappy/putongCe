/***此js是为了演示视觉判断能力
*2016.09.28
*Liu Mingxing
*/

/***需要的参数都定义在params里面。*/

//下面的数据包括要显示的图片名字（不包括后缀），元素是按序排列的，展示也是按此顺序的。这个变量可能会被调整。


//////////////////////////////////////////////////程序生成、使用的中间变量（参数）
//下面的数组是imgArr中图片的显示时间（毫秒）
var index=0;
var timer=null;
var intervalArr=[]
var isExist=0//F代表存在，J代表不存在。用1代表F，2代表J，0代表什么都没有选，或者选错了。
//var choiceTimeLen = -1;

var choiceWindowStartTime=null;//选择开始的时刻，绝对时间（毫秒）
var choiceTime=null;//选择的时刻，绝对时间（毫秒）
var haveChosen = false;

/**存有所有测试的结果*/
//var allResult = []
var allResult = new Array();
var testSeries = null;
//console.log(testSeries);


////////////////////////////////////////////////////////////////////////////////////////////////
/***/
$(function(){
	
	introduce();
	
	//$( "#tabs" ).tabs();
});




  
// usage example:  
//var a = ['a', 1, 'a', 2, '1'];  

function introduce(){
	$("#prepareTime").html(prepareTime);
}

/**整个测试，包括N轮测试，一次测试就是oneTest*/
function tests(){
	$('#start').hide();
	
	//interTime=intervalArr[0];
	//立马开始第一个index的显示
	$("#numbers").show();
}

/***将整个测试结果整体上传*/
function uploadWholeResult()
{
	console.log('enter func uploadWholeResult');
	
	console.log(allResult);
	//allResult.toJSON
	var jsonStr = JSON.stringify(allResult);
	console.log(jsonStr);
}


/***整个测试已经完全做完。做好清理工作。*/
function endWholeTest()
{
	console.log('测试已经结束，谢谢参与');
	clearInterval(timer);  
	
	uploadWholeResult();
	
	$("#end").show();
	
	exitFullscreen();
}