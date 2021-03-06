﻿<?php
/*
首页
*/
class ShowAction extends Action {
	public function index()
	{
		$id = (int)$_GET['id'];		
		$date = I('date');
		$time = I('time');
		
		if($id)
		{
			$this->info = $this->getNodeInfo($id, $date, $time);	
		}		
		//p($this->info);die;
		
		//为了一堆节点，用以切换
		$this->node_info = $this->getNodeList();
		//p($this->node_info);die;
		$this->id = $id;
	
		R('Hotnodes/accessNum',array(array($id)));
		$this->hotnodes = R('Hotnodes/getHotNodes', array(8));
		
		
		$this->largest = $this->getLargestItems($id, $date, $time);
		//p($this->largest);die;
		$this->display();
	}
	
	/**从一个列表中找出最大的item*/
	private function getLargestItems($id, $date, $time)
	{		
		/**获取最新数据的生成时间*/
		$nodes_keys = array();	
		if($res = $this->get_nearest_item($id, $date, $time))
		{
			$stat_key = $res['stat_key'];
			$rate = $this->getRate($stat_key);
			$create_time = $res['create_time'];
			$nodes_keys = array("dname_list_key" =>$res['dname_list_key'], 
				'addr_list_key'=>$res['addr_list_key']
			);
		}
		//p($nodes_keys);
		
		$res  = array();
		foreach($nodes_keys as $name => $key)
		{
			if('addr_list_key' == $name)
			{
				$result = M('addr_list')->where(array('list_key'=>$key))->find();
				$content = $result['list_content'];
				
				$arr = split(',', $content);
				
				$largest = $arr[0];
				
				//p(split('/', $largest)[1]);
				$res['addr'] = split('/', $largest)[1];
				
			}
			
			if('dname_list_key' == $name)
			{
				$result = M('domain_list')->where(array('list_key'=>$key))->find();
				
				$arr = split(',', $result['list_content']);
				
				$largest = $arr[0];
				
				$res['dname'] = split('/', $largest)[1];
			}		
		}
		
		return $res;
	}
	/**获得节点列表信息*/
	private function getNodeList()
	{
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
		return $arr;
	}
	/**获取该节点信息*/
	private function getNodeInfo($id, $date, $time)
	{			
		/**获取节点的基本信息*/
		if($res = M('nodes')->find($id))
		{
			$cname = $res['cname'];
			$addr = $res['addr'];
			$name = $res['name'];
		}
		$info = array('cname'=>$cname, 'addr'=>$addr, 'name'=>$name);
		
		/**获取最新数据的生成时间*/
		$nodes_keys = array();	
		$rate = 0;
		if($res2 = $this->get_nearest_item($id, $date, $time))
		{
			$stat_key = $res2['stat_key'];
			$rate = $this->getRate($stat_key);
			$create_time = $res2['create_time'];
			$nodes_keys = array("dname_list_key" =>$res2['dname_list_key'], 
				'addr_list_key'=>$res2['addr_list_key'], 
				'relation_addr_list_key'=>$res2['relation_addr_list_key'],
				"relation_dname_list_key"=>$res2['relation_dname_list_key'],
				"detail_addr_list_key"=>$res2['detail_addr_list_key'],
				"detail_dname_list_key"=>$res2['detail_dname_list_key'], 
				"port_list_key"=>$res2['port_list_key']
			);
		}
		$info['rate'] = $rate;
		
		$info['create_time'] = $create_time;
						
		$data = $this->getList($nodes_keys);
		//p($data);die;
			
		$info['data'] = $data;
		
		return $info;
	}
	
	private function getRate($stat_key)
	{
		$res = M('stat')->where(array('stat_key'=>$stat_key))->find();
	
		return $res['rate'];
	}
	
	private function get_nearest_item($id, $date, $time)
	{
		/**获取最新数据的生成时间*/
		$where = array('nodeid' =>$id);
	
		$full_str_time = $date.' '.$time;
	
		if($date and $time)
		{	
			$full_time = strtotime($full_str_time);
			$start_time = $full_time - 600;
			$str_start_time = $stringtime = date("Y-m-d H:i:s", $start_time);
			
			$end_time = $full_time + 600;
			$str_end_time = $stringtime = date("Y-m-d H:i:s", $end_time);

			$where['create_time'] = array('between', array($str_start_time, $str_end_time));
			$res = M('node_query')->where($where)->order('create_time desc')->select();
			
			$diff = 600;
			$which = "";
			foreach($res as $item)
			{
				$time = strtotime($item['create_time']);
				$new_diff = abs($time-$full_time);
			
				if($new_diff < $diff)
				{
				
					$which = $item;
					$diff = $new_diff;
				}
			}
			
			return $which;
		}
		else
		{
			return 	M('node_query')->where($where)->order('create_time desc')->limit(1)->find();
		}
	}
	
	private function getList($nodes_keys)
	{
		$key_table = array("dname_list_key" =>'domain_list', 
			'addr_list_key'=>'addr_list', 
			'relation_addr_list_key'=>"relation_addr_list",
			"relation_dname_list_key"=> "relation_domain_list",
			"detail_addr_list_key"=> "detailed_addr_list",
			"detail_dname_list_key"=> "detailed_domain_list", 
			"port_list_key"=>"port_list");
		
		$key_key = array("dname_list_key" =>'dnamechart', 
			'addr_list_key'=>'addrchart', 
			'relation_addr_list_key'=>"rel_addrchart",
			"relation_dname_list_key"=> "rel_dnamechart",
			"detail_addr_list_key"=> "small_addrchart",
			"detail_dname_list_key"=> "small_dnamechart", 
			"port_list_key"=>"ports");
			
		$data = array();
		foreach($nodes_keys as $key=>$value)
		{
			$table = $key_table[$key];
			//$query  = "select list_content from $list_table where list_key = '".$list_key."'";
			$where = array('list_key'=>$value);
			$result = M($table)->where($where)->field('list_content')->find();
			$content = $result['list_content'];
			//p($content);
			$new_key_name = $key_key[$key];
			$content = $this->list_content_filter($content);
			//p($content);
			$data[$new_key_name]= "$content";
		}
		
		return $data;
	}
	
