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
	
	public function getInfo()
	{
		$target = I('item');
		//p($target);
		
		$this->ipaddr = $target;
		
		/**查询IP地址各项信息*/
		$this->traceroute();
		$this->ping();
		$this->reverseDNS();
		$this->ipwhois();
	}
	
	private function traceroute()
	{
		//p($this->ipaddr);
		$item =  $this->ipaddr;
		exec("traceroute $item",$outPut);
		p($outPut);
	}
	
	private function ping()
	{		
		$item =  $this->ipaddr;
		exec("ping $item",$outPut);
		p($outPut);
	}
	
	private function reverseDNS()
	{
	}
	
	private function ipwhois()
	{
	}
}
?>
