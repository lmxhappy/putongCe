<?php
class CategoryAction extends CommonAction
{
	//分类列表
	public function index()
	{
			import('Class.Category', APP_PATH);
			$cate = M('cate')->order('sort ASC')->select();
			$cate = Category::unlimitedForLevel($cate, '&nbsp&nbsp--');
			
			$this->cate = $cate;
			$this->display();
	}
	
	public function addCate()
	{
		$this->pid = I('pid', 0, 'intval');
		$this->display();
	}
	
	public function runAddCate()
	{
		if(M('cate')->add($_POST))
		{
			$this->success("添加成功", U(GROUP_NAME.'/Category/index'));
		}
		else
		{
			$this->error("添加失败");
		}
	}
	
	public function sortCate()
	{
		$db = M('cate');
		
		foreach ($_POST as $id=>$sort)
		{
			$db->where(array('id'=>$id))->setField('sort', $sort);
		}
		
		$this->redirect(GROUP_NAME.'/Category/index');
	}
	
	//删除分类
	public function delete()
	{
		$id = I('id', 0, 'intval');
		if(M('cate')->where(array('id'=>$id))->delete())
		{
			$this->success("删除成功", U(GROUP_NAME.'/Category/index'));
		}
		else
		{
			$this->error("删除失败");
		}
	}
}
?>