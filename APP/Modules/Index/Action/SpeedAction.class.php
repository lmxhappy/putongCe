<?php
/*
首页
*/

//require_once("Mobile-Detect-2.8.22/Mobile_Detect.php");

class SpeedAction extends Action {
	public function index()
	{
		$this->display();
	}
	
	
	/***介绍相关的信息*/
	public function introduce()
	{
		
	}
	
	/***正式开始实验*/
	public function beginTest()
	{
		$ret = $this->createData();
		
		if($ret == -1)
			$this->error("产生数字错误，请联系管理员！");
		else
			$this->display();
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
	private function storeMatrix($numbers)
	{
		$jsonStr = json_encode($numbers);
		//p($jsonStr);
		$data = Array("numbers"=>$jsonStr);
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
	
	public function createNum($num)
	{
		/*
		$num = I('num');
		$num = intval($num);
		*/
		if(!$num || $num<=0)
			return null;
		
		$arr = array();
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
