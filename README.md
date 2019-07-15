# DCS Ping Tester 

DCS Ping Tester (DPT)提供本机到DCS更新服务器的测速工具

## 简介

[DCS World](https://www.digitalcombatsimulator.com/)(DCS)在全球有多台服务器用来提供更新服务，更新提供了BT和HTTP两种方式。本人多次试验发现DCS的根服务器所分配的更新服务器并不一定是最快的，而且很有可能根本连不上。

通过DCS Ping Tester(DPT)，可以看到本机到更新服务器的网速（ping）、丢包情况(package loss)和下载速度(Download Test)。当你找出了最优服务器，DPT可生成Host内容，手工修改Host以达到自行选取更新主机的目的。

>  DPT的使用需要一定的动手能力

## 安装

1. 下载并安装[Node.JS](https://nodejs.org)运行环境，推荐选择LTS版本
1. 进入[项目](https://github.com/shinelith/dcs-ping-tester)页面，点击右上角绿色**Clone or download**按钮，选择**Download Zip**
1. 解压下载的文件
1. 双击**install.bat**，等待下载完成

## 如何使用

1. 双击**run.bat**，等待片刻，测速完成后会自动打开浏览器显示测速结果

2. 点击**Download Test**可以测试文件下载速度

   > 下载速度仅是作为一种参考，虽不能100%等同于DCS更新速度，但下载速度越快，DCS更新也会快，特别是在HTTP下载方式下更加明显

3. 点击**Use**生成Host内容

4. 全选内容并复制

5. 使用**记事本**打开`C:Windows\system32\drivers\etc\hosts`文件，并在文件尾部**另起一行**后**粘贴**、**保存**

   >  修改hosts文件前需要在右键属性中关闭该文件的写保护

6. 重新打开DCS_updater进行更新

## 删除设置

1. 使用**记事本**打开`C:Windows\system32\drivers\etc\hosts`文件

1. 找到`DCS Update HOSTS`

   ``` shell
   # DCS Update HOSTS
   # 请将下面的内容复制到C:\Windows\system32\drivers\etc\hosts中，并重新更新DCS。
   # 如果想恢复原样，请删除hosts文件中的类似内容。
   
   54.39.157.225 srv15update.digitalcombatsimulator.com 
   54.39.157.225 srv14update.digitalcombatsimulator.com 
   54.39.157.225 srv4update.digitalcombatsimulator.com 
   54.39.157.225 srv6update.digitalcombatsimulator.com 
   54.39.157.225 srv5update.digitalcombatsimulator.com 
   54.39.157.225 srv2update.digitalcombatsimulator.com 
   54.39.157.225 srv8update.digitalcombatsimulator.com 
   54.39.157.225 srv7update.digitalcombatsimulator.com 
   54.39.157.225 srv1update.digitalcombatsimulator.com 
   54.39.157.225 srv10update.digitalcombatsimulator.com 
   54.39.157.225 srv16update.digitalcombatsimulator.com 
   54.39.157.225 srv13update.digitalcombatsimulator.com 
   54.39.157.225 srv9update.digitalcombatsimulator.com 
   54.39.157.225 srv11update.digitalcombatsimulator.com 
   54.39.157.225 srv12update.digitalcombatsimulator.com 
   54.39.157.225 srv3update.digitalcombatsimulator.com 
   ```

1. 删除内容并保存

## 其他

DCS更新服务器多位于瑞士、德国，共有16个，地址如下:

> srv1update.digitalcombatsimulator.com
>
> srv2update.digitalcombatsimulator.com
>
> ......
>
> srv16update.digitalcombatsimulator.com