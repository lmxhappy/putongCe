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
		
		if(id==0)
		{
			showErrInfo('#error_info', "请选择一个节点！", 3000);
		}
		
});

function replaceStr(str)
{
		str = str.replace(/&lt;/g,"<");
		str = str.replace(/&gt;/g,">");
		str = str.replace(/&#039;/g,"'");
	
		return str;
}

/**
		model:"Charts/Pie2D.swf", tag
*/
function showChart(model, title, tag, data){
			var myChart = new FusionCharts(model, "myChartId1", "600", "480");
			
			myChart.setDataXML(replaceStr(data)); 
			myChart.render(tag);
}
		
/**重新加载按钮点击后加载函数*/
function reloadPage()
{
	  //window.location.reload()
	// window.location.replace("http://218.241.118.136:1224/monitor2.php?site=ISC")
	var date = $('#date').val();
	var time = $('#time').val();

	 window.location.replace(reload_url2+'?date='+date+'&time='+time);
}

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

