
	$(function(){
		$('#numbers').find('td').click(function(){
			//alert();
			var num = $(this).html();
			//alert(num);
			$(this).css("text-decoration", "line-through");
			
			//就是给出随机数字数组的偏移量
			var numberId = $(this).attr('numberId');
			console.log(numberId);
			
			//防止多次点击，多次存入
			var ret = $.inArray(numberId, choice);
			console.log(ret);
			//不在，才插入
			if(ret == -1)
				choice.push(numberId);
			console.log(choice);
			
		}); 
	});