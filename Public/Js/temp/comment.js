$(document).ready(function()
{

	function send_ajax(siblings, cid, support)
	{
		var num = siblings.text();
		var data = {"bid":bid, "cid":cid, "snum":num, "att":support};
		
		$.ajax({
			type: 'POST',
			 url: ajax_url,
			 data: data, 
			 success: function(data)
			  {
					if(data >= 1)
					{
							siblings.text(parseInt(num)+1);
					}
			  },
			  error: function(){
						alert('Error loading XML document');
			  },
			  dataType: "html"
		});

	
		
	}
	
	

	$(".support").click(function()
	{
						
		//旁边的num显示节点
		
		var siblings = $(this).siblings();
		var cid = this.name;
	
		/*
		var siblings = $(this).parent(".agree").children(".cmt-do-num");
						
		var num = siblings.text();				
			*/		
		
		//alert("a");
		send_ajax(siblings, cid, 1);	
		var parent = $(this).parent();
		$(this).remove();
		parent.prepend("我已经支持了");
		
		var opposite_parent = parent.siblings(".disagree");
		var opposite = opposite_parent.children('.oppose');
		opposite.remove();
		opposite_parent.prepend("反对");
	});
	
	
	$(".oppose").click(function()
	{
						
		//旁边的num显示节点
		
		var siblings = $(this).siblings();
		var cid = this.name;
	
		/*
		var siblings = $(this).parent(".agree").children(".cmt-do-num");
						
		var num = siblings.text();				
			*/		
		
		//alert("a");
		send_ajax(siblings, cid, -1);	
			var parent = $(this).parent();
		$(this).remove();
		parent.prepend("我已经反对了");
		
		
		var opposite_parent = parent.siblings(".agree");
		opposite_parent.children('.support').remove();
		
		opposite_parent.prepend("支持");
	});
	
});
