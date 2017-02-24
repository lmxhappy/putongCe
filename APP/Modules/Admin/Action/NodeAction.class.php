<?php



class NodeAction extends Action {
	public function add(){
		//dump(222);
		$this->display();
	}
	public function ceshi(){
		//dump(222);
		//$this->display();
	$nodes = M('nodes')->order('id')->select();
	echo $nodes->error();
	}
	public function getInfo(){

		//print_r($_POST);
		//print_r($_GET);
		
		//$User = M("nodes"); // 实例化User对象
		//echo I('operate');
		//$obj = json_decode($json);


		//print_r($obj);
		
		//echo $json;
		/*
		$data['name'] = 'ThinkPHP';
		$data['cname'] = '中国12';
		$data['lng'] = '111.22';
		$data['lat']='2222.222';
		$data['addr']='10.1.1.1';
		$User->add($data);
		header("Content-Type:text/html;charset=utf-8"); 
		echo $User->getLastSql();
		*/

		$name= I('name');
		$cname = I('cname');
		$id = I('id');
		$addr = I('addr');
		$coorlport = I('coorlport');
		$coorrport = I('coorrport');	

		if(empty($name))
		{
		$errstr .= "错误：英文名为空 ";
		}
		if(empty($cname))
		{
		$errstr .= "；错误：中文名为空";
		}
		//之前检查错误
		if(empty($addr))
		{
		$errstr .= "；错误：IP地址为空";
		}
		if(!empty($errstr))
		{
		die("<p>$errstr</p>");
		}
		
		$name= I('name');
		$cname = I('cname');
		$id = I('id');
		$addr = I('addr');
		$coorlport = I('coorlport');
		$coorrport = I('coorrport');	
		//echo $coorrport;
		$data = array();
		$node = D('nodes');
		$data['name'] = $name;
		$data['cname'] = $cname;
		$data['id'] = $id;
		$data['lng'] = $coorlport;
		$data['lat']=$coorrport;
		$data['addr']=$addr;
		//$node->add($data);
		 
		
		$result = $node->add($data);
            if($result) {
              redirect(__APP__, 3, '添加成功');
				header("Location: __APP__");
            }else{
                echo no;
            }	
		
		//echo $node->getLastSql();
		//$data 

	}

	public function index(){
		$nodes = M('nodes')->order('id')->select();
		//print_r($nodes);die();

		$fields = array('create_time');	
		
		/*
		foreach($nodes as &$item)
		{
			//p($item);
			$id = $item['id'];
			//p($id);
			$where = array('nodeid' =>$id);
			
			$res = M('node_query')->where($where)->field($fields)->order('create_time desc') ->limit(1)->find();
			print_r($res);die();
			if($res)
			{
				$time = $res['create_time'];
				$item['create_time'] = $time; 
			}
		}
		*/
		
		//$this->nodes = $nodes;
		$this->assign('nodes',$nodes);
		$this->display();
	}


	public function del(){
		$nodes = M('nodes')->order('id')->select();
		//print_r($nodes);
		$this->assign('nodes',$nodes);
		$this->display();
	}
	/*
	*	删除的节点名称
	*/
	public function delnodes(){	
		
		//$pid=$this->_POST('id');
		$pid =I('id');
		


		//echo $pid;die();

		$nodes = M(nodes);
		$nodes->where('id='.$pid)->delete();
		//echo $nodes->getLastSql();

		if(nodes){

			
			header('Content-Type:text/html;Charset=UTF-8');
			redirect(__APP__,1,'删除成功');
		}else{
			header('Content-Type:text/html;Charset=UTF-8');
			redirect(__APP__,1,'删除失败');
		}


	}

	public function editornode(){
		/*
		*取得节点的名称
		*/

		$pid =I('id');
		$where = array('id'=>$pid);
		$fields =array('name','cname','id','addr');	
		$nodes = M('nodes')->field($fields)->where($where)->find();
		header('Content-Type:text/html;Charset=UTF-8');
		//print_r($nodes);
		//分配变量
		$this->nodes=$nodes;

		$this->display();
	}

	/*
	*修改节点的信息
	*/
	public function editbasic(){
		//if(!$this->isPost){
		//	halt('页面不存在');
		//}

		//print_r($_POST);
		//echo 123;
		$data = array(
			'id' => (int)$_POST['number'],
			'name' =>$_POST['name'],
			'cname' =>$_POST['cname'],
			'addr' =>$_POST['addr'],
			);
		//打印出数组
		//print_r($data);
		$result=M('nodes')->save($data);
		//echo $nodes->	getLastSql();
		//echo $nodes->error();
		// /$nodes->getLastSql();
		
		//$nodes->getlastsql();
		if($result){
			header('Content-Type:text/html;Charset=UTF-8');
			echo '修改成功';
		}else{
			header('Content-Type:text/html;Charset=UTF-8');
			echo '修改失败';
		}
		//echo $dd->getLastSql();
		/*
		if(M('nodes')->save($data)){

			$this->success('修改成功',U('del'));
		}else{

			$this->error('修改失败');
		}
	
		echo $node->getLastSql();
		*/
	}


}





?>