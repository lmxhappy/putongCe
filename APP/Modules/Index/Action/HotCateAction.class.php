<?php

/**
@module: 一个存储category（模块）的数组
*/
class HotCateAction extends Action {
	function accessNum($module) {
		$module = $module[0];
		if(!$module)
			return -1;
			
		$where = array('module'=>$module);
		
		M('cate')->where($where)->setInc('accessNum');
	
		return 0;
	}
	
	/**获取accessNum前$num的节点*/
	function getHotNodes($num)
	{
		$nodes = M('cate')->order('accessNum desc')->limit($num)->select();
		
		return $nodes;
	}
}


?>