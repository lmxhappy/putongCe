<?php
class BlogAction extends CommonAction
{
	//分类列表
	public function index()
	{
		$this->blog = D('BlogRelation')->getBlogs();
		//p($this->blog);die;
		//p($this->blog);die;
		$this->display();
	}
	
	//删除或还原
	public function toTrach()
	{
		$type = (int)$_GET['type'];
		
		$msg = $type ?  '删除':'还原';
		$update = array(
			'id' =>(int)$_GET['id'],
			'del' => $type
		);
		
		if(M('blog')->save($update))
		{
			$this->success($msg."成功", U(GROUP_NAME.'/Blog/index'));
		}
		else
		{
			$this->error($msg.'失败');
		}
	}
	
	public function delete()
	{
		$id = (int)$_GET['id'];
		//p($id);die;	
		if(M('blog')->delete($id))
		{	
			M('blog_attr')->where(array('bid'=>$id))->delete();
			$this->success("删除成功", U(GROUP_NAME.'/Blog/trach'));
		}
		else
		{	
			$this->error("删除失败");
		}
	}
	
	//清空回收站
	public function null()
	{
		$where = array('del'=>1);
		
		
		$rows = M('blog')->where($where)->select();
		foreach($rows as $v)
		{
			$id = $v['id'];
			if(M('blog')->delete($id))
			{	
				M('blog_attr')->where(array('bid'=>$id))->delete();
			}
		}
		$this->trach();

	}
	
	
	public function trach()
	{
		//$this->attr = M('attr')->select();
		$this->blog = D('BlogRelation')->getBlogs(1);
		$this->display('index');
	}
	
	public function blog()
	{
		//博文分类
		import('Class.Category', APP_PATH);
		
		$cate = M('cate')->order('sort')->select();
		$this->cate = Category::unlimitedForLevel($cate);
		
		//博文属性
		$this->attr = M('attr')->select();
		//p($attr);
		//die;
		$this->display();
	}
	
	//修改文章
	public function updateBlog()
	{
		import('Class.Category', APP_PATH);
		
		$cate = M('cate')->order('sort')->select();
		//文章类别
		$cate = Category::unlimitedForLevel($cate);
		
		//博文属性
		$attr = M('attr')->select();
	
		$id = (int)$_GET['id'];
		$this->bid = $id;
		if($blog =  D('BlogRelation')->getBlog_by_id($id)[0])
		{
			$this->content = $blog['content'];
			$this->title = $blog['title'];
		}
		
		//添加一项
		foreach($blog['attr'] as $v)
		{
			$id = $v['id'];
			
			foreach($attr as &$item)
			{
				if($item['id'] == $id)
				{
					$item['selected'] = 1;	
				}
			}
		}
		
		
		$c = $blog['cate'] ;
		foreach($cate as &$v)
		{
			if($c == $v['name'])
			{
				$v['selected'] =1 ;
			}
		}
		$this->cate = $cate;
		$this->attr = $attr;
		$this->click = $blog['click'];
		
		$this->display();
	}
	
	//修改文章 表单
	public function runUpdateBlog()
	{
		$id = $_POST['bid'];
		
		M('blog')->delete($id);
	
		M('blog_attr')->where(array('bid'=>$id))->delete();
		
		
		$this->addBlog(1, $id);
	}
	
	/*
	添加表单处理,type等于0是添加，1代表修改。id可以指定，主要为了修改时，保持id号不变
	*/
	public function  addBlog($type=0, $id = 0)
	{
		$data = array(
			'title' => $_POST['title'],
			'content' => $_POST['content'],
			'summary' => $_POST['summary'],
			'time' => time(),
			'click' => (int)$_POST['click'],
			'cid' => (int)$_POST['cid']		
		);
		if($id > 0)
			$data['id'] = $id;
		
		$msg = "添加";
		if($type == 1)
			$msg = "修改";
			
		if($bid = M('blog')->add($data))
		{	
			if(isset($_POST['aid']))
			{
				$sql = 'INSERT INTO `'.C('DB_PREFIX').'blog_attr`(bid, aid) VALUES';
				
				foreach ($_POST['aid'] as $v)
				{
					$sql .='('.$bid.','.$v.'),';
				}
				$sql = rtrim($sql, ',');
				
				M('blog_attr')->query($sql);
			}
			$this->success($msg."成功", U(GROUP_NAME.'/Blog/index'));
		}
		else
		{	
			$this->error($msg."失败");
		}
		
	}
	
	public function upload(){
		
		import("ORG.NET.UploadFile");
		$config =   array(
			'maxSize'           =>  -1,    // 上传文件的最大值
			'supportMulti'      =>  true,    // 是否支持多文件上传
			'allowExts'         =>  array('jpeg', 'jpg', 'gif', 'png'),    // 允许上传的文件后缀 留空不作后缀检查
			'allowTypes'        =>  array(),    // 允许上传的文件类型 留空不做检查
		    'autoSub'           =>  true,//
			'subType'           =>  'date',
        );
		$upload = new UploadFile($config);
		
		if($upload->upload('./Uploads/'))
		{
			$info  = $upload->getUploadFileInfo();
			//import('ORG.Util.image');
			echo json_encode(
				array(
				 'url' 	   => $info[0]['savename'],   //保存后的文件路径
				'title'    =>htmlspecialchars($_POST['pictitle'], ENT_QUOTES),   
				'original' => $info[0]['name'],        
				'state'    => 'SUCCESS'  
			));
		}
		else
		{
			echo json_encode(
				array(
					'state' => $upload->getErrorMsg()
			));
		}
	}
	

}
?>