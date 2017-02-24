$(document).ready(function(){
		
		/**选择要展现数据的时间段**/
		$( "#date" ).datepicker({
				  showOn: "button",
				  buttonImage: datepicker_image_url,
				  buttonImageOnly: true,
				  changeMonth: true,
				  changeYear: true,
				 
				  dateFormat: "yy-mm-dd"
		});
			
		if(lastest_time)
		{
			var arr = lastest_time.split(' ');
		
			//$('#date').datepicker("setDate", arr[0]);
			
			$('#date').val(arr[0]);
			
			var array = arr[1].split(':');
			$('#time').val(array[0]+':'+array[1]);	
		}
		
		$('#time').timepicker();
		$('#info_update_time').click(function(){
			window.location.replace(reload_url2);
		});
		/*
		if(id==0)
		{
			showErrInfo('#error_info', "请选择一个节点！", 3000);
		}*/
		
});

