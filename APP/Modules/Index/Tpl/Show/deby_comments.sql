create table deby_blog_comments(
id int(10) unsigned not null AUTO_INCREMENT primary key,
bid int(10) unsigned not null default 0,
comment text not null default '', 
time int(10) unsigned not null default 0
);