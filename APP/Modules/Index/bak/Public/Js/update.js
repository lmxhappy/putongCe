
		var id = {$id};
		function update()
		 {	
			var da = {"id": id };
				
			$.post(
				"{:U(GROUP_NAME.'/Index/Show/getUpdateTime')}", 
				da,
				function(data){
			
					$.each(data.nodes, function(key, value)
					{
						if(key =="time")
						{
							//alert(key+":"+value);
						
							document.getElementById("info_update_time").innerHTML = value;
						}
					});
					
				}, 
				"json"
			);
			
		  }
		 setInterval("update()",5000);
