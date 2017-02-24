<?php
/*
首页
*/
class TimelineAction extends Action {
	public function index()
	{
		//获得节点号
		$id = (int)$_GET['id'];
		
		$this->xml = "";
		if($id > 0)
		{
			if(!M('nodes')->find($id))
			{
				$this->error("没有该节点，请重新选择节点！");
			}
		
			$this->xml = $this->get_xml_data("QPS", "hour", $id);
		}

		//为了餐单栏的登录与退出
		$this->module = 'Timeline';
		$this->fid = $id;
			
		//为了一堆checkbox
		$fields = array('id', 'cname');
		$nodes = M('nodes')->field($fields)->select();	
		
		$arr = array();
		if($nodes)
		{
			foreach($nodes as $node)
			{
				$nodeid = $node['id'];
				$cname = $node['cname'];
				$arr[$nodeid] = $cname;	
			}
		}
		$this->node_info = $arr;
		
		$this->display();
	}

	/**构建fushionchart flash所需要的数据*/
	public function get_xml_data($caption, $tag, $nodeids, $time_arr)
	{
		$xml = "<chart caption='".$caption."' xAxisName='time' yAxisName='QPS' showValues='0' numberPrefix='' bgColor='FFFFFF,FF5904' canvasBgAlpha='100,40' showBorder='0'>";

		$xml_data = $this->axis_xml_data($tag, $nodeids, $time_arr);
		$xml .= $xml_data;
		$xml .=  "<trendlines>      <line startValue='26000' color='91C728' displayValue='Target' showOnTop='1'/>   </trendlines></chart>";
		
		return $xml;
	}
	
	/**从数据库中获取fushionchart flash所需要的数据
	*$id is the node id*
	*/
	private function axis_xml_data($tag, $ids, $time_arr)
	{
		$set = explode(",", $ids);
		
		$xml = "";
		$xml2 = "";
		foreach($set as $key=>$id)
		{
			if($id==0)
				continue;
			//$res =  D('TimelineView')->getAll($id, $limit=10);
			$res = $this->get_data_frm_db($id, $time_arr, $limit=10);
			
			$arr = array();
			if($res)
			{
				foreach($res as $item)
				{
					$count = $item['count']; 
					$time = $item['create_time'];
					$arr[$time] = $count;
				}
			}
			
			$this->filter_axis_data($arr, $tag);
			$arr = $this->filter_axis_times($arr);
			
			if(empty($xml))
			{
				$xml = "<categories>";
				
				foreach(array_reverse($arr) as $time=>$value)
				{
					$xml .= "<category label='".$time."' />";
					
				}
				$xml .= " </categories>";
			}
			
			$xml2 .= "<dataset seriesName='".$id."'>";
			foreach(array_reverse($arr) as $time=>$value)
			{
				$count = round($value/10);
				
				$xml2 .= "<set value='".$count."' />";	
			}
			
			$xml2 .= "</dataset>";
		}
		
		return $xml.$xml2;
	}
	
	/***从数据库中获取相关数据
	$time_arr：存储开始时间和结束时间
	*/
	private function get_data_frm_db($id, $time_arr, $limit=10)
	{
		//p($time_arr);
		$str_start_time = $time_arr['start_date'].' '.$time_arr['start_time'];
		$str_end_time = $time_arr['end_date'].' '.$time_arr['end_time'];
		//p($str_start_time);
		//p($str_end_time);
		$start_time = strtotime($str_start_time);
		$end_time = strtotime($str_end_time);
		
		$diff_time = $end_time - $start_time;
		
		
		/**两个小时（包括两个小时）以内*/
		if($diff_time > 7200)
		{
			/**一天以内*/
			if($diff_time <= 3600*24)
			{
				$res =  D('TimelineView')->getHourData($id, $str_start_time, $str_end_time, $limit=10);
			}
			else
			{
				$res =  D('TimelineView')->getDayData($id, $str_start_time, $str_end_time, $limit=10);
				
			}
		}
		else
		{
			$res =  D('TimelineView')->getAll($id, $str_start_time, $str_end_time, $limit=10);
		}
		
		return $res;
	}

	private	function filter_axis_data($arr, $tag)
	{
		$length = count($arr);
		if($length <= 0)
			return;
		/**如果时间都一样*/	
		switch($tag)
		{
			case "hour":
				$this->filter_axis_data_by_hour($arr);
				break;
			case "day":
				break;
		}
	}
	
