<?php
/*
首页
*/

require_once("Mobile-Detect-2.8.22/Mobile_Detect.php");

class IndexAction extends Action {
	public function index()
	{
		/*
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
	
		$this->nodes = $nodes;*/
		
		
		$ret = $this->urlIsIntegrity();
		if(!$ret)
		{
			$this->display('tip');
			return;
		}
		
		$this->recordClientInfo();
		
		
		if(!$this->userAgentOk())
		{
			$this->display('error');
		}
		else
		{
			$this->display();
		}
	}
	
	/**获得id*/
	public function getId()
	{
		$username = I('username');
		if(!$username)
		{
			echo "{}";
		}
		
		$arr = array(
			"userName" => $username
		);
		$ret = M('link')->where($arr)->find();
		//p($ret);
		
		$id = $ret['id'];
		if(!$id)
			echo "{}";
		
		$response = array(
			'id'=>$id
		);
		
		echo json_encode($response);
	}
	
	
	/***如果用户适合做实验，那么就返回true，否则返回false*/
	public function userAgentOk()
	{
		$detect = new Mobile_Detect();
		// Exclude tablets.
		if( $detect->isMobile() && !$detect->isTablet() ){
			//p('mobile or tablet');
			
			return false;
		}
		else
		{
			//p('pc');	
			//M('client')->
			return true;
		}
	}
	
	/**记录用户的一些基本信息*/
	function recordClientInfo()
	{
		$userAgent = $_SERVER['HTTP_USER_AGENT'];
		//p($userAgent);
			
		$clientIp = $this->getIPaddress();
		//p($clientIp);
		
		$userid = I('id');
		//p($userid);
		
		$data = array(
			"userId" => $userid,
			"browser" => $userAgent,
			"ip" => $clientIp
		);
		
		//p($data);
		
		$ret = M('client')->add($data);
		//p($ret);
		
		if($ret >= 0)
			return true;
		
		return false;
		//P(M('client')->getLastSql());
	}
	
	function urlIsIntegrity()
	{
		$userid = I('id');
		if(!$userid || !is_numeric($userid))
		{
			//p('false');
			return false;
		}
		
		return true;
	}
	
	function getIPaddress()
	{
		$IPaddress='';
		if (isset($_SERVER)){
			if (isset($_SERVER["HTTP_X_FORWARDED_FOR"])){
				$IPaddress = $_SERVER["HTTP_X_FORWARDED_FOR"];
			} else if (isset($_SERVER["HTTP_CLIENT_IP"])) {
				$IPaddress = $_SERVER["HTTP_CLIENT_IP"];
			} else {
				$IPaddress = $_SERVER["REMOTE_ADDR"];
			}
		} else {
			if (getenv("HTTP_X_FORWARDED_FOR")){
				$IPaddress = getenv("HTTP_X_FORWARDED_FOR");
			} else if (getenv("HTTP_CLIENT_IP")) {
				$IPaddress = getenv("HTTP_CLIENT_IP");
			} else {
				$IPaddress = getenv("REMOTE_ADDR");
			}
		}

		return $IPaddress;
	}
	
	/* 重置密码 */
	Public function editPwd(){
		$this->display();
	}
	
	Public function getParams(){
		$id = I("id");
	//	p($id);
		
		$test = M('link')->where(array('id'=>$id))->find();
	//	p($test);
		//die;
		
		//$this->Params = $test;
		
		echo json_encode($test);
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