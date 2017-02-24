<?php
class AttributeAction extends CommonAction
{
	//分类列表
	public function index()
	{
		$this->attr = M('attr')->select();
		$this->display();
	}
	
	public function addAttr()
	{
		$this->display();
	}
	
	//添加表单处理
	public function runAddAttr()
	{
		//p($_POST);
		//die;
		if(M('attr')->add($_POST))
		{
			$this->success("添加成功", U(GROUP_NAME.'/Attribute/index'));
		}
		else
		{	
			$this->error("添加失败");
		}
	}
}
?>