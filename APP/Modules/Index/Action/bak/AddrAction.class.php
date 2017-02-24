<?php
/*
สืาณ
*/
class AddrAction extends Action {
	public function ip2geo($ip)
	{	
		if(!$ip)
			return "--";
			
		$record = geoip_record_by_name($ip);
		
		$city_name = "";
		$country_name = "";
		if($record)
		{
			$country_name = $record['country_name'];
			$city_name = $record['city'];
			//p($city_name."-".$country_name);
			if($city_name and $country_name)
				return $city_name."-".$country_name;
			else
				return $city_name?$city_name:$country_name;
		}else
		{
			return "--";
		}
	
	}
}
?>