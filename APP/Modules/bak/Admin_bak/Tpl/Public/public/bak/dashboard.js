jQuery(document).ready(function(){
		///// SIMPLE CHART /////		
		function showTooltip(x, y, contents) {
			jQuery('<div id="tooltip" class="tooltipflot">' + contents + '</div>').css( {
				position: 'absolute',
				background: '#fff',
				padding: '3px 10px',
				display: 'none',
				top: y + 5,
				left: x + 5
			}).appendTo("body").fadeIn(200);
		}
	
		if(jQuery('#chartplace').length > 0){
		var plot = jQuery.plot(jQuery("#chartplace"),
			   [ { data: pvs, label: "总访问数", color: "#069"}, { data: sec, label: "恶意访问数", color: "#FF6600"} ], {
				   series: {
					   lines: { show: true, fill: true, fillColor: { colors: [ { opacity: 0.05 }, { opacity: 0.15 } ] } },
					   points: { show: true }
				   },
				   legend: { position: 'nw'},
				   grid: { hoverable: true, clickable: true, borderColor: '#ccc', borderWidth: 1, labelMargin: 10 },
				   yaxis: { min: 0, ticks: 10 },
				   xaxis: { ticks: 22 }
				 });
		
		var previousPoint = null;
		jQuery("#chartplace").bind("plothover", function (event, pos, item) {
			jQuery("#x").text(pos.x.toFixed(2));
			jQuery("#y").text(pos.y.toFixed(2));
			if(item) {
				if (previousPoint != item.dataIndex) {
					previousPoint = item.dataIndex;
						
					jQuery("#tooltip").remove();
					var x = item.datapoint[0],
					y = item.datapoint[1];
						
					showTooltip(item.pageX, item.pageY,
									item.series.label+ " "  + x + "时 ：" + y + "次");
				}
			
			} else {
			   jQuery("#tooltip").remove();
			   previousPoint = null;            
			}
		
		});
		
		jQuery("#chartplace").bind("plotclick", function (event, pos, item) {
			if (item) {
				plot.highlight(item.series, item.datapoint);
			}
		});
		
		/*****PIE GRAPH*****/
		jQuery.plot(jQuery("#bargraph"), div, 
		{
			series: {
				pie: { 
					show: true,
					radius:500,
					label: {
						show: false,
						formatter: function(label, series){
							return '<div style="font-size:8pt;text-align:center;padding:2px;color:white;">'+label+'<br/>'+Math.round(series.percent)+'%</div>';
						},
						threshold: 0.1
					}
				}
			},
			legend: {
				show: false
			},
	        grid: {
	            hoverable: true,
	            clickable: true
	        }

		});
		
		jQuery("#bargraph").bind("plothover", function (event, pos, item) {
			jQuery("#x").text(pos.x);
			jQuery("#y").text(pos.y);
			if(item) {
					jQuery("#tooltip").remove();
					percent = parseFloat(item.series.percent).toFixed(2);
					showTooltip(pos.pageX+10, pos.pageY+5,item.series.label+"(" + percent + "%)");
			} else {
			   jQuery("#tooltip").remove();
			   previousPoint = null;            
			}
		
		});
		}
		
		//下面显示日期列表的时间选择	
		var calendarEvents = {};
		var getEvents = function(month, year, thisurl, thisdom){
		    jQuery.ajax({
		        url: thisurl+'&year='+year+'&month='+month,
		        type: 'GET',
		        processdata: false,
		        success: function (data) { 
		            calendarEvents = eval("("+data+")");
		        },
		        error: function (xhr, ajaxOptions, thrownError) { 
		            jQuery(thisdom).datepicker("hide"); 
		        },
		        complete: function (x, y) { 
		            jQuery(thisdom).datepicker("refresh"); 
		        }
		    });
		};
		
		var dprender = function(thisurl, thisdom){ 
			if(jQuery(thisdom).length > 0){
				jQuery(thisdom).datepicker({ 
					dateFormat: 'yy-m-d',
					dayNamesMin: ['日', '一', '二', '三', '四', '五', '六'],
					monthNames:['一月','二月','三月','四月','五月','六月','七月','八月','九月','十月','十一月','十二月'],
					beforeShowDay:function(date) {
		                var day = date.getDate();
		                if (day in calendarEvents) {
		                    if (calendarEvents[day] == undefined) {
		                        return [true, 'isActive'];
		                    }
		                    return [true, 'isActive', calendarEvents[day]];
		                }
		                return [false, ''];
		            },
		            onChangeMonthYear: function (year, month, inst) {
		            	calendarEvents = {};
		              	getEvents(month, year, thisurl, thisdom); 
		            }
				 });
				 var calendarDate = jQuery(thisdom).datepicker("getDate");
				 getEvents(calendarDate.getMonth() + 1, calendarDate.getFullYear(), thisurl, thisdom);
			}
		};
		dprender('?c=visitmap&a=getdates', "#datepicker_home");	//这里渲染日期
		dprender('?c=visitmap&a=getdates', "#datepicker_map");	//这里渲染日期
		dprender('?c=badipmap&a=getdates', "#datepicker_badipmap");	//这里渲染日期


});
