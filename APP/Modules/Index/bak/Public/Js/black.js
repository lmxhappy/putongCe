$(function() {
			$( "input[type=submit], a" )
			  .button()
			  .click(function( event ) {
					var ipaddr =  $("input[name=black]").val();
					//alert(ipaddr);
					$('#blacklist').dataTable().fnDestroy();
					$('#blacklist').dataTable(
					{
						bServerSide: true,
						bProcessing:true,
						bPaginate:true,
						//bSearchable:true,
						"sPaginationType": "full_numbers",
						"sAjaxSource": ajax_url,
						bSort: true,
						 "sServerMethod": "POST",
						"fnServerParams": function ( aoData ) {
							aoData.push( { "name":"ipaddr", "value": ipaddr } );
						}
					});
			  });
		  });
		  
		  
		$(document).ready(function() {
			$('#blacklist').dataTable(
			{
				bServerSide: true,
				bProcessing:true,
				bPaginate:true,
				bSearchable:true,
				"bFilter":true,//是否出现过滤框，搜索栏  
				"bAutoWidth": true,
				"sPaginationType": "full_numbers",
				 "sServerMethod": "POST",
				
				"sAjaxSource": ajax_url,
				bSort: true,
			//	"iDeferLoading": 57
			   "oLanguage": {   
					"sLengthMenu": "每页显示 _MENU_ 条记录",   
					"sZeroRecords": "对不起，查询不到任何相关数据",   
					"sInfo": "当前显示 _START_ 到 _END_ 条，共 _TOTAL_ 条记录。",   
					"sInfoEmpty": "找不到相关数据",   
					"sInfoFiltered": "（数据表中共为 _MAX_ 条记录）",   
					"sProcessing": "正在加载中...",   
					"sSearch": "搜索",   
					"sUrl": "", //多语言配置文件，可将oLanguage的设置放在一个txt文件中，例：Javascript/datatable/dtCH.txt   
					"oPaginate": {   
						"sFirst": "第一页",   
						"sPrevious": " 上一页 ",   
						"sNext": " 下一页 ",   
						"sLast": " 最后一页 "  
					}   
				}, //多语言配置 
			});
} );
