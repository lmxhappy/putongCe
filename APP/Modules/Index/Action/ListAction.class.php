<?php
/*
首页
*/
class ListAction extends Action {
	public function index()
	{
		//p($_GET);die;
		$id = (int)$_GET['id'];
		$cate = M('cate')->order('sort')->select();
		import('Class.Category', APP_PATH);
		$cids = Category::getChildrenId($cate, $id);
		$cids[] = $id;
		
		$where = array('cid'=>array('IN', $cids));
		$count = M('blog')->where($where)->count();
		
		import('ORG.Util.Page');
		$page = new Page($count, 2);
		$limit = $page->firstRow.','.$page->listRows;
		//echo $limit;die;
		$this->blog = D('BlogView')->getAll($where, $limit);
		
		//为了餐单栏的登录与退出
		$this->module = 'List';
		$this->fid = $_GET['id'];
		
		$this->page = $page->show();
		$this->display();
	}
}
?>