<?php
class TimelineViewModel extends ViewModel {
	
	protected $viewFields = array(
		'stat' => array(
			'count',  '_type'=>'LEFT'
		),
		'node_query' => array(
			 'create_time','_on' => 'stat.stat_key = node_query.stat_key'
		),
	);
	/*
	 protected $_map = array(
        'sum(stat.count)' => 'count',
        'password' => 'pass'
    );*/
	
	Public function getAll($id, $start_time, $end_time, $limit=10)
	{
		$where = array('nodeid'=>$id);
		$where['node_query.create_time'] = array('between', array($start_time, $end_time));

		return $this->where($where)->group($group)->order("create_time desc")->select();
	}
	
	public function getHourData($id, $start_time, $end_time, $limit=10)
	{
		$where = array('nodeid'=>$id);
		$where['node_query.create_time'] = array('between', array($start_time, $end_time));

		$group = "date_format(node_query.create_time, '%Y-%m-%d %H:00:00')";
		$fields = array('sum(stat.count)', "date_format(node_query.create_time, '%Y-%m-%d %H:00:00')");
		$res = $this->where($where)->group($group)->order("create_time desc")->field($fields)->select();
		
		$result = array();
		foreach($res as $item)
		{
			
			$result[] = array('count'=>$item['sum(stat.count)'], 'create_time'=>$item["date_format(node_query.create_time,'%Y-%m-%d %H:00:00')"]);
		}
		unset($res);
		
		return $result;
	}
	
	public function getDayData($id, $start_time, $end_time, $limit=10)
	{
		$where = array('nodeid'=>$id);
		$where['node_query.create_time'] = array('between', array($start_time, $end_time));

		$group = "date_format(node_query.create_time, '%Y-%m-%d')";
		$fields = array('sum(stat.count)', "date_format(node_query.create_time, '%Y-%m-%d')");
		$res = $this->where($where)->group($group)->order("create_time desc")->field($fields)->select();
		
		$result = array();
		foreach($res as $item)
		{			
			$result[] = array('count'=>$item['sum(stat.count)'], 'create_time'=>$item["date_format(node_query.create_time,'%Y-%m-%d')"]);
		}
		unset($res);
		
		return $result;
	}
}
?>