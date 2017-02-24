$(function(){
		
		/**选择要展现数据的时间段**/
		/*
		$( "#date" ).datepicker({
				  showOn: "button",
				  buttonImage: datepicker_image_url,
				  buttonImageOnly: true,
				  changeMonth: true,
				  changeYear: true,
				 
				  dateFormat: "yy-mm-dd"
		});
		*/	
		$( "#date" ).datepicker({
				  changeMonth: true,
				  changeYear: true,
		});
		
		
		$('#time').timepicker();
		
	
});

