<?php

/**
@module: һ���洢category��ģ�飩������
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
	
	/**��ȡaccessNumǰ$num�Ľڵ�*/
	function getHotNodes($num)
	{
		$nodes = M('cate')->order('accessNum desc')->limit($num)->select();
		
		return $nodes;
	}
}


?>