<?php

/**跨库访问另外一个重点域名数据库db_vipdomain*/
class VipDomainModel extends Model {
	
	protected $dbName = "db_vipdomain";
	protected $tableName = 'trouble_domains'; 
	//p($dbName);
	//p('ddddddddddddddd');die;
	
	public function getAll()
	{
		
		//$sql= "SELECT * from (SELECT * from tb_trouble_domains order by create_time desc)  ret GROUP BY `server` ORDER BY create_time desc";
		$sql = "select * from (SELECT * from tb_trouble_domains order by `create_time` DESC) ret GROUP BY `server`	 order by `create_time` DESC";
		//$sql = "select * from (SELECT * from tb_trouble_domains where create_time > CURRENT_TIME()-500 order by `create_time` DESC) ret GROUP BY `server`	 order by `create_time` DESC";
		
		
		//$sql = "select * from tb_trouble_domains WHERE server='1.2.4.8'  order by create_time DESC limit 10";
		
		//p($sql);
		//p($this);
		$ret = $this->query($sql);
		
		//p($ret);
		//die;
		
		return $ret;
	}
}
?>