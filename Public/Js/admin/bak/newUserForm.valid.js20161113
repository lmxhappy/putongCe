	

$(function(){
            var validate = $("#newUserForm").validate({
                debug: false, //调试模式取消submit的默认提交功能   
                //errorClass: "label.error", //默认为错误的样式类为：error   
                focusInvalid: true, //当为false时，验证无效时，没有焦点响应  
                onkeyup: false,   
				
                submitHandler: function(form){  //表单提交句柄,为一回调函数，带一个参数：form   
                   //$(form).submit();
				   // form.submit();  


				   //alert(plusTime);
                },   
                //success:
                rules:{
                    userName:{
                        required:true
                    },
					age:{
                        required:true,
						number: true,
						range:[0,100]
                    },
					desc:{
                        required:true
                    }
				},
                messages:{
					userName:{
                        required:"<font color='red'>必填</font>"
					},
					age:{
                        required:"<font color='red'>必填</font>",
						number: "<font color='red'>必须为数字</font>",
						range:"<font color='red'>输入0到100之间的数字</font>"
					},
					desc:{
                        required:"<font color='red'>必填</font>"
					}					
                }
                          
            });    
			
			
			
	$('#btn-create').click(function(){
		createNewUser();
	});
	
	
	/*
	$(".form_datetime").datetimepicker({
			format: "dd MM yyyy - hh:ii"
	});

    */
});
function createTestUrl(id)
{
	return testurl+'s_'+id;
}

function createNewUser()
{
				   var userName = $("input[name=subject-userName]").val();
				   var man = $("input[name=man]").val();
				   var woman = $("input[name=woman]").val();
				   var age = $("input[name=age]").val();
				   var desc = $("#desc").val();
				  // var testid = $("input[name=testid]").val();
				 // alert();
				  //var data = { "username": username, 'sex':sex, 'age':age, 'desc':desc};
				  //alert();
				 // console.log(data);

					var sex = 1;
					if(woman)
						sex = 2;
				   //var ulr ="$(GROUP_NAME)/Link/index";
				   var id = 0;
				   
				   $.post(
						"/Admin/Index/createNewUser",
						 { "username": userName, 'sex':sex, 'age':age, 'desc':desc},
						function( data ) {
							console.log( data ); // John
							//alert();
							//return false;
							var ret = parseInt(data);
							console.log(ret);
							if(ret > 0)
							{
								console.log('success');
								$('#user-info').html("恭喜！用户创建成功！");
							}
							else
							{
								$('#user-info').html("用户已经存在，所有参数跟您当前设置一样！");
							}
						}, 
						"json"
				   );
}