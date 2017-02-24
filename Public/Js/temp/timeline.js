$(document).ready(function()
{			
		/**button代表”重新获取图标“按钮，点击发生如下动作*/
		$("button").click(function(){
						var i =  0;							
						var value = '';
						$("input[type=checkbox]:checked").each(function(){ //由于复选框一般选中的是多个,所以可以循环输出选中的值    
				
							if(i >= 1)
								value += ",";
								
							value += $( this ).val();
						
							i += 1;							
						});    
						
						if(i==0)
						{
							//$('#error_info').html("请选择一个或一个以上节点！").css('color','red').show();
							showErrInfo('#error_info', '请选择一个或一个以上节点！', 5000);
							return false;
						}
						
						var start_date = $("#start").val();
						var start_time = $("#start_time").val();
						var end_date = $("#end").val();
						var end_time = $("#end_time").val();
						
						var full_start_time = new Date(start_date+' '+start_time);
						var full_end_time = new Date(end_date+' ' +end_time);
						
						if(full_end_time - full_start_time <= 0)
						{
							showErrInfo('#error_info', '请设置合适的开始时间和结束时间！', 5000);
						}
						str = {"num":i, "nodes":value, "start_date":start_date, 
							"start_time":start_time, "end_date":end_date, "end_time":end_time};				
						$.post(
							ajax_url,
							str, 
							function(data){
								//alert(data);
								//showTimelineCharts("QPS", data, "timeline2");
								//updateChartXML("myChartId", data);
								updateChart(data);
							}, 
							"html"
						);
						str = "";
						i=0;
			});
					
			
			/**选择节点，显示流量情况*/
			$("input[name=all]").click(function(){
				//var inputs = $(this).parents('label').siblings().find('input');
				var inputs = $("input[type=checkbox]");
				$(this).prop('checked')?inputs.prop("checked",true): inputs.prop('checked', false);
			
			});
			
			$('input[level=2]').click(function(){
				var inputs = $(this).parents('dl').find('input');
			
				$(this).prop('checked')?inputs.attr('checked', 'checked'): inputs.removeAttr('checked');
			});
			
			var myDate = new Date();
			/**选择要展现数据的时间段*/
			 $( "#start" ).datepicker({
				  showOn: "button",
				  buttonImage: datepicker_image_url,
				  buttonImageOnly: true,
				  changeMonth: true,
				  changeYear: true,
				 
				  dateFormat: "yy-mm-dd"
			});
			/*alert(myDate.toLocaleDateString('zh-CN'));
			//var date = myDate.getFullYear()+'-'+myDate.getMonth();
			
			
			//$('#start').datepicker("setDate", date);
			*/		
			$('#start_time').timepicker();
			var past_one_hour = new Date(myDate-60*60*1000);
			//$('#start').datepicker("setDate", past_one_hour.toLocaleDateString());
			
			var month = past_one_hour.getMonth() + 1;
			var month = month<10?'0'+month:month;
			var tian = past_one_hour.getDate() < 10 ? '0'+past_one_hour.getDate(): past_one_hour.getDate();
			var date = past_one_hour.getFullYear()+'-'+month + '-' + tian;
			//alert(date);
			$('#start').val(date);
			
			//$('#start_time').timepicker('setTime', past_one_hour.getHours()+":"+past_one_hour.getMinutes());
			var minute = past_one_hour.getMinutes()<10?'0'+past_one_hour.getMinutes():past_one_hour.getMinutes();
			$('#start_time').val(past_one_hour.getHours()+":"+minute);
			
			$( "#end" ).datepicker({
				  showOn: "button",
				  changeMonth: true,
				  changeYear: true,
				  buttonImage: datepicker_image_url,
				  buttonImageOnly: true,
				  dateFormat: "yy-mm-dd",
			});
			//$('#end').datepicker("setDate", past_one_hour.toLocaleDateString());
			//$('#end').val(myDate.toLocaleDateString());
			var month = myDate.getMonth()+1;
			var month = month <10?'0'+month:month;
			var tian = myDate.getDate() < 10 ? '0'+myDate.getDate(): myDate.getDate();
			var date = myDate.getFullYear()+'-'+month + '-' + tian;
			
			$('#end').val(date);
			$('#end_time').timepicker();
			minute = myDate.getMinutes()<10?'0'+myDate.getMinutes():myDate.getMinutes();
			$('#end_time').val(myDate.getHours()+":"+minute);

			
			if(nodeid == 0)
			{
				//$('#error_info').html("请选择一个或一个以上节点！").css('color','red').hide('normal');
				$('#error_info').html("请选择一个或一个以上节点！").css('color','red').show();
				setTimeout(function(){
					$('#error_info').hide();

					}, 3000);
			}

			/**加载flash。有数据才加载，否则不加载*/
			//if(dns_data)
				showTimelineCharts("QPS", dns_data, "timeline");


});	
function showErrInfo(where, info, howLong)
{
	if(howLong = "")
	{
		howLong =3000;
	}
	//alert(howLong);
	var len = parseInt(howLong);
	$(where).html(info).css('color','red').show();
	setTimeout(function(){
			$(where).hide();
	}, 3000);
}
/**将DNS数据显示成flash动画*/	
function showTimelineCharts(caption, xmldata, tag){
			var myChart6 = new FusionCharts(flash_url, "myChartId", "600", "480");

			myChart6.setXMLData(xmldata); 
			myChart6.render(tag);
}

function updateChart(data){    
            //updateChartXML(domId,data);   
            var chartReference = FusionCharts("myChartId");
            chartReference.setXMLData(data);   			
} 