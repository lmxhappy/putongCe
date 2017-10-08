/***2017.7.2*/
var choiceWindowSec = 20; 
var choiceWindowTime = choiceWindowSec * 1000; 
var soundFile = "/Data/8858_clip.mp3";
var paramUrl =  "/Index/Speed/testResult";
var choice = []
var lastIdx = 0;

/****================================*/
function endUp()
{
	console.log("20s已经过去了");

//	$("#numbers").hide();
     $('#numbers').find('td').unbind("click"); //移除click

	$('#numbers').find('td').dblclick(function(){
		
                $(this).siblings().css("border-right", "0px none rgb(51, 51, 51)");
                $(this).css("border-right", "1px solid black");
		numberid = $(this).attr("numberid");
		lastIdx = numberid;
		console.log(numberid);
		
	});
	curSec();

	var id = $("#id").html();
	console.log(id);
	var data = {"id":id,"lastIdx":lastIdx,"choice":JSON.stringify(choice)};
	console.log(data);
	$.ajax({
		type: 'POST',
		url:paramUrl,
		data:data,
		success:function(data){
			console.log(data);
		},
		dataType:'json'
	});
	console.log(location.href);
	$("#begin").show();
	if(location.href.indexOf("times") > 0)
	{
		//location.href="/Index/Speed/thanks";
		$("#begin").children("a").attr("href", "/Index/Speed/thanks");
		$("#begin").children("a").html("点击结束");
		//console.log("jump");
		//$("#begin").children("a").attr("href", "Index/Speed/option");
	}else{
		$("#begin").children("a").attr("href", "/Index/Speed/option/times");
	}
	
}

function sound(){

	playSound(soundFile);
}

/**测试时间倒计时**/
function tests()
{
	curSec();
	$("#target").show();
}

/**真的开始试验了*/
function continueAction()
{
	console.log("in continueAction");
	$("#target").hide();

	curSec();

	$("#numbers").show();
		

	//判断时间timer开启
//	wait(choiceWindowTime).done(endUp);

	//wait(18*1000).done(sound);

}
	
$(function(){
		/**选择数字*/
	$('#numbers').find('td').click(function(){
			var num = $(this).html();
			$(this).css("text-decoration", "line-through");
			
			//就是给出随机数字数组的偏移量
			var numberId = $(this).attr('numberId');
			console.log(numberId);
			
			//防止多次点击，多次存入
			var ret = $.inArray(numberId, choice);
			console.log(ret);
			//不在，才插入
			if(ret == -1)
				choice.push(numberId);
			console.log(choice);
			
	}); 

	curSec();
		
	setTimeout(sound,18000);

	//判断时间timer开启
	wait(choiceWindowTime)
				.done(endUp);
	
});
