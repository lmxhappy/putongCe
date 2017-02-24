<?php


class IndexAction extends Action {
	public function index()
	{
			
		if(!isset($_SESSION['uid'])){
			redirect('/Admin/Login/index');
		}
		
		//var_dump($_SESSION);die();
		$this->userList = $this->getUserList();
		/*
		p('-------------');
		p($this->userList);die;
		*/
		
		$this->display();
	}

	public function getUser()
	{
			
		if(!isset($_SESSION['uid'])){
			redirect('/Admin/Login/index');
		}
		
		//var_dump($_SESSION);die();
		$this->userList = $this->getUserList();
		/*	
		p('-------------');
		p($this->userList);die;
		*/
		$this->userList = $this->getSubjectTest($this->userList);
		//p($this->userList);die;
		//p($userList);die;
		$this->display();
	}
	function arrayFlatten($array) { 
        $flattern = array(); 
        foreach ($array as $key => $value){ 
            $new_key = array_keys($value); 
            $flattern[] = $value[$new_key[0]]; 
        } 
        return $flattern; 
	} 
	public function getSubjectTest($objects)
	{
		foreach($objects as $k=>&$object)
		{
			//p($object);
			$subjectId = $object['id'];
			//p($subjectId);die;
			$where = array("subjectId"=>$subjectId);
			$ret = M('subjecttest')->where($where)->select();
			//p(M('subjecttest')->getLastSql());
			$sentence = "select  b.name from tb_subjecttest a, tb_testlist b where a.subjectId=".$subjectId." and a.testId=b.id";
			//p($sentence);
			$model = M();
			$ret = $model->query($sentence);
			
			if($ret)
			{
				//p($ret);
				$flat = $this->arrayFlatten($ret) ;
				//p($flat);die;
				
				//$object['testList'] = implode(",", $flat);
				$object['testList'] = $flat;
			}
		}
		
		return $objects;
	}
	public function getResult()
	{		
		$urlId = I('urlId');
		if(!$urlId)
		{
			p('urlId is nil');
			return;
		}

		$res = M('visualtest')->where(array('urlId'=>$urlId))->select();
		/*p($res);//die;
		$sql = M('visualtest')->getLastSql();
		p($sql);
		die;
		*/

		//var_dump($_SESSION);die();
		//$this->resultList = $this->getLatestResult($urlId);
		$this->resultList = $this->getResultList($urlId);
		/*
		p('-------------');
		p($this->resultList);die;
		*/

		$this->display("result");
	}

	/**获得结果列表*/
	function getLatestResult($urlId)
	{
		if(!$urlId)
		{
			p('urlId is nil');
			return;
		}
		$model = M();
		//$sentence = "select a.username, b.id from tb_subjects a, tb_visuallinks b where a.username=b.userName";
		$sentence = "select * from tb_visualtest where clientId=(select max(clientId) from tb_visualtest where urlId=".$urlId.")";
		//p($sentence);
		$result = $model->query($sentence);
		//p($result);die;
		return $result;
	}

	/**获得结果列表*/
	function getResultbyClient()
	{
		$urlId = I('urlId');
		$clientId = I('clientId');
		/*
		p($urlId);
		p($clientId);
		*/
		if(!$urlId || !$clientId)
		{
			p('urlId or clientId is nil');
			return;
		}

		$model = M();
		//$sentence = "select a.username, b.id from tb_subjects a, tb_visuallinks b where a.username=b.userName";
		$sentence = "select * from tb_visualtest where clientId='".$clientId."' and urlId='".$urlId."'";
		//p($sentence);
		$result = $model->query($sentence);
		//p($result);die;
		echo json_encode($result);
		//return $result;
	}


	/**获得一个urlId下的所有测试的列表*/
	public function getResultList($urlId)
	{//p('hee');		
		//$urlId = I('urlId');
		if(!$urlId)
		{
			p('urlId is nil');
			return;
		}

		$sentence = "select clientId,create_time, urlId from tb_visualtest where urlId='".$urlId."' group by clientId";//->where(array('urlId'=>$urlId))->select();
		//p($sentence);
		$model = M();
		$result = $model->query($sentence);
		//p($result);die;
		/*
	//p($res);//die;
		$sql = M('visualtest')->getLastSql();
		p($sql);
		die;
		*/
	
		return $result;

		//var_dump($_SESSION);die();
		/*p('-------------');
		p($this->userList);die;*/
		
	}

	/****获得用户列表*/	
	function getUserList()
	{
		
		$model = M();
		
		//$sentence = "select a.username, b.id from tb_subjects a, tb_visuallinks b where a.username=b.userName";
		$sentence = "select a.*, b.id as urlId from tb_subjects a left join tb_visuallinks b on a.id=b.userId";
		//p($sentence);
		
		$result = $model->query($sentence);
		/*
		p($result);die;
		*/
		//p(M('links')->getLastSql());

		
		foreach($result as $k=>&$v)
		{
			/*p('--------------');
			p($v);
			*/
			$urlId = $v['urlId'];
			$ret = M('visualtest')->where(array('urlId'=>$urlId))->find();
			/*
			p($urlId);
			p($ret);
			*/
			//p(M('visualtest')->getLastSql());
			if($ret)
			{
				$v['did']= true;
			}
			else
			{
				$v['did']= false;
			}
		}
		
		p($result);die;
		return $result;
		//p(M('link')->getLastSql());
		//p($this->userList);
	}
	
	function createNewUser()
	{
		$post = $_POST;
		$username = I('username');
		$ret = M('subjects')->where(array('username'=>$username))->find();
		
		//没有就直接插入
		if(!$ret)
		{
			$ret = M('subjects')->add($post);
			$arr = array(
					'id'=>$id,
					"add"=>true
				);
			echo json_encode($arr);
			return;
		}
		else
		{//有就更新
			//$username = I('username');
			$ret = M('subjects')->where(array('username'=>$username))->save($post);
			
			
			/*p($ret);
			
			$sql = M('subjects')->getLastSql();
			p($sql);
			*/
			$arr = array(
					'id'=>$id,
					'update'=>true
				);
			echo json_encode($arr);
			return;
		}

	}
	
	public function testList()
	{
		//p('testList');
		$this->testList = M('testlist')->select();
		
		//p($this->testList);die;
		
		//p(M('testlist')->getLastSql());die;
		
		$this->display();
	}
	
	/**js post创建，插入/更新数据库*/
	public function createNewTest()
	{
		$post = $_POST;
		p($post);
		$testName = I('name');
		p($testName);//die;
		$dbLink = M('testlist');
		$where = array('name'=>$testName);
		$ret = $dbLink->where($where)->find();
		p($ret);//die;
		
		//没有就直接插入
		if(!$ret)
		{
			$ret = $dbLink->add($post);
			p($dbLink->getLastSql());
			$arr = array(
					'id'=>$id,
					"add"=>true
				);
			
			echo json_encode($arr);
			return;
		}
		else
		{//有就更新
			//$username = I('username');
			$ret = $dbLink->where($where)->save($post);
			
			
			/*p($ret);
			
			$sql = M('subjects')->getLastSql();
			p($sql);
			*/
			$arr = array(
					'id'=>$id,
					'update'=>true
				);
			echo json_encode($arr);
			return;
		}

	}
}

?>
