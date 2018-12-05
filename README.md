# DCS Ping Test 说明

DCS拥有多台服务器用来提供更新服务，并由主服务器进行分配。但分配的服务器并不是最优最快的。
通过这个工具，你可以看到本机到服务器的网速（ping）和丢包情况(package loss)，并可通过下载测试(Download Test)获取到真实的下载速度。当你找出了最优服务器，点击左侧Use，生成host内容，粘贴进本机的host文件中以达到自行选取更新主机的目的。

### 使用方法

1. 下载并安装Node JS运行环境 https://nodejs.org/en/，这里选择Current的版本。
2. 双击install.bat，并等待下载完成
2. 双击run.bat，等待ping test 结果
3. 依次点击Download Test，测试下载速度，找出下载最快的服务器，如“srv1update.digitalcombatsimulator.com”
4. 点击“srv1update.digitalcombatsimulator.com” 左侧的Use，程序会自动生成HOST内容
5. 将HOST代码粘贴到C:Windows\system32\drivers\etc\hosts文件中（修改这个文件前需要在右键属性中关闭该文件的写保护）