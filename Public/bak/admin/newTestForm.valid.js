	

$(function(){
            var validate = $("#newTestForm").validate({
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
                    subjectUserName:{
                        required:true
                    },
					datepicker:{
                        required:true,
						number: true,
						date:true,
                    },
					email:{
                        required:true,
						email: true,
                    },
					phone:{
                        required:true,
						number: true,
						range:[8,13]
                    },
					desc:{
                        required:true
                    }
				},
                messages:{
				subjectUserName:{
                        required:"<font color='red'>必填</font>"
					},
					datepicker:{
                        required:"<font color='red'>必填</font>",
						date: "<font color='red'>必须为日期</font>",
					},
					email:{
                        required:"<font color='red'>必填</font>",
					//	number: "<font color='red'>必须为数字</font>",
						email: "<font color='red'>请输入一个有效的邮箱，以方便联系您</font>",
						range:"<font color='red'>输入0到100之间的数字</font>"
					},
					phone:{
                        required:"<font color='red'>必填</font>",
						number: "<font color='red'>请输入一个有效的电话号码</font>",
						range:"<font color='red'>请输入一个真实有效的电话号码</font>"
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
				   var testName = $("input[name=testName]").val();
				    /*
				   var man = $("input[name=man]").val();
				   var woman = $("input[name=woman]").val();
				   var age = $("input[name=age]").val();
				   var birth = $("input[name=birth]").val();
				   var email = $("input[name=email]").val();
				   var phone = $("input[name=phone]").val();
				   */
				   
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
						"/Admin/Index/createTestUser",
						 { "testName": testName,   'desc':desc },
						function( data ) {
							console.log( data ); // John
							//alert();
							//return false;
							//var ret = parseInt(data);
							//console.log(ret);
								console.log('success');
							var update = data.update;
							var add = data.add;
								if(Boolean(add))
								{
									$('#user-info').html("新实验创建成功！");
								}
								if(Boolean(update))
								{
									$('#user-info').html("实验信息已经更新成功！");
								}
						}, 
						"json"
				   );
}
