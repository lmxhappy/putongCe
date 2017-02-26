/***2017.2.26*/
var choiceWindowTime = 3 * 60 * 1000; 
/****================================*/
function endUp()
{
	console.log("三分钟已经过去了");
	$("#numbers").hide();
	$("#end").show();
	
	curSec();
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
		wait(choiceWindowTime)
				.done(endUp);
				
}
	
$(function(){
		/**选择数字*/
	$('#numbers').find('td').click(function(){
			//alert();
			var num = $(this).html();
			//alert(num);
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

	
	
});
