<?php

/**
@ids: һ���洢�ڵ�ŵ�����
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
	
	/**��ȡaccessNumǰ$num�Ľڵ�*/
	function getHotNodes($num)
	{
		$nodes = M('nodes')->order('accessNum desc')->limit($num)->select();
		//p($nodes);die;
		return $nodes;
	}
}


?>