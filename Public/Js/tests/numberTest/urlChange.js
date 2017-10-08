function GetUrlParms(param)
{
//console.log(window.location.href);
var href = window.location.href;

 var pairs=href.split("/");//在逗号处断开
//console.log(pairs);
 for(var i=0;i<pairs.length;i++)
 {
  var pos=pairs[i].indexOf(param);//查找name=value
   if(pos==-1) continue;//如果没有找到就跳过
        return pairs[i+1];
 }
}

$(function(){
var user = GetUrlParms('user');
var desc = GetUrlParms('desc');
//如果要查找参数key:
if(user!=undefined && desc !=undefined)
{
        var url = $('#beginhref').attr('href');
        console.log(url);
        var newHref=url + '/user/'+user+'/desc/'+desc;
        console.log(newHref);
        $('#beginhref').attr('href', newHref);
}
});

