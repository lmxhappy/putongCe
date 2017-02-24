<?php
/*
首页
*/
class IndexAction extends Action {
	public function index()
	{

		//为了餐单栏的登录与退出
		$this->module = 'Index';
		$this->fid = 0;
		
		//$fields = array('id', 'name', 'cname', 'lng', 'lat');
		//$nodes = M('nodes')->field($fields)->select();
		$nodes = M('nodes')->order('id')->select();
		
		$fields = array('create_time');	
		foreach($nodes as &$item)
		{
			//p($item);
			$id = $item['id'];
			//p($id);
			$where = array('nodeid' =>$id);
			
			$res = M('node_query')->where($where)->field($fields)->order('create_time desc') ->limit(1)->find();
			if($res)
			{
				$time = $res['create_time'];
				$item['create_time'] = $time; 
			}
		}
		
		
		$this->nodes = $nodes;
		
		$this->display();
	}
	
		/* 重置密码 */
	Public function editPwd(){
		$this->display();
	}
	
	Public function runEditPwd(){
		if (!$this->isPost()) {
			halt('页面不存在');
		}

		$db = M('indexuser');
		//验证手机
		$where = array('email' =>$this->_post('email'));
		$phone = $db->where($where)->getField('phone');

		if ($this->_post('pwd') != $this->_post('repwd')) {
			$this->error('两次密码不一致');
		}

		$newPwd = $this->_post('repwd', 'md5');
		$data = array(
			'password' => $newPwd
			);

		if ($db->where(array('email' =>$this->_post('email')))->data($data)->save()) {
			$this->success('密码重置成功','__APP__/Login/index');
		} else {
			$this->error('密码重置失败，请重试...');
		}
	}
	/* 
	*注册页面
	*/
	Public function register(){
		/*$status=M('system')->getField('REGIS_ON');
		
		if($status['0']['REGIS_ON']==1){
			$this->display('register');
		}else{
			echo '对不起，站点已关闭注册！';
		}*/
		$this->display('register');
	}
	
		/**
	*注册表单处理
	*/
	Public function runRegis(){
	
		if(!$this->isPost()){
			//halt('非法访问！');
			$this->error('非法访问！', U(GROUP_NAME.'/Index/register'));
		}
		//p($_SESSION['verify']);die;
		if($_SESSION['verify']!=$_POST['code']){
			$this->error('验证码错误！');
		} 
		if(!empty($_POST['email'])){
			if($_POST['pwd']!=$_POST['repwd']){
				$this->error('俩次密码不一致！');
			}
			$yz=M('indexuser')->where(array('email'=>$_POST['email']))->select();
			if($yz){
				$this->error('邮箱已存在，请更换后重试...');
			}
			//提取POST数据
			$data=array(
				'password'=>$this->_post('pwd','md5'),
				'registime'=>$_SERVER['REQUEST_TIME'],
				'userid'=>date('Ymd',time()).rand('0','999'),
				'email'=>$this->_post('email'),
				'lock'=>0
				
			);
			//p($data);die; 
			//插入数据
			if(M('indexuser')->data($data)->add()){
				//插入数据成功后把用户ID写入cookie
				cookie("user",$_POST['name'],86400*30);
				header('Content-Type:text/html;Charset=UTF-8');
				//redirect(__APP__,3,'注册成功，正在跳转...');
				/*
				if(mailto("孩子", 'admin@deby.cn'))
				{
					p("success");
				}
				*/
				//redirect("www.baidu.com");
				//redirect(__ROOT__,30,'注册成功，正在跳转...'.__ROOT__);
				redirect(U(GROUP_NAME.'Login/index'),20,'<p style="font-size:20px; color:blue; padding-top:200px; padding-left:510px;">注册成功，正在跳转到登录页面...</p>');
			}else{
				$this->error('注册失败，请重试...');
			}
		}else{
			$this->error('数据不完整，请补充');
		}
	}
}
?>