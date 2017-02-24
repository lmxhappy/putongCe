<?php
return array(

	'RBAC_SUPERADMIN' => 'admin',
	'ADMIN_AUTH_KEY' => 'superadmin',
	'USER_AUTH_ON'=> true,
	'USER_AUTH_TYPE'=>1,	//1登录验证（下一次登录才生效），2：实时验证
	'USER_AUTH_MODEL' => 'User',
	'USER_AUTH_KEY' => 'uid',	//用户认证识别号，存储在session
	'NOT_AUTH_MODULE'=>'Index', //无须认证的控制器
	'NOT_AUTH_ACTION' =>'addUserHandle,addNodeHandle,setAccess,addRoleHandle',
	'RBAC_ROLE_TABLE' => 'deby_role', //角色表名称
	'RBAC_USER_TABLE'=> 'deby_role_user', //角色与用户的中间表名称
	'RBAC_ACCESS_TABLE'=>'deby_access',//权限表
	'RBAC_NODE_TABLE'=>'deby_node', //节点表
	
	//'配置项'=>'配置值'
	'TMPL_PARSE_STRING' => array(
		'__PUBLIC__' => __ROOT__.'/'.APP_NAME.'/Modules/'.GROUP_NAME.'/Tpl/Public',
	),
	//'DB_DSN' => 'mysql://root@localhost:3306/thinkphp'

);
?>