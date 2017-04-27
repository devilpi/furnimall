# furnimall
a project of web cources
需要支持环境：node.js tomcat java typescript

首先在intellij idea中选择vcs ——> check out from version control将整个项目checkout到本地

然后需要对file -> project structure 进行配置
  选择library一项，删去其中标红的jsp-api servlet-api,选择添加Java将本地tomcat/lib中的jsp-api.jar servlet-api.jar两个文件导入
  
选择Run -> edit configurations
  点击＋，选择tomcat server->local(可能需要手动配置application server，指定tomcat所在文件夹），若出现warning：No artifacts marked for deployment, 点击右侧fix或手动选择deployment->＋->Atifact即可
  
点击运行，耐心等待一分钟左右，即可在浏览器中进入web项目的主页
