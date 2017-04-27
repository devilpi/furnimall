_**furnimall**_

a project of web courses
 
需要的支持环境：**node.js tomcat java typescript**

1.首先在 intellij idea 中选择`vcs —> check out from version control`将整个项目checkout到本地

2.然后需要对`file -> project structure `进行配置 选择`library`一项，删去其中标红的jsp-api servlet-api,选择添加Java将本地tomcat/lib中的jsp-api.jar servlet-api.jar两个文件导入   

3.选择`Run -> edit configurations`  点击`＋`，选择`tomcat server->local`(可能需要手动配置application server，指定tomcat所在文件夹），若出现*warning：No artifacts marked for deployment*, 点击右侧*fix*或手动选择`deployment->＋->Atifact`即可   

4.注意`furnimall\src\main\webapp` 目录下的`server.js`，这是聊天系统的mini-server， 如果你已经安装了node.js 并配置好环境变量，可以在该路径下使用命令行运行 `node server.js`以使其正常运行   

5.以上工作完成后，在intellij中选择运行，耐心等待一分钟左右，即可在浏览器中进入web项目的主页