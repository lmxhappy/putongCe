<?php

class LoginAction extends Action {
	public function index(){

		$this->display();
	}


	public function logout()
	{
		session_destroy();
		
		header('Content-Type:text/html;Charset=UTF-8');
		$this->redirect('/Admin/Index/index', '退出成功，正在为您跳转...');
	}

	/*
	*	处理登陆的方法
	*/
	public function login(){
		/*
		if(!$this->isPost()){
			halt('页面不存在');
		}
		*/
		//print_r($_POST);die();

	
		$username = $this->_POST('user');
		$pwd = $this->_POST('pwd','md5');
		
	//	print_r($pwd);die();
		$where  = array('username'=>$username);
		$user=M('user')->where($where)->find();	
		//echo M()->getLastSql();die();
		//print_r($user);die();
	

		//检查用户名
		if(!$user){
			$this->error('用户不存在');
		}

		//检查密码
		if($user['password'] != $pwd){
			$this->error('密码错误');
		}


		session('uid',$user['id']);
		

		/*
		*	判断session
		*/
		  //打印出sesion里面的信息
		// var_export($_SESSION);die();
		
		var_dump($_SESSION);
		header('Content-Type:text/html;Charset=UTF-8');
		//redirect('__APP__/Admin/Index', 1, '页面跳转中...');
		//$this->redirect('Index/index', 1, '登录成功，正在为您跳转...');
		//header("Location: __APP__");
		//$this->redirect('/',1,'挑战');
		//redirect('/Admin/Index/index');		
			//redirect(U('Index/index'));
		//redirect(__GROUP__);
		redirect('/Admin/Index/index');
	}


	/*
	* 	验证码使用
	*/
	Public function verify(){
		import('ORG.Util.Image');
		Image::buildImageVerify(4,1);
 	}





 	/*
	*	显示注册页面
 	*/
 	public function register(){


 		$this->display();
 	}

 	/*
 	*	注册处理方法
 	*/

	public function runRegis(){
		//print_r($_POST);die();
		//第一步
		//能够打印出post的数据


		if(!$this->isPost()){
			halt('页面不存在');
		}

		if($_POST['passwd']!= $_POST['passwded']){
			$this->error('两次密码不一致');
		}
		
			$data= array(
			'username'=>$this->_post('account'),
			'passwd'=>$this->_POST('passwd','md5'),
			'regtime'=>$_SERVER['REQUEST_TIME'],
			/**
			*	关联模型
			*	'userinfo'=>array(
			*		'username'=>$this->_post('uname')
			*	)
			*/
		
			);

			//检查data这个数组
			//print_r($data);die();

			$id =D('User')->insert($data);
			

			//echo M()->getLastSql();die;
			//能够打印出这个正确的insert语句

			if($id){
			//插入数据成功后把用户id写入session
			session('uid',$id);
			//跳转到首页
				header('Content-Type:text/html;Charset=UTF-8');
				redirect(__APP__,3,'注册成功,正字为您跳转');
			}else{
				header('Content-Type:text/html;Charset=UTF-8');
				$this->error('注册失败');
		}

	}

	/*
	*	一个测试方法
	*/


	public function ceshi(){

		$this ->display();


	}

	public function update(){

		print_r($_POST);
	}


}
	
	

?>
