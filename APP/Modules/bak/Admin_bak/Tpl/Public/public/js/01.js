$(function () {
				//$("#dialog-form").dialog("");
				var map = new BMap.Map("dituContent");          // 创建地图实例
				var point = new BMap.Point(0, 0);  // 创建点坐标
				map.centerAndZoom(point, 3);                 // 初始化地图，设置中心点坐标和地图级别
				//map.centerAndZoom("北京",4);
				//map.addControl(new BMap.NavigationControl());  //添加默认缩放平移控件
				map.addControl(new BMap.NavigationControl({anchor: BMAP_ANCHOR_TOP_RIGHT, type: BMAP_NAVIGATION_CONTROL_SMALL}));  //右上角，仅包含平移和缩放按钮
				//map.addControl(new BMap.NavigationControl({anchor: BMAP_ANCHOR_BOTTOM_LEFT, type: BMAP_NAVIGATION_CONTROL_PAN}));  //左下角，仅包含平移按钮
				//map.addControl(new BMap.NavigationControl({anchor: BMAP_ANCHOR_BOTTOM_RIGHT, type: BMAP_NAVIGATION_CONTROL_ZOOM}));  //右下角，仅包含缩放按钮
				map.enableScrollWheelZoom();    //启用滚轮放大缩小，默认禁用
				map.enableContinuousZoom();
				$("#mapname").attr("name", map);

				var contextMenu = new BMap.ContextMenu();
				var txtMenuItem = [
					  {
						   text:'放大',
						   callback:function(){map.zoomIn()}
					  },
					  {
						   text:'缩小',
						   callback:function(){map.zoomOut()}
					  },
					  {
						   text:'放置到最大级',
						   callback:function(){map.setZoom(18)}
					  },
					  {
					   text:'查看全国',
							callback:function(){map.setZoom(4)}
					  },
					  {
						   text:'在此添加标注',
						   callback:function(p){
							var marker = new BMap.Marker(p), px = map.pointToPixel(p);
							map.addOverlay(marker);
							marker.enableDragging(true); // 设置标注可拖拽
							marker.addEventListener("dragend", function(e){
									//alert("当前位置：" + e.point.lng + ", " + e.point.lat);
									edited = '"coordinate":["' + e.point.lng + '", "' +  e.point.lat + '"]';
									lport = e.point.lng;
									rport = e.point.lat
									//alert(edited);


									$('#dialog-form').dialog();
									//$("#dialog-form").dialog("open");
									//$("#dialog-form").dialog("");
									
									/*$('#dialog-form').dialog({
											show:true,
											hide:true,
											modal:true,
										});
									*/	
	
									//$("#position").text(edited);
									

									//打印出经纬度
									//alert(edited);
									
									
							

								})
							}
					  }
				 ];

				 for(var i=0; i < txtMenuItem.length; i++){
				  contextMenu.addItem(new BMap.MenuItem(txtMenuItem[i].text,txtMenuItem[i].callback,100));
				  if(i==1 || i==3) {
				   contextMenu.addSeparator();
				  }
				 }
				 map.addContextMenu(contextMenu);



	$("#store").click(function(){


		var name = $("input[name=name]").val();
		var cname = $("input[name=cname]").val();
		var id = $("input[id=id]").val();
		//var id = $("#id").val();
		var addr = $("#ipaddr").val();
		//alert(addr);
		//alert(id);
		//var coordinate = edited;
		var coorlport = lport;
		var coorrport = rport;
		
		//测试
		//alert(1);

	if(cname=="" || name =="" || addr=="")
			{
				if(cname == "")
					//$("#login-info").text("请填写中文名");
					alert("请填写中文名");
				if(name == "")
					alert("请填英文名");
				if(addr == "")
					alert("请填写ip地址");
					

	}else {

		
		$.post( ajax_url, 
			 {
		/*	 	
    	name:"Donald Duck",
    	city:"Duckburg"
    	*/
    	name: name, cname:cname,id:id,addr:addr,coorlport:coorlport, coorrport:coorrport
  			},
  			function(data,status){
  				 	alert("status:"+status);
  				  	 // alert("data:"+data);
  				  

  				  	  
  				  if(status== "success")
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
					
  			},"text");
	}

	//结束
	});

});