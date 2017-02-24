<?php
//后台登录控制
class LoginAction extends Action{
	//后台登录模板输出
	public function index(){
		// => http://localhost/blog/24.html
		//$_SERVER['HTTP_REFERER]
		//p($_GET);die;
		$this->module = I('module', 'Index');
		$this->id = I('id', 0);

		$this->display('login');
	}
	//登录方法
	public function login (){
	
		//if(!IS_POST) halt("页面不存在");
		/*
		p($_POST);
		p($_GET);*/
		//p(I('code', '', 'strtolower'));
		//p(session('verify'));
		
		if(I('code', '', 'strtolower') != session('verify'))
		{
			$this->error("验证码错误");
		}
		
		$username= I('username');
		//p($_POST);
		
		$pwd = I('password', '', 'md5');
		//p($pwd);
		
		$user = M('indexuser')->where(array('email'=>$username))->find();
		//p($user);
		//p($user['password']);
		//echo "\n";
		//print_r($pwd);
		//die;
		if(!$user || $user['password'] != $pwd)
		{
			$this->error("账号或密码错误");
		}
		
		if($user['lock'])
			$this->error("用户被锁定");
			
		//更新一下最后登录时间和IP
		$data = array(
			'id'=> $user['id'],
			'logintime' =>time(),
			'loginip' => get_client_ip(),
		);
		
		M('indexuser')->save($data);
	
		//session(C('USER_AUTH_KEY'), $user['id']);
		session('uid', $user['id']);
		session('username', $user['email']);
		session('logintime', date('Y-m-d H:i:s', $user['logintime']));
		session('loginip', $user['loginip']);
	
		//超级管理员识别
		if($user['email'] == C('RBAC_SUPERADMIN'))
		{
			session(C('ADMIN_AUTH_KEY'), true);
		}
		
		//读取用户权限
		import('ORG.Util.RBAC');
		RBAC::saveAccessList();
	
		//p($_GET);die;
		$module = $_GET['module'] ? $_GET['module']:'Index';
		$id = $_GET['id']? $_GET['id']: 0;
	
		$this->myRedirect($module, $id);
		//redirect($_SERVER['HTTP_REFERER']);
		//$this->redirect(GROUP_NAME.'/Index/index');
		//redirect(GROUP_NAME.'/Index/index');
	}
	
	//跳转到登录前的页面上
	public function myRedirect($module,$id)
	{
		switch($module)
		{
			case 'Index':
				redirect(__ROOT__);
				break;
			case 'List':
				redirect(__ROOT__.'/c_'.$id);

				break;
			case 'Show':
				//p('Show');
				//die;
				redirect(__ROOT__.'/'.$id);
				//redirect('baidu.com');
				break;
			default:
				redirect(__ROOT__);
				break;
		}
	}
	//退出登录
	Public function loginOut(){
		cookie('user',null);
		cookie('phone',null);
		cookie('dizhi',null);
		cookie('dzyx',null);
		
		session_unset();
		session_destroy();
		//$this->redirect(GROUP_NAME.'/Login/index');
		
	//	p(I('module', 'Index'));
		$module = $_GET['module'] ? $_GET['module']:'Index';
		$id = $_GET['id']? $_GET['id']: 0;
		
		/*
		p($id);
		p($module);
		die;
		*/
		$this->mySuccess($module,$id);
	}
	
	public function mySuccess($module,$id)
	{
		switch($module)
		{
			case 'Index':
				$this->success('退出成功，正在跳转...',__ROOT__);
				break;
			case 'List':
				$this->success('退出成功，正在跳转...', __ROOT__.'/c_'.$id);

				break;
			case 'Show':
				//p('Show');
				//die;
				$this->success('退出成功，正在跳转...', __ROOT__.'/'.$id);
				//redirect('baidu.com');
				break;
			default:
				$this->success('退出成功，正在跳转...', '__ROOT__');
				break;
		}
	}
	//引入验证码
	public function yzm(){
		import('ORG.Util.Image');
		Image::buildImageVerify(4,1,'png',70,30);
	}
	
	public function verify()
	{
		/*
		import('ORG.Util.Image');
		Image::buildImageVerify(1, 1, 'png', 80, 25);
		*/
		//p(session('verify'));die;
		import('Class.Image', APP_PATH);
		Image::verify();
	}
	
	public function getuser()
	{
		$user = I('username');
		$where = array('username'=>$user);
		if(!M('indexuser')->where($where)->find())
		{
			echo 1;
		}
		else
			echo 0;
	}	
	
}//end



?>