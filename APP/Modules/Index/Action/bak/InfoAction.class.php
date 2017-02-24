<?php
/**
2014.04.11
*/
class InfoAction extends Action {

	protected $ipaddr = "";
	
	public function index()
	{
		$this->display();
		
	}
	
	/**$type 
	1=>trace
	2=>ping
	3=>reverseDNS
	4=>ipwhois
	5=>geo
	6=>portdect
	*/
	public function getInfo($type)
	{
		if($type <= 0)
		{
			p("wrong type");
			return;
		}
		
		$target = I('addr');
		$type = I('type');
		//p($target);
		if(!$target || !$type)
		{
			echo "no ip or type";
			return;
		}
		else
			$this->ipaddr = $target;
		
		switch($type)
		{
			case 1:
				/**查询IP地址各项信息*/
				$this->traceroute();
				break;
			case 2:
				$this->ping();
				break;
			case 3:
				$this->reverseDNS();
				break;
			case 4:
				$this->ipwhois();
				break;
			case 5:
				$this->geo();
				break;
			case 6:
				$this->portdect();
				break;
		}
	}
	private function geo()
	{
	
	}
	private function portdect()
	{
	
	}
	private function traceroute()
	{
		$cmd = "traceroute ".$this->ipaddr;
		exec(cmd,$outPut);
		p($outPut);
	}
	
	private function ping()
	{		
		$cmd = "ping ".$this->ipaddr;
		exec(cmd,$outPut);
		p($outPut);
	}
	
	private function reverseDNS()
	{
		$cmd = "dig -x ".$this->ipaddr;
		exec(cmd,$outPut);
		p($outPut);
	}
	
	private function ipwhois()
	{
		$cmd = "whois ".$this->ipaddr;
		exec(cmd,$outPut);
		p($outPut);
	}
}
?>
