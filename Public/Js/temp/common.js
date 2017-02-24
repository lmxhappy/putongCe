	/**��ȡ��ǰʱ�䣨�ַ�����*/
	function CurrentTime()
    { 
        var now = new Date();
       
        var year = now.getFullYear();       //��
        var month = now.getMonth() + 1;     //��
        var day = now.getDate();            //��
       
        var hh = now.getHours();            //ʱ
        var mm = now.getMinutes();          //��
       
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
	
	/**�ж��ַ����Ƿ�Ϊip��ַ*/
	function isAddr(str)
	{
		var myReg = /\b(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\b/;  
		if(myReg.test(str)) 
			return true;  
		
		return false;  
	}
	
	
	/**�ж��ַ����Ƿ�Ϊ����*/
	function isDname(str)
	{
		var myReg = /^([a-zA-Z0-9]([a-zA-Z0-9\-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,6}$/;  
		if(myReg.test(str)) 
			return true;  
		
		return false;  
	}
	
	
var clicked = 0;
/***����txtctl����txt�ؼ�
����content����txt�ؼ�����ʾ������
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