//正在做的single_task数
var job_count = 0;
//同时可以做的最大single_task数
var job_max = 2;
//检测是否全部的client都抓回数据，如果是，则消除定时器，停止抓取
var flag_stop = 0;
//检测地图是否抓取
var flag_map = 0;
//加载页面时启动定时器
var interval; 	//抓取定时器
var interval_fetch; //定期提示停止抓取
var interval_final; //整体页面超时时间
var interval_map; //地图定时器
var clicked = 0;
var suggest = "输入域名或IP地址"
function get_data(target, type) {
    $.post(
		ajax_url,
		{
			addr: domain,
			type: type
		}, 
		function (data, st) {
			//检测是否全部的client都抓回数据，如果是，则消除定时器，停止抓取
			flag_stop = 1;
			for (var key in client_status) {
				if (client_status[key] == 0) {
					flag_stop = 0;
					break;
				}
			}
			if (flag_stop == 1) {
				clearTimeout(interval);
				//clearTimeout(interval_fetch);
				//clearTimeout(interval_final);
			}
		});
}
function run() {
    //当抓取标记为真，则启动抓取
    interval = setInterval(get_data, 3E3);   // 3秒轮询抓数据
   // interval_fetch = setInterval(pop_modal, 1.2E4);   // 12秒弹窗是否继续
    //interval_final = setInterval(close_all, 4E4);   // 40秒结束全部
    //interval_map = setInterval(load_map, 2E3);   // 2秒轮训出图
}

/*向服务器发起多个post请求
@param items：包含
@param data：发送的数据
*/
function multi_post(items, data)
{
			/**为每种探测发送POST请求*/
		$.each(elements, function(ele, code){
			//alert(ele+code);
			str = {"type":1, "data":target, "code":code};
			$.post(
				ajax_url,
				str, 
				function(data){
					$("#loading").hide();
					
					if(data == NULL)
						return;
						
					var content = data.result;
					var out ="";
					for(x in content)
					{
							alert(content[x]);
							if( content[x] ==='undefined')
							{
									continue;
							}
							out += content[x]+"<br/>";
					}
					$('#'+ele+" a").html(out);
					//$("#"+ele).
				}, 
				"json"
			);

			str = "";
		});
}

/**向服务器查域名信息*/
function check_dname(target)
{
		
		var elements = {
			 "whois":1
		}
		/**为每种探测发送POST请求*/
		$.each(elements, function(ele, code){
			
			str = {"type":2, "data":target, "code":code};
			$.post(
				ajax_url,
				str, 
				function(data){
					$("#loading").hide();
					
					if(data == NULL)
						return;
						
					var content = data.result;
					var out ="";
					for(x in content)
					{
							alert(content[x]);
							if( content[x] ==='undefined')
							{
									continue;
							}
							out += content[x]+"<br/>";
					}
					$('#'+ele+" a").html(out);
				}, 
				"json"
			);

			str = "";
		});
}

/**向服务器查IP地址信息*/
function check_addr(target)
{
		var elements = {
			 "geo":5,
			 "ping":2,
			 "trace":1,
			 "reverse":3,
			 "ipwhois":4,
			 "portdect":6
		}
		/**为每种探测发送POST请求*/
		$.each(elements, function(ele, code){
			
			str = {"type":1, "data":target, "code":code};
			$.post(
				ajax_url,
				str, 
				function(data){
					$("#loading").hide();
					
					
					//alert(typeof(data.result));
					//alert(jQuery(data.result).size());
					if(data == NULL)
						return;
						
					var content = data.result;
					var out ="";
					for(x in content)
					{
							alert(content[x]);
							if( content[x] ==='undefined')
							{
									continue;
							}
							out += content[x]+"<br/>";
					}
					$('#'+ele+" a").html(out);
					//$("#"+ele).
				}, 
				"json"
			);

			str = "";
		});
}


$(document).ready(function(){
	var txt = $('#txt input[type=text]');
	
	txt.val('输入域名或IP地址');
	
	txt.bind('click', function(){
		if(clicked == 0)
		{
			$(this).val('');
			clicked = 1;
		}
	});

	txt.bind('blur', function(){
		if($(this).val() == "")
		{
			$(this).val(suggest);
		}
	});

	$("#btn").click(function(){
		$("#detect").show();
		$("#loading").show();
		$("#mytbody").show();
		var target = txt.val();
		
		if(isAddr(target))
		{
			$("#check_host a").html(target);
			check_addr(target);
		}
		else
		{	
			if(isDname(target))
			{
				
				check_dname(target);
			}
		}
		
		//设置提交时间
		var myTime = CurrentTime();	
		$("#check_time a").html(myTime);
	});
});