
/**
model:"Charts/Pie2D.swf", tag
*/
function showChart(model, title, tag){
		var myChart = new FusionCharts(model, "myChartId1", "600", "480");
		var data = "<chart caption='"+title+"  baseFontSize='15'><set name='208.67.219.0' value='330' /><set name='65.55.37.0' value='236' /><set name='74.125.191.0' value='158' /><set name='65.55.5.0' value='118' /><set name='74.125.186.0' value='110' /><set name='80.73.4.1' value='96' /><set name='74.125.16.0' value='94' /><set name='66.249.74.0' value='89' /><set name='74.125.41.0' value='66' /><set name='74.125.176.0' value='57' /><set name='219.88.187.0' value='52' /><set name='219.88.186.149' value='50' /><set name='66.249.73.0' value='48' /><set name='74.125.40.0' value='43' /><set name='208.115.111.72' value='40' /><set name='74.125.189.0' value='33' /><set name='66.249.76.0' value='32' /><set name='74.125.187.0' value='31' /><set name='66.249.66.0' value='30' /><set name='174.36.22.3' value='30' /><set name='74.125.183.0' value='25' /><set name='150.70.97.0' value='22' /><set name='198.58.103.65' value='21' /><set name='74.125.19.214' value='18' /><set name='199.30.228.0' value='18' /><set name='74.125.182.0' value='17' /><set name='132.249.20.25' value='17' /><set name='209.172.57.133' value='17' /><set name='64.4.15.0' value='16' /><set name='70.38.0.0' value='15' /></chart>";
		
		myChart.setDataXML(data); 
		myChart.render(tag);
}