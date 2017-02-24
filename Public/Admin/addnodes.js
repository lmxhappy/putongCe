	

$(function(){
            var validate = $("#myform").validate({
                debug: false, //调试模式取消submit的默认提交功能   
                //errorClass: "label.error", //默认为错误的样式类为：error   
                focusInvalid: true, //当为false时，验证无效时，没有焦点响应  
                onkeyup: false,   
				
                submitHandler: function(form){   //表单提交句柄,为一回调函数，带一个参数：form   
                   //$(form).submit();
				   var plusTime = $("input[name=plusTime]").val();
				   var imgTime = $("input[name=imgTime]").val();
				   var testNum = $("input[name=testNum]").val();
				   var heartPercent = $("input[name=heartPercent]").val();
				   var userTime = $("input[name=userTime]").val();
				   var userName = $("input[name=userName]").val();
				   
				   //var ulr ="$(GROUP_NAME)/Link/index";
				   var id = 0;
				   $.post(
						"/Admin/Link/index",
						{ plusTime: plusTime, imgTime:imgTime, testNum:testNum, heartPercent:heartPercent, userTime:userTime, userName:userName}, 
						function( data ) {
							console.log( data ); // John
							id = data.id;
							if(!id)
								console.log('invalid');
							else
							{
								var url = createTestUrl(id);
								console.log(url);
								
								$("input[name=url]").val(url);
							}

						}, 
						"json"
				   );
				   //alert(plusTime);
                },   
                //success:
                rules:{
                    plusTime:{
                        required:true,
						number: true,
						min:10
                    },
					imgTime:{
						required:true,
						number: true,
						min:10
					},
					testNum:{
						required:true,
						number: true,
						min:10
					},
					heartPercent:{
						required:true,
						number: true,
						range:[0,100]
					},
                    userTime:{
						required:true,
						number: true,
						min:10
					},
                    userName:{
                        required:true
                    }                    
                },
                messages:{
					plusTime:{
                        required:"<font color='red'>必填</font>",
						number: "<font color='red'>必须为数字</font>",
						min:"<font color='red'>数字太小</font>",
					},
					imgTime:{
                        required:"<font color='red'>必填</font>",
						number: "<font color='red'>必须为数字</font>",
						min:"<font color='red'>数字太小</font>",

					},
					testNum:{
                        required:"<font color='red'>必填</font>",
						number: "<font color='red'>必须为数字</font>",
						min:"<font color='red'>数字太小</font>",
					},
					heartPercent:{
                        required:"<font color='red'>必填</font>",
						number: "<font color='red'>必须为数字</font>",
						range:"<font color='red'>输入0到100之间的数字</font>",
					},
                    userTime:{
                        required:"<font color='red'>必填</font>",
						number: "<font color='red'>必须为数字</font>",
						min:"<font color='red'>数字太小</font>",
					},
                    userName:{
                        required:"<font color='red'>必填</font>"
                    }  					
                }
                          
            });    
    
});

function createTestUrl(id)
{
	return testurl+'s_'+id;
}