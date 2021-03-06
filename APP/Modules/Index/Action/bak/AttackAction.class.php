<?php
/*
首页
*/
class AttackAction extends Action {
	public function index()
	{	
		$this->display();
	}
	
	public function getAttacklist()
	{
		$target = I('target');
		//p($target);
		
		/**如果真就是ipv4地址*/
		if(ip2long($target))
		{
			$data = $this->getData(1);
			//echo "addr";
		}
		else
		{
			$data = $this->getData(2);
			//echo "dname";

		}
		//p($data);die;
		$res = $this->find($data, $target);
		//p($res);
		echo $this->json_packet($res);
		//return $res;
	}
			
	private function json_packet($data)
	{
		
		$count = count($data);
		//p($data);die;
		$secho = $_POST["sEcho"];
		$array = array("sEcho"=>$secho, "iTotalRecords"=>$count,	"iTotalDisplayRecords"=>$count);
		
		/**表格数据部分*/
		$aadata = array();
		foreach($data as $id=>$item)
		{
			//p($item);
			//$id = $item['id'];
			$num = $item['num'];
			$count = $item['count'];
			$create_time = $item['create_time'];
			$cname = $item['cname'];
			
			$perc = round($num/$count*100, 1);
			array_push($aadata, array($id." ".$cname, $num, $count, $perc.'%', $create_time));
		}
		
		$array["aaData"] = $aadata;			
		return json_encode($array);
	}
			

	public function find($data, $target)
	{
		if(!target)
		{
			echo "no target";
		}
		$id_num = array();
		
		//p($data);die;
		foreach($data as $id => $item)
		{	
			$create_time = $item['create_time'];
			$count = $item['count'];
			$list = $item['list'];
			$cname = $item['cname'];
			
			$v = explode(',', $list);
			foreach($v as $vv)
			{
				$arr =  explode('/', $vv);
				$num = $arr[0];
				//p($arr[1]);
				//p($target);
				$sub = strstr($arr[1], $target);
				
				//print_r($sub);
				if(stristr($arr[1], $target))
				{
					$num = $arr[0];
					//$id_num[$id] = array('id'=>$id, 'cname'=>$cname, 'num'=>$num, 'count'=>$count, 'create_time'=>$create_time);
					$id_num[$id] = array('cname'=>$cname, 'num'=>$num, 'count'=>$count, 'create_time'=>$create_time);
				}

			
			}
			
		}
		//p($id_num);die;
		return $id_num;
	}
	/***1 代表ip地址；2代表域名*/
	public function getData($type)
	{
		$nodes = M('nodes')->select();
		
		$id_content = array();
		
		if($type==1)
		{
			$table = 'addr_list';
			$keyname = 'addr_list_key';
		}
		if($type == 2)
		{
			$keyname = 'dname_list_key';
			$table = 'domain_list';
		}
		//p($nodes);die;
		foreach($nodes as $node)
		{
			$id = $node['id'];
			$cname = $node['cname'];
			$item = M('node_query')->where(array('nodeid'=>$id))->order('create_time desc')->find();
			
			$create_time = $item['create_time'];
			
			/**查出总的请求量*/
			$stat_key = $item['stat_key'];
			$for_count = M('stat')->where(array('stat_key'=>$stat_key))->find();
			$count = $for_count['count'];
			//p($create_time);
			$content = M($table)->where(array('list_key'=>$item[$keyname]))->find();
			$list = $content['list_content'];
			$id_content[$id] = array('cname'=>$cname, 'create_time'=>$create_time, 'count'=>$count, 'list'=>$list);
		}
		
		return $id_content;
	}	
	
	public function getAttackGeolist()
	{
		$id = I('id');
		$res = M('node_query')->where(array('nodeid'=>$id))->order('create_time desc')->find();
		//p($res);
		$who_key = $res['relation_addr_list_key'];
		$who = M('relation_addr_list')->where(array('list_key'=>$who_key))->find();
		$create_time = $who['create_time'];
		$clients = $who['list_content'];
		
		$res = $this->geoize($clients);
		
		echo $res;
	}
	
	public function geoize($data)
	{
	
		/**表格数据部分*/
		$aadata = array();
		$arr = explode(',', $data);
		foreach($arr as $v)
		{
			$arr2 = explode('/', $v);
			$num = $arr2[0];
			$ip = $arr2[1];
			$geo = R('Addr/ip2geo',array($ip));

			
			array_push($aadata, array($ip, $geo, $num, ''));
		}
	
		
		
		$count = count($arr);
		$secho = $_POST["sEcho"];
		$array = array("sEcho"=>$secho, "iTotalRecords"=>$count,	"iTotalDisplayRecords"=>$count);
		
	
		$array["aaData"] = $aadata;			
		return json_encode($array);
	}
}
?>