$(document).ready(function(){
	$("#store").click(function(){
		var name = $("input[name=name]").val();
		var cname = $("input[name=cname]").val();
		var number = $("#number").val();
		var addr = $("#ipaddr").val();
		
		var data = '{"operate":"add", "name":"' + name + '", "cname":"' + cname + '", "number":"' + number + '", "ipaddr":"' + addr + '"';
		//alert(data);
		var coordinate =  $("#position").text();
		//alert(coordinate);
		if(coordinate != "")
		{
			data += ', ' + coordinate + '}';
		}
		else
		{
			data += '}';
		}
		//alert(data);
		if(cname=="" || name =="" || addr=="")
		{
			if(cname == "")
				$("#login-info").text("请填写中文名");
			if(name == "")
				$("#login-info").text("请填写英文名");
			if(addr == "")
				$("#login-info").text("请填写IP地址");
				
			$("#login-info").show();
		}
		else
		{
			$("#login-info").hide();
			$.post(
				"node.php",	
				data,
				function(data){
					if(data== "ok")
					{
						$('#dialog-form').dialog('close');
						alert("保存成功！");
						//jQuery('#dialog-form').dialog('close');
						//alert(data);
					}
					else
					{
						$("#login-info").text(data);
					}
				},
				"html"
			);
		}
	});
	

	
	$("#doLogin").click(function(){
		$("#login-form").dialog({
		  height: 300,
		  width: 350,
		  modal: true,
		  autoOpen: false,
		  modal: true,
		  open: function(){
				jQuery('.ui-widget-overlay').bind('click',function(){
					$(this).dialog('close');
				})
			}
		});
		
		 $("#login-form").dialog("open");
	});

	$(".info-box").mouseover(function(){
		$(this).addClass("rfocus");

	});
	$(".info-box").mouseout(function(){
		$(this).removeClass("rfocus");

	});
		
	$(".info-box").click(function(){
		var name = $(this).attr("name");
		var arr = name.split("|");
		var lng = arr[0];
		var lat = arr[1];
		
		setcenter(lng, lat);
	});
	
	$("#doexit").click(function(){
	/*	<br />
<b>Warning</b>:  session_destroy(): Trying to destroy uninitialized session in <b>/home/mingxing/httpd-2.4.1/htdocs/index.php</b> on line <b>133</b><br />
*/	});
});