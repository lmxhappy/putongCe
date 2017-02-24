
/////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////用户可能要自己输入的参数
/**各个阶段的时间，包括准备时间、图形闪烁时间等*/

var interTime=1000;

/**每张图片显示的时长*/
var targetInterTime=66;

/**留给用户选择的时间*/
//var choiceWindowTime=10000;
var choiceWindowTime=3000;

/**加号显示的时间*/
var prepareTime=2000;

/**准备时间，就是+号显示的时长*/
//var testNum=10;
var testNum = 3;
var heartShapeRate = 0.5;


$(function(){
			/**获取url里的参数id*/
			
	/*
			var id ="{:I('get.id')}";
			var params = "{:I('get')}";
			console.log(params);
			console.log(id);
	*/
			
			//alert(id);
	$.ajax({
		url:paramUrl,
		data:{"id":id},
		success:function(data){
			console.log(data);
					
			setTestVars(data);
			
			introduce();
		},
		error:function(){
					alert('error');
		},
		dataType:'json'
	});
			
});
	
function setTestVars(data)
{
			if(!data)
				return;
				
			//data.userName
			if(data.imgTime)
				targetInterTime =parseInt(data.imgTime);
			
			if(data.plusTime)
				prepareTime = parseInt(data.plusTime);

			if(data.heartPercent)
				heartShapeRate = parseInt(data.heartPercent);
			
			if(data.userTime)
				choiceWindowTime = parseInt(data.userTime);
			
			if(data.testNum)
			{
				testNum = parseInt(data.testNum);
				console.log(testNum);
			}
}