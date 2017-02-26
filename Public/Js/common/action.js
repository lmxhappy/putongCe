	//下一步
	$('#nextStep').click(function(){
		$('#introduce').hide();
		requestFullScreen();
		
		$("#begin").show(5000);
	});
	
	//开始
	$('#start').click(function(){
		$('#introduce').hide();
		//requestFullScreen();
		$('#begin').hide();
		
		tests();
	});
	
	//返回
	$("#back").click(function(){
		$('#introduce').show();
		$("#begin").hide();
	})