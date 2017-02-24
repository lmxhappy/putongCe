<?php
class CommentViewModel extends ViewModel {
	
	protected $viewFields = array(
		'Blog_comments' => array(
			'id', 'bid', 'comment', 'time', 'uid','snum', 'onum',  '_type'=>'LEFT'
		),
		'Indexuser' => array(
			'email', '_on' => 'blog_comments.uid = indexuser.id'
		),
	);
	
	Public function getAll($bid, $fields, $limit=10)
	{
		$where = array('bid'=>$bid);
		return $this->where($where)->limit($limit)->field($fields)->order('blog_comments.id')->select();
	}
}
?>