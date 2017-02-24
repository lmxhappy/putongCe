$(document).ready(function()
{			
				var str = '';
				$("select" ).change(function () {
					var i =  0;
					str = '{"num":';
					var value = '';
					$("input[type=checkbox]").each(function() {
						if(i >= 1)
							value += ",";
							
						value += $( this ).val();
					
						i += 1;
					});
					str += '"'+i+'", "values":"'+value+'"}';
					//$( "#temp" ).text( str );
					
					$.post(
						"ajax_get_xml_data.php",
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

				  })
				  .change();
				  

					//alert($("button").length);
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
							$('#error_info').html("请选择一个或一个以上节点！");
							return false;
						}
						str = {"num":i, "nodes":value};
						//$( "#temp" ).text( str );
						
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
					

});		
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