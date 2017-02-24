	$(document).ready(function(){	
		//判断	
		$("#register").validate({
			rules: {
				   user: "required",
				   email: {
					required: true,
					email: true
				   },
				   pwd: {
					required: true,
					minlength: 6
				   },
				   repwd: {
					required: true,
					equalTo: "#pwd"
				   },
				   code: {
						required: true,
						rangelength: [4,4],
				   }				  
		   },
		   messages: {
			   user: "请输入用户名",
			   email: {
					required: "请输入email地址",
					email: "请输入正确的email地址"
			   },
			   pwd: {
					required: "请输入密码",
					minlength: jQuery.format("密码不能小于{0}个字符")
			   },
			   repwd: {
					required: "请输入确认密码",
					equalTo: "两次输入密码不一致"
			   },
			   code: {
					required: "请输入验证码",
					rangelength: "验证码输入错误!验证码长度是4",
			   }
		  }
		});
		
				//判断	
		$("form :input[name='user']").blur(function(){
			if(this.value.length == 0)
			{
				return;
			}
			data = {'username':this.value};
			
			$.ajax({
				type: 'POST',
				url: ajax_url,
				data: data, 
				success: function(data)
				{
					if(data == 0)
					{
						alert("不能注册");
						var hdw1 = $('<label for="pwd" class="error">该用户名已被注册！</label>');
						$("form :input[name='user']").after(hdw1);
						//$("form :input[name='user']").parent().append(hdw1);						
					}
				},
				error: function(){
						alert('Error loading XML document');
				},
				dataType: "html"
			});
		});
		
		$("form :input[name='user']").click(function(){
			$(this).siblings('.error').remove();
		});
	});	