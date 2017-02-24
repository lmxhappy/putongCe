<?php
class AttackViewModel extends ViewModel {
	
	protected $viewFields = array(
		'nodes' => array(
			'id',  '_type'=>'LEFT'
		),
		'node_query' => array(
			 'create_time','_on' => 'nodes.id = node_query.nodeid', '_type'=>'LEFT'
		),
		'addr_list' => array(
			'list_content', '_on'=>'node_query.addr_list_key = addr_list.list_key'
		),
	);

	Public function getAll()
	{
		return $this->where($where)->select();
	}
	

}
?>