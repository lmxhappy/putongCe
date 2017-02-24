<?php
return array(
	//'配置项'=>'配置值'
	'DB_TYPE'	=>	'mysql', 
	'DB_HOST'	=>	'localhost', 
	'DB_NAME'	=>	'blog',
	'DB_USER'	=>	'root',
	'DB_PWD'	=>	'ccMrwtGUf2',
	'DB_PORT' 	=> 3306, 
	'DB_PREFIX'	=> 'tb_',
	
	//开启应用分组
	'APP_GROUP_LIST'	=>	'Index,Admin',
	'DEFAULT_GROUP'	=>	'Index',
	
	//开启独立分组
	'APP_GROUP_MODE' => 1,
	
	//独立分组文件夹名称
	'APP_GROUP_PATH' => 'Modules',
	
	'SHOW_PAGE_TRACE' => true,
	'URL_MODEL' => 2,
	//'TMPL_FILE_DEPR' => '_',
	//'DB_DSN' => 'mysql://root@localhost:3306/thinkphp',
	
	'LOAD_EXT_CONFIG' => 'verify',
	
	
	'URL_ROUTER_ON' => true, 
	'URL_ROUTE_RULES'=> array(
		'/^c_(\d+)$/' => 'Index/List/index?id=:1',
		':id\d' => 'Index/Show/index'
	),
);
?>
