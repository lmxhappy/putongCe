$(function () {

			//$("#dialog-form").dialog("");
				var map = new BMap.Map("dituContent");          // 创建地图实例
				var point = new BMap.Point(0, 0);  // 创建点坐标
				map.centerAndZoom(point, 3);  





				function addMakerPoint(lng, lat, name, cname,id, time)
{
			/*var myIcon = new BMap.Icon("http://api.map.baidu.com/img/markers.png", new BMap.Size(23, 25), {
				offset: new BMap.Size(10, 25), // 指定定位位置
				imageOffset: new BMap.Size(0, 0 - index * 25) // 设置图片偏移
			});
			*/
			var  p = new BMap.Point(lng, lat);
			var marker = new BMap.Marker(p), px = map.pointToPixel(p);
			//var htm = '<div><a href="http://localhost/www/monitor.php?site=beijing"></a></div>';
			//marker.setContent(htm);
			var url = 'monitor2.php?site=' + name + '&update_time='+time+'&nodeid='+id;
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
			
				/*$.post(
					"coordinate.php",	edited,
					function(data){
						alert(data);
					},
					"html");*/
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
});