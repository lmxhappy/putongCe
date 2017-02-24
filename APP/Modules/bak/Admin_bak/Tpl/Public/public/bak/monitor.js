function showdata(file, tag){
	var myChart = new FusionCharts("Charts/Pie2D.swf", "myChartId", "600", "480");
	myChart.setDataURL(file);
	myChart.render(tag);
}