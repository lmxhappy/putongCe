<?php
/*
首页
*/
class BlackAction extends Action {
	public function index()
	{
		//p($_GET);die;
		$id = (int)$_GET['id'];
		/*
		$cate = M('cate')->order('sort')->select();
		import('Class.Category', APP_PATH);
		$cids = Category::getChildrenId($cate, $id);
		$cids[] = $id;
		
		$where = array('cid'=>array('IN', $cids));
		$count = M('blog')->where($where)->count();
		
		import('ORG.Util.Page');
		$page = new Page($count, 2);
		$limit = $page->firstRow.','.$page->listRows;
		//echo $limit;die;
		$this->blog = D('BlogView')->getAll($where, $limit);
		$this->page = $page->show();
		*/
		
		//为了餐单栏的登录与退出
		$this->module = 'Black';
		$this->fid = $_GET['id'];
		
		
		$this->display();
	}
	
	/**罗列名单*/
	public function getBlacklist()
	{
		/*
		if ( isset( $_GET['iDisplayStart'] ) && $_GET['iDisplayLength'] != '-1' )
		{
			$sLimit = "LIMIT ".mysql_real_escape_string( $_GET['iDisplayStart'] ).", ".
				mysql_real_escape_string( $_GET['iDisplayLength'] );
		}
		*/
		
		$start = $_POST['iDisplayStart']; 
		$len = $_POST['iDisplayLength'];
		
		
		
		$secho = $_POST["sEcho"];
			
		$where = array();
		if(!empty($ipaddr))
		{
			//$query = "select nodeid, count, create_time, ipaddr from tb_blacklist where ipaddr like '".$ipaddr."%' order by create_time desc limit 10";	
			$where['title']  = array('like',"'".$ipaddr."%'");
		}
		
		$fields = array('nodeid', 'count', 'create_time', 'ipaddr');
		
		/**获取符合条件的条目数量*/
		$count = M('blacklist')->where($where)->count();
		
		$array = array("sEcho"=>$secho, "iTotalRecords"=>$count,	"iTotalDisplayRecords"=>$count);
		$limit = $start.','.$len;
		$res = M('blacklist')->order("create_time desc")->where($where)->limit($limit)->select();
		
		$aadata = array();
		if($res)
		{
			foreach($res as $item)
			{
					$nodeid = $item['nodeid'];
					$count =  $item['count'];
					$createtime =  $item['create_time'];
					$ipaddr =  $item['ipaddr'];

					$geo = R('Addr/ip2geo',array($ipaddr));
					
					$data = array($ipaddr, $geo, $nodeid, $count, $createtime);
					//$data = array($ipaddr, $nodeid, $count, $createtime);
					//p($data);
					array_push($aadata, $data);
					//p($aadata);
			}	
		}
		
		$array["aaData"] = $aadata;			
		//record2err_file(json_encode($array));
		echo json_encode($array);
	}
	
	/*
	private function ip_geo($ip)
	{
		$record = geoip_record_by_name($ip);
		if($record)
		{
			$country_name = $record['country_name'];
			$city_name = $record['city'];
		}
		return $city_name."-".$country_name;
	}*/
}
?>