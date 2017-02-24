<?php

class LinkAction extends Action {
	public function index(){
		//p($_POST);
		
		/*
		$data['plusTime'] = I('plusTime');
		$data['imgTime'] = I('imgTime');
		$data['testNum'] = I('testNum');
		$data['$eartPercent'] = I('heartPercent');
		$data['userTime'] = I('userTime');
		$data['userName'] = I('userName');
		*/
		
		$userName = I('userName');
		if(!$userName)
		{
			echo "{}";
			return;
		}
		
		/***还没有创建用户呢，得提醒先创建用户*/
		$userId = $this->getUserId($userName);
		//p($userId);
		if($userId == -1)
		{
			echo "{}";
			return;
		}
		/***走到这，就说明已经有这个用户了*/
		/**看是否已经有该用户的测试链接了*/
		$ret = M('links')->where(array('userId'=>$userId))->find();
		
		$data= $_POST;
		$data['userId'] = $userId;
		unset($data['userName']);
			//p($data);die;
			//$data['id']= 1;
			//p($data);
		/***没有就插入，否则就更新*/
		if($ret)
		{		
			$id = $ret['id'];

			$ret = $this->tryUpdate($data, $userId);
			/**更新成功，就不要做任何操作了；更新失败，就插入*/
			//p($ret);die;
			if($ret)
			{	
				//p($userId);
				//p($ret);die;
				//p($ret);p(M("links")->getLastSql());die;
				$arr = array(
					'id'=>$id,
					'update'=>true
				);
				echo json_encode($arr);
				return;
			}
		}
		else
		{
			/**走到这就说明更新失败，直接插入*/
			
			$ret = M("links")->add($data);
			if($ret)
			{	
				$id = $ret;

				//p('success'.$id);
				$arr = array(
					'id'=>$id,
					"add"=>true
				);
				echo json_encode($arr);
				return;
			
			}
			/*
			p(M("link")->getLastSql());*/
		}
		
		
		
		echo "{}";
			
	}
	
	/**更新*/
	function tryUpdate($data, $userId)
	{
		/***只能用作更新用，也就是必须之前有userId这样的记录*/
		$ret = M("links")->where(array('userId'=>$userId))->save($data);
		//p($ret);p(M("links")->getLastSql());
		//die;
		
		/*如果不是false，那就还有两种返回值——0或者大于0的数，
		这种情况是因为并没有为字段设置新数据，还是老数据
		*/
		if(gettype($ret))
		{	
			//p('int');
			return true;
		}
		else
		{
			
			/** 0跟false是等价的*/
			return false;
		}
	}
	/*false;
	返回id号，如果没有获取到就返回-1。
	*/
	function getUserId($username)
	{
		$ret = M('subjects')->where(array('username'=>$username))->find();
		//p($ret);
		
		if(!$ret)
		{		
			//p('hre;');
			return -1;
		}
		$id = $ret['id'];
		return  $id;
		
		/*
		if(!$ret)
			return false;
		
		return true;*/
	}







}
	
	

?>
