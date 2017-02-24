	

$(function(){
	
			/**如果用户的url里没有id信息，那么用户就需要获取新的url，通过输入姓名或者用户id（用户邀请码）**/
            var validate = $("#urlform").validate({
                debug: false, //调试模式取消submit的默认提交功能   
                //errorClass: "label.error", //默认为错误的样式类为：error   
                focusInvalid: true, //当为false时，验证无效时，没有焦点响应  
                onkeyup: false,   
				
                submitHandler: function(form){  //表单提交句柄,为一回调函数，带一个参数：form   
                   //$(form).submit();
				   var username = $("input[name=username]").val();
				  // var testid = $("input[name=testid]").val();

				   
				   //var ulr ="$(GROUP_NAME)/Link/index";
				   var id = 0;
				   $.post(
						"/Index/Index/getId",
						{ "username": username}, 
						function( data ) {
							console.log( data ); // John
						
							id = data.id;
							if(!id)
							{
								console.log('invalid');
								$("#info span").html("您尚未登记，请联系工作人员！")
								return;
							}else
							{
								$("#info span").html("")
							}
							
							
							var url = createTestUrl(id);
							console.log(url);
								
							$("input[name=url]").val(url);
						
							$('#jump').show();
							$('#jump').attr("href", url);
						}, 
						"json"
				   );
				   //alert(plusTime);
                },   
                //success:
                rules:{
                    username:{
                        required:true
                    }
				},
                messages:{
					username:{
                        required:"<font color='red'>必填</font>"
					}				
                }
                          
            });    
    
});
function createTestUrl(id)
{
	return testurl+'s_'+id;
}
