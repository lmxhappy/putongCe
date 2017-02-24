<?php
class SubjectlinkViewModel extends ViewModel {
	
	protected $viewFields = array(
		'subjects' => array(
			'*',  '_type'=>'LEFT'
			
		),

		'links' => array(
			'*', '_on' => 'subjects.username = links.userName'
		),
	);
	
	Public function getAll($where)
	{
		// = array();
		return $this->where($where)->select();
	}
}
?>