	private function list_content_filter($content)
	{
		//$title = "test";
		//$xml = htmlspecialchars("<chart caption='".$title."'  baseFontSize='15'>", ENT_QUOTES);
		$arr = explode(",", $content);
		foreach($arr as $pair)
		{		
			
			$two = explode("/", $pair);
			$count = $two[0]?$two[0]:0;
			
			$str = $two[1]? $two[1]:"";
			
			
			$tooltext = $str.",".$count;
			/*
			$where = $this->ip_geo($str);
			$tooltext .= ",".$where;*/
			if($count > 0 and !empty($str))
				//$xml .=  htmlspecialchars("<set name='".$str."' value='".$count."' toolText='January'/>", ENT_QUOTES);
				$xml .=  htmlspecialchars("<set name='".$str."' value='".$count."' toolText='".$tooltext."' link='n-i_$str'/>", ENT_QUOTES);	
		}
		
		$xml .= htmlspecialchars("</chart>", ENT_QUOTES);
	
		return $xml;
	}
	
	private function ip_geo($ip)
	{
		$record = geoip_record_by_name($ip);
		if($record)
		{
			$country_name = $record['country_name'];
			$city_name = $record['city'];
		}
		return $city_name."-".$country_name;
	}
	public function clickNum()
	{
		$id = (int)$_GET['id'];
		
		$where = array('id'=>$id);
		$click = M('blog')->where($where)->getField('click');
		M('blog')->where($where)->setInc('click');
		
		echo 'document.write('.$click.')';
	}
	
	public function addComment()
	{
		
		$bid = $_GET['bid'];
		$uid = $_GET['uid'];
		//$bid, $uid;
		if(!$bid )
		{
			$this->error("添加评论失败");
		}
		if(!$uid)
		{
			$this->error("请先登录");
		}
		
		$comment = I('comment');
		$data = array(
			'bid'=>$bid,
			'comment'=>$comment,
			'uid'=>$uid,
			'time'=>time()
		);
		
		if(M('blog_comments')->add($data))
		{
			$this->success('添加评论成功', U('/'.$bid));
		}
		else
		{
			$this->error('添加评论失败');
		}
		
	}
	
	public function delComment()
	{	
		$comment_id = (int)$_GET['id'];
		if(!$comment_id)
		{
			$this->error("删除评论失败_comment_id");
		}
		$bid = (int)$_GET['bid'];
		$uid = session('uid');
		
		//未登陆
		if(!$uid)
		{
			$this->error("您未登陆！请先登陆！");
		}
		
		//线确实
		$comment = M('blog_comments')->where(array('id'=>$comment_id))->find();
		$comment_uid = $comment['uid'];
		if($uid != $comment_uid)
		{
			$this->error("此评论不是您写的，你没有权限删除！");
		}
		if(M('blog_comments')->where(array('id'=>$comment_id))->delete())
		{
			$this->success("成功删除评论", U('/'.$bid));
			//$this->success("成功删除评论", U(GROUP_NAME.'/Show/index'));
		}
		else
		{//$this->display('index');
			$this->error("删除评论失败");
		}
		//$this->display('index');
	}
	
	
	public function support()
	{
		//echo 'document.write("10")';
		//p($_POST);
		/*注释掉意味着匿名用户也可以评价
		$uid = session('uid');
		if(!$uid)
		{
			echo -1;
		}*/
	
		$cid = $_POST['cid'];
		if(!$cid)
		{
			echo -2;
			die;
		}
		
		$att = I('att');
		
		$where = array('id'=>$cid);
		
		if($att == 1)
		{
			if(M('blog_comments')->where($where)->setInc('snum'))
			{
				$snum = M('blog_comments')->where($where)->getField('snum');
			
				echo $snum;
			}
			else
			{
		
				echo -3;
			}
		}
		if($att == -1)
		{
			if(M('blog_comments')->where($where)->setInc('onum'))
			{
				$onum = M('blog_comments')->where($where)->getField('onum');
			
				echo $onum;
			}
			else
			{
		
				echo -3;
			}
		}
		
		
	//	return json_encode("{'1':'1'}");
	}
	
	function getUpdateTime()
	{
		//p($_POST);
		$id = I('id');

		$time = 0;
		/**获取最新数据的生成时间*/
		if($id)
		{
			$where = array('nodeid' =>$id);
			if($res = M('node_query')->where($where)->order('create_time desc') ->limit(1)->find())
			{
				$time = $res['create_time'];
			}
		
			//echo $create_time;
			
			$arr = array("id"=>$id, "time"=>$time);
			
			$array = array("nodes"=>$arr);
		}
		else
			if($id==0)
			{
				#select nodeid, max(create_time) from tb_node_query group by nodeid;
				$Model = new Model();
				$array = $Model->query("select nodeid as id, max(create_time) as create_time from tb_node_query group by nodeid");
				//$array = M('node_query')->group('nodeid')->max('create_time');
				//$array = array("nodes"=>$array);
			
			}
		echo json_encode($array);
	}
	

	
}
?>