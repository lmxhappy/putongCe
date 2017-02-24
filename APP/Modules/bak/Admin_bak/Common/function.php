<?php
function node_merge($node, $access=null, $pid=0) {
	$arr = array();
	//print_r($access);
	foreach($node as $v) {
		if(is_array($access))
		{
			$v['access'] = in_array($v['id'], $access)?1:0;
		}
		if($v['pid'] == $pid) {
			$v['child'] = node_merge($node, $access, $v['id']);
			$arr[] = $v;
		}
	}
	return $arr;
}

function verify_code_filter(&$value)
{
	$value = strtolower($value);
}
?>