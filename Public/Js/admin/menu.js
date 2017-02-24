$(function(){
		$("#new").click(function(){
				//alert();
				$("#newUrl").show();
				$("#newUrl").siblings().hide();
		});
		$("#testResult").click(function(){
				//alert();
				$("#resultContent").show();
				$("#resultContent").siblings().hide();
		});	
				
		$("#userList").click(function(){
				//alert();
				$("#user").show();
				$("#user").siblings().hide();
				//console.log($("#user").siblings());
		});
			
		$("#newuser").click(function(){
				//alert();
				$("#oneNewUser").show();
				$("#oneNewUser").siblings().hide();
				//console.log($("#user").siblings());
		});
			
		$(".newTest").click(function(){
			var username = $(this).attr('username');
			//alert(username);
				$("#newUrl").show();
				$("#newUrl").siblings().hide();
				
				
				$("input[name=userName]").val(username);
		});
	
});	
		