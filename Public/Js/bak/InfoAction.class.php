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
	public function getInfo()
	{
	
		$target = I('addr');
		$type = I('type');
		//p($target);die;
		
		if($type <= 0)
		{
			p("wrong type");
			return;
		}
		
	
		if(!$target || !$type)
		{
			echo "no ip or type";
			return;
		}
		else
			$this->ipaddr = $target;
		//p($this->ipaddr);		p($type);
		$type = (int)$type;
		//echo is_integer($type);die;
		switch($type)
		{
			case 1:
				/**查询IP地址各项信息*/
				//p('traceroute');
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
			default:
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
			//p('tracerote');
		$item = $this->ipaddr;
		$cmd = "traceroute ".$item;
		exec($cmd,$outPut);
		p(join('\n', $outPut));
	}
	
	private function ping()
	{		
		$item = $this->ipaddr;
		$cmd = "ping ".$item." -c 3";
		exec($cmd,$outPut);
		p($outPut);
	}
	
	private function reverseDNS()
	{
		$item = $this->ipaddr;
		$cmd = "dig -x ".$item;
		exec($cmd,$outPut);
		p($outPut);
	}
	
	private function ipwhois()
	{
		$item = $this->ipaddr;
		$cmd = "whois ".$item;
		exec($cmd,$outPut);
		p($outPut);
	}
}
?>
