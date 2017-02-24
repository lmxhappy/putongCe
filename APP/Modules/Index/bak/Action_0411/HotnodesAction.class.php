<?php

/**
@ids: 一个存储节点号的数组
*/
class HotnodesAction extends Action {
	function accessNum($ids) {
		if(count($ids)== 0)
			return 0;
		foreach($ids as $id)
		{		
			$where = array('id'=>$id);
			//p($id);
			//$click = M('nodes')->where($where)->getField('click');
			M('nodes')->where($where)->setInc('accessNum');
		}
		//p($ids);die;
		return 0;
	}
	
	/**获取accessNum前$num的节点*/
	function getHotNodes($num)
	{
		$nodes = M('nodes')->order('accessNum desc')->limit($num)->select();
		//p($nodes);die;
		return $nodes;
	}
}


?>