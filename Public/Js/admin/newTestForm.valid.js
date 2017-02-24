	

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
					desc:{
                        required:true
                    }
				},
                messages:{
				subjectUserName:{
                        required:"<font color='red'>必填</font>"
					},
					
					desc:{
                        required:"<font color='red'>必填</font>"
					}					
                }
                          
            });    
			
			
			
	$('#btn-create').click(function(){
		createNewTest();
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

function createNewTest()
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
 
				   
				   $.post(
						"/Admin/Index/createNewTest",
						 { "name": testName,   'desc':desc },
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
