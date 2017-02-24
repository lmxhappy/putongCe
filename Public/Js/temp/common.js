	/**获取当前时间（字符串）*/
	function CurrentTime()
    { 
        var now = new Date();
       
        var year = now.getFullYear();       //年
        var month = now.getMonth() + 1;     //月
        var day = now.getDate();            //日
       
        var hh = now.getHours();            //时
        var mm = now.getMinutes();          //分
       
        var clock = year + "-";
       
        if(month < 10)
            clock += "0";
       
        clock += month + "-";
       
        if(day < 10)
            clock += "0";
           
        clock += day + " ";
       
        if(hh < 10)
            clock += "0";
           
        clock += hh + ":";
        if (mm < 10) clock += '0'; 
        clock += mm; 
        return(clock); 
    } 
	
	/**判断字符串是否为ip地址*/
	function isAddr(str)
	{
		var myReg = /\b(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\b/;  
		if(myReg.test(str)) 
			return true;  
		
		return false;  
	}
	
	
	/**判断字符串是否为域名*/
	function isDname(str)
	{
		var myReg = /^([a-zA-Z0-9]([a-zA-Z0-9\-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,6}$/;  
		if(myReg.test(str)) 
			return true;  
		
		return false;  
	}
	
	
var clicked = 0;
/***参数txtctl：是txt控件
参数content：是txt控件中显示的文字
*/
function txtctl_display_txt(txtctl, content)
{
	txtctl.bind('click', function(){
		if(clicked == 0)
		{
			$(this).val('');
			clicked = 1;
		}
	});
	
	txtctl.bind('blur', function(){
		if($(this).val() == "")
		{
			$(this).val(content);
		}
	});
}