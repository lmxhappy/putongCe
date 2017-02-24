<?php
/* 前台用户中心控制器 */
class IndexUserAction extends Action{
	/*会员中心首页*/
	Public function index(){
		
		if(!isset($_SESSION['username'])){
			redirect(U('Login/index'),2,'<p style="font-size:20px; color:blue; padding-top:200px; padding-left:510px;">aOh! 您还未登录，请先登录！</p>');
		}
		$this->username = session('username');
		$id = session('uid');
		$where = array('id'=>$id);
		$fields = array('id', 'email', 'logintime', 'location', 'desc');
		$this->user = M('indexuser')->where($where)->field($fields)->find();
		//p($user);die;
		$this->assign('page',$show);// 赋值分页输出      //输出页码 
		$this->assign('pages',$shows);// 赋值分页输出      //输出页码 
		$this->assign('noover',$noover);// 赋值数据集
		$this->assign('over',$over);// 赋值数据集
		$this->display('huiyuan');
	}
	
	
	/* 基本资料 设置*/
	Public function settings(){
		if(!isset($_SESSION['uid']))
		{
			redirect(U('Login/index'),2,'<p style="font-size:20px; color:blue; padding-top:200px; padding-left:510px;">aOh! 您还未登录，请先登录！</p>');
		}
		$db=M('indexuser');
		$id = session('uid');
		//$username = session('username');
		//p($_SESSION);
		//p($id);
		//p($_SESSION['uid']);
		$where = array('id'=>$id);
		$fields = array('id', 'email', 'logintime', 'location', 'desc');
		$this->user = M('indexuser')->where($where)->field($fields)->find();
		//p($this->user);die;
		//die;
		$this->display('settings');
	}
	
	/* 资料修改 */
	Public function runZiLiao(){
		if(!isset($_COOKIE['user'])){
			redirect(U('Login/index'),2,'<p style="font-size:20px; color:blue; padding-top:200px; padding-left:510px;">aOh! 您还未登录，请先登录！</p>');
		}
		if(!$this->isPost()){
			$this->error('页面不存在');
		}
		$data=array(
			'phone'=>$this->_post('phone'),
			'truename'=>$this->_post('truename'),
			'sex'=>$this->_post('sex'),
			'QQ'=>$this->_post('QQ'),
			'location'=>$this->_post('dizhi'),
		);
		if(M('indexuser')->where(array('truename'=>$_COOKIE['user']))->save($data)){
			$this->success('修改成功');
		}else{
			$this->error('修改失败');
		}
	}
	/* 修改密码 */
	Public function editPwd(){
		if(!isset($_COOKIE['user'])){
			redirect(U('Login/index'),2,'<p style="font-size:20px; color:blue; padding-top:200px; padding-left:510px;">aOh! 您还未登录，请先登录！</p>');
		}
		$this->display('huiyuan_pwd');
	}
	Public function runEditPwd(){
		if(!isset($_COOKIE['user'])){
			redirect(U('Login/index'),2,'<p style="font-size:20px; color:blue; padding-top:200px; padding-left:510px;">aOh! 您还未登录，请先登录！</p>');
		}
		if(!$this->isPost()){
			$this->error('页面不存在');
		}
		/*p($old);die; */
		$old=$this->_post('oldpassword',md5);
		$new=$this->_post('newpassword',md5);
		$repwd=$this->_post('repassword',md5);
		$oldpwd=M('indexuser')->where(array('truename'=>$_COOKIE['user']))->getField('password');
		if($old!=$oldpwd){
			$this->error('旧密码不正确');
		}elseif($new!=$repwd){
			$this->error('重复密码不正确');
		}else{
			if(M('indexuser')->where(array('truename'=>$_COOKIE['user']))->save(array('password'=>$new))){
				cookie('user',null);
				cookie('phone',null);
				cookie('dizhi',null);
				cookie('dzyx',null);
				$this->success('修改成功','__APP__');
			}else{
				$this->error('修改失败');
			}
		}
	}
}
?>