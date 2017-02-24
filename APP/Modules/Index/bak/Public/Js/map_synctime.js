	function update()
	 {	
		$.post(
			synctime_url, 
			function(data){
				if(data)
				{		
					//$.each(data.nodes, function(key, value)
					$.each(data, function(key, value)
					{
						var ele = document.getElementById("update_time"+ value.id);
						
						if(ele != null)
						{
							if(ele.innerHTML != value.create_time)
							{
								//alert(value.create_time);
								document.getElementById("update_time"+ value.id).innerHTML = value.create_time;
								//document.getElementById("update_time"+ value.id).innerHTML = 1;	
							
							}
						}
					});
				}
			}, 
			"json"
		);
		
	  }
	 setInterval("update()",5000);
	