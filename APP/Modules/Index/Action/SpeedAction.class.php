<?php
/*
首页
*/

//require_once("Mobile-Detect-2.8.22/Mobile_Detect.php");

class SpeedAction extends Action {
	public function index()
	{
		$user = I('user');
		$desc = I('desc');
		//p($user);p($desc);die;
		
		$this->display();
	}
	
	
	/***介绍相关的信息*/
	public function introduce()
	{
		//p($this->targetNum);die;
		$this->display("introduce");
	}
	public function option(){
		$this->targetNum = $this->createTargetNum();
		//p($this->targetNum);die;
		//p($this->targetNum);
		//$id = $ret;
		//p($id);
		
		$result = $this->storeTargetNum($id, $this->targetNum);
		//p("$result"+$result);
		if(!result)
		{
			p("no target");
		}else
		{
			//p("target");
		}
		$this->display("option");
	}
	public function testResult(){
		$id = I('id');
		$choice = I('choice');
		p($id);
		p($choice);
		$data['choice'] = $choice;
		$where = array("id"=>$id);
		$ret = M('numbertest')->where($where)->save($data);	
		echo json_encode($ret);
	}
	
	/***正式开始实验*/
	public function beginTest()
	{
		$targetNum = I('targetNum');
		$desc = I('desc');
		if(!$targetNum){
                        $this->display("introduce");
			return;
		}

		//$this->numbers = $this->createMatrix();
		$this->numbers = $this->createNum(10);
		//p($this->numbers);die;

		$ret = $this->storeMatrix($targetNum, $this->numbers, $desc);
		$this->id = $ret;

		if($ret == -1)
			$this->error("产生数字错误，请联系管理员！");
		else
			$this->display("showNumbers");
	}

	/***/
	private function createData()
	{
		$this->numbers = $this->createMatrix();

		$ret = $this->storeMatrix($this->numbers);
		
		$this->targetNum = $this->createTargetNum();
		//p($this->targetNum);
		$id = $ret;
		//p($id);
		
		$result = $this->storeTargetNum($id, $this->targetNum);
		//p("$result"+$result);
		if(!result)
		{
			p("no target");
		}else
		{
			//p("target");
		}
		return $ret;
	}
	
	public function storeTargetNum($tableId, $targetNum)
	{
		$where = array('id'=>$tableId);
		$data['target'] = $targetNum; 
		$ret = M("numbertest")->where($where)->save($data);
		//p("ret:".$ret);
		if($ret == false)
			return false;
			
		return true;
	}
	/**生成一个target的目标数字*/
	public function createTargetNum()
	{
		$ret = 0;
		for($i=0;$i<100;$i++)
		{
			$ret = ($ret + rand(0,10)) % 10;
			//p($ret);
		}
		
		return $ret;
	}
	/**将产生的这些随机的数字存入到数据库表tb_numbertest中，作为一列numbers存入**/
	private function storeMatrix($target, $numbers, $desc)
	{
		$jsonStr = json_encode($numbers);
		//p($jsonStr);
		$data = Array("numbers"=>$jsonStr, "target"=>$target, "desc"=>$desc);
		$ret = M('numbertest')->add($data);
		//p(M('numbertest')->getLastSql());
		//p($ret);die;
		if($ret)
		{
			return $ret;
		}else{  
			return -1;  
		}  
	}
	
	public function createMatrix()
	{
		//p('ddddddddddddddd');die;
		$numbers = $this->createNum(175);
		//p($this->numbers);die;
		
		return $numbers;
	}
	

	//产生10*$num个随机数字
	public function createNum($num)
	{
		/*
		$num = I('num');
		$num = intval($num);
		*/
		if(!$num || $num<=0)
			return null;
		
		$arr = array();
		//$i代表十个数字，每个数字放入$num次
		for($i=0;$i<10;$i++)
		{
			for($j=0;$j<$num;$j++)
			{
				array_push($arr, $i);
			}
		}
		/*
		p($arr);
		p("0000000000000");
		*/
	
		//将这些数字随机打乱100次	
		for($i=0;$i<100;$i++)
		{
			usort($arr, array($this,"randomsort"));
			//console.log(series);
		}		
		//p($arr);
		
		return $arr;
	}
	
	function randomsort($a, $b) {  
		$ret = rand(0, 1)>.5 ? -1 : 1;  
		//p($ret);
		return $ret;
		//用Math.random()函数生成0~1之间的随机数与0.5比较，返回-1或1  
	}  
}
?>
