	/*增加marker点*/
	function addMakerPoint(lng, lat, name, cname,id, time, url)
	{
				/*
				var myIcon = new BMap.Icon(url, new BMap.Size(19, 25), {
					offset: new BMap.Size(0, 0), // 指定定位位置
					imageOffset: new BMap.Size(0,0) // 设置图片偏移
				});
				*/
	
				var  p = new BMap.Point(lng, lat);
				var marker = new BMap.Marker(p), px = map.pointToPixel(p);
				//var htm = '<div><a href="http://localhost/www/monitor.php?site=beijing"></a></div>';
				//marker.setContent(htm);
				var url = url + '?site=' + name + '&update_time='+time+'&nodeid='+id;
				
				var sContent =  '<div id="node' +id+ '"><h4 style="margin:0 0 5px 0;padding:0.2em 0">'+cname+'(第'+id+'号节点)</h4>'+
					'<div style="margin:0;line-height:1.5;font-size:13px;text-indent:2em"><a href="'+url+'" target="_blank">'+ cname + '安全状态</a></div></div>';
				
				sContent += '<div>更新时间：<div id="map_update_time'+id+'">'+ time+ '</div></div>';
				
				var opts = {
				  width : 200,     // 信息窗口宽度
				  height: 100,     // 信息窗口高度
				  //title : "海底捞王府井店" , // 信息窗口标题
				  enableMessage:false,//设置允许信息窗发送短息
				  message:"亲耐滴，晚上一起吃个饭吧？戳下面的链接看下地址喔~"
				}
				var infoWindow = new BMap.InfoWindow(sContent, opts);  // 创建信息窗口对象

				map.addOverlay(marker);
				marker.enableDragging(true); // 设置标注可拖拽
				marker.addEventListener("dragend", function(e){
					var edited = '"coordinate":["' + e.point.lng + '", "' +  e.point.lat + '"]';
					$("#dialog-form").dialog("open");
					$("#position").text(edited);

				})
				//marker.addEventListener("ondblclick", function(e) { 
					//alert(e.type);  
				//});
				marker.addEventListener("click", function(){          
						   this.openInfoWindow(infoWindow);
					   //图片加载完毕重绘infowindow
				})
				
				marker.addEventListener("onmouseover", function(){          
						   this.openInfoWindow(infoWindow);
					   //图片加载完毕重绘infowindow
				})
				
				/*marker.addEventListener("onmouseout", function(){          
						   this.closeInfoWindow(infoWindow);
					   //图片加载完毕重绘infowindow
				})*/
				/*marker.addEventListener("rightclick", function(){
					map.removeOverlay(marker);
				});*/
				addmarkermenu(marker, id);
	}
	function setcenter(lng, lat)
	{
		map.setCenter(lng, lat);
	}
	/*增加marker餐单*/
	function addmarkermenu(marker, id)
	{
		var contextMenu2 = new BMap.ContextMenu();
		var txtMenuItem2 = [
		  {
		   text:'移除该标注',
		   callback:function(){
			map.removeOverlay(marker);
			data='{"operate":"delete", "number":"' + id + '"}';

			$.post(
				"node.php",	
				data,
				function(data){
					alert('删除成功！'+data);
					//jQuery('#dialog-form').dialog('close');
					//alert(data);
				},
				"html"
			);

		   }
		  }
		 ];


		 for(var i=0; i < txtMenuItem2.length; i++){
		  contextMenu2.addItem(new BMap.MenuItem(txtMenuItem2[i].text,txtMenuItem2[i].callback,100));
		  if(i==1 || i==3) {
		   contextMenu2.addSeparator();
		  }
		 }
		 marker.addContextMenu(contextMenu2);
	}
	
	$(document).ready(function(){
		/**左边面板隐藏*/
		//alert($('#panelCtrl'));
		$('#panelCtrl').click(function(){
			var left = $('#leftside').css('margin-left');
			//alert(left);
			if(left == "0px")
			{
				$(this).addClass('open');
				var width= 0 - parseInt($('#leftside').width());
				$('#leftside').animate({"margin-left":width});
			}
			else
			{
				//alert('else');
				$(this).removeClass('open');
				$('#leftside').animate({"margin-left":"0px"});
			}
		});
		/*
		$('#panelCtrlButton').click(function(){
			alert('button');
			$('#panelCtrl').removeClass('open');
			
			$('#leftside').animate({"margin-left":"0px"});
		});
		*/
	});