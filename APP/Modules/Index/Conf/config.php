<?php
return array(
	//¿ªÆô¾²Ì¬»º´æ
	'HTML_CACHE_ON' => true, 
	'HTML_CACHE_RULES' => array(
		'Show:index' => array('{:module}_{:action}_{id}', 2),
	),
);
?>