<?php
/**
2014.04.11
*/
class InfoAction extends Action {

	protected $ipaddr = "";
	protected $dname = "";
	protected $type = 0;
	
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
		$data = I('data');
		$code = (int)I('code');
		$type= (int)I('type');
		
		
		if($type <= 0)
		{
			p("wrong type");
			return;
		}
		
	
		if(!$data || !$type || !$code)
		{
			echo "no ip or type or code";
			return;
		}
		
		$this->code = $code;
			
		/**�ж����������ǵ�ַ*/
		$t = $this->getInfoType($data);
		//if($t != $type)
		switch($t)
		{
			case 1:
				$this->ipaddr = $data;
				$this->getAddrInfo();
				break;
			case 2:
				$this->getDnameInfo($data, $code);
				break;
			default:
				break;
		}
	}
	
	private function getAddrInfo()
	{
		switch($this->code)
		{
			case 1:
				/**��ѯIP��ַ������Ϣ*/
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
		$geo = R('Addr/ip2geo',array($this->ipaddr));
		$res = array('result'=>array($geo));
		echo json_encode($res);
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
		//	p(join('\n', $outPut));
		
		$res = array('result'=>$outPut);
		echo json_encode($res);
	}
	
	private function ping()
	{		
		$item = $this->ipaddr;
		$cmd = "ping ".$item." -c 3 -w 5";
		exec($cmd,$outPut);
				$res = array('result'=>$outPut);
		echo json_encode($res);
	}
	
	private function reverseDNS()
	{
		$item = $this->ipaddr;
		$cmd = "dig -x ".$item;
		exec($cmd,$outPut);
		$res = array('result'=>$outPut);
		echo json_encode($res);
	}
	
	private function ipwhois()
	{
		$item = $this->ipaddr;
		$cmd = "whois ".$item;
		exec($cmd,$outPut);
		$res = array('result'=>$outPut);
		echo json_encode($res);
	}
	
	
	/**��ȡ������Ϣ*/
	private function getDnameInfo($dname, $code)
	{
		switch($code)
		{
			case 1:
				$this->whois($dname);
				break;
			default:
				break;
		}
	}
	
	
	private function whois($item)
	{
		$cmd = "whois ".$item;
		exec($cmd,$outPut);
		$res = array('result'=>$outPut);
		echo json_encode($res);
	}
	
	private function dig_dname()
	{
		
	}
	
	/**��ַ����1����������2
	����ʶ����-1
	*/
	private function getInfoType($str)
	{
		p($str);
		if($this->isDname($str))
			return 2;
		
		if($this->isAddr($str))
			return 1;
			
		return -1;
	}
	
	/**�ж��ַ����Ƿ�Ϊ����*/
	private function isDname($str)
	{
		 if(preg_match("/^([a-zA-Z0-9]([a-zA-Z0-9\-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,6}$/i", $str))
			return 1;

		return 0;
	}
	
		/**�ж��ַ����Ƿ�Ϊ����*/
	private function isAddr($str)
	{
		 if(preg_match("/\b(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\b/i", $str))
			return 1;

		return 0;
	}
}
?>