	private function filter_axis_data_by_hour($arr)
	{
		$i = 0;
		$base = 0;
		$prev = 0;
		foreach($arr as $time=>$count)
		{
			if($i == 0)
			{
				$base = $time;
				$prev = $time;
			}
			else
			{
				if($base - $time > 3900)
				{
					unrest($arr[$time]);
				}
			}
			$i++;
		}
	}
	
	public function getXmlData()
	{
		$num = I('num');
		$nodes = I('nodes');
		$start_date = I('start_date');
		$start_time = I('start_time');
		$end_date = I('end_date');
		$end_time = I('end_time');
		
		$time_arr = array(
			"start_date"=>$start_date,
			'start_time'=>$start_time,
			'end_date'=>$end_date,
			'end_time'=>$end_time
		);
		
		$xml = $this->get_xml_data("QPS", "hour", $nodes, $time_arr);	

		echo $xml;					
	}
	
	private function filter_axis_times($arr)
	{
		$now = time();
		$yArr = array();
		foreach($arr as $time=>$v)
		{
			$sTime = strtotime($time);
			$dTime = $now - $sTime;
			//p($time);
			//p($now);p(strtotime($time));p($dTime);
			$dDay       =   intval(date("z",$now)) - intval(date("z", $sTime));
			//$dDay     =   intval($dTime/3600/24);
			//p($dDay);
			$dYear      =   intval(date("Y",$now)) - intval(date("Y", $sTime));
			
			$yArr[] = $dYear;
			$dArr[] = $dDay;
		}

		switch($this->test_date_year($yArr))
		{
			case 1:
				return $arr;//不用处理了
				break;
			case 2:
				$flag = $this->test_date_year($dArr);
				$newArr = array();
				switch($flag)
				{
					case 1 || 2:
						foreach($arr as $time=>$v)
						{
							$sTime = strtotime($time);
							
							/**1时*/
							if($flag == 1)
								$newTime = date('m-d H:i:s', $sTime);//die;
							else
								$newTime = date('H:i:s', $sTime);//die;

							$newArr[$newTime] = $v;
						}
						break;
					case 3:
						foreach($arr as $time=>$v)
						{
							$sTime = strtotime($time);
							$dDay       =   intval(date("z",$now)) - intval(date("z", $sTime));
							if($dDay == 0)
								$newTime = date('H:i:s', $sTime);//die;
							else
								$newTime = date('m-d H:i:s', $sTime);//die;

							$newArr[$newTime] = $v;
						}
						break;
				}
				
				return $newArr;

				break;
			case 3:
				return $arr;
		
		}
	}
	
	/**存在当年时间，那么*/
	private function test_date_year($yArr)
	{
		$num = 0;
		foreach($yArr as $item)
		{
			if($item == 0)
			{
				$num++; 
			}
		}
		switch($num)
		{
			case 0:
				/**全不是当年*/
				return 1;
				break;
	
			case count($yArr):
				/**全是当年*/
				return 2;
				break;
			
			default:
				/**跨年，一部分是当年*/
				return 3;
				break;
		}
	}
	/**
	 * 友好的时间显示
	 *
	 * @param int    $sTime 待显示的时间
	 * @param string $type  类型. normal | mohu | full | ymd | other
	 * @param string $alt   已失效
	 * @return string
	 */
	 function friendlyDate($sTime,$type = 'normal',$alt = 'false') {
		if (!$sTime)
			return '';
		//sTime=源时间，cTime=当前时间，dTime=时间差
		$cTime      =   time();
		$dTime      =   $cTime - $sTime;
		$dDay       =   intval(date("z",$cTime)) - intval(date("z",$sTime));
		//$dDay     =   intval($dTime/3600/24);
		$dYear      =   intval(date("Y",$cTime)) - intval(date("Y",$sTime));
		//normal：n秒前，n分钟前，n小时前，日期
		if($type=='normal'){
			if( $dTime < 60 ){
				if($dTime < 10){
					return '刚刚';    //by yangjs
				}else{
					return intval(floor($dTime / 10) * 10)."秒前";
				}
			}elseif( $dTime < 3600 ){
				return intval($dTime/60)."分钟前";
			//今天的数据.年份相同.日期相同.
			}elseif( $dYear==0 && $dDay == 0  ){
				//return intval($dTime/3600)."小时前";
				return '今天'.date('H:i',$sTime);
			}elseif($dYear==0){
				return date("m月d日 H:i",$sTime);
			}else{
				return date("Y-m-d H:i",$sTime);
			}
		}
	 }
}
?>