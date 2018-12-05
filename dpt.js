/**
 * DCS Ping Tester
 * 
 * DCS拥有多台服务器用来提供更新服务，并由主服务器进行分配。但这个分配的服务器并不是最优的，可能速度很慢
 * 通过这个工具，你可以获取到这些服务器的网速（ping）和丢包情况，并可通过实际的下载测试获取到下载速度最快的服务器
 * 当你找出了最优服务器，可由本工具生成host信息，修改本机的host文件，以达到自行选取更新主机的目的
 * 
 * Author : LITH
 * Date 2018-12-3
 */
var ping = require('ping');
var util = require('util');
var express = require('express')
var opn = require('opn');
var os = require('os');

// dcs更新服务器地址列表
var dcs_update_site_hosts = [
];
// 服务器Top列表
var dcs_update_site_top_list = [];
// dcs 服务器二级域名有规律
for (var i =0; i < 19; i++) {
    dcs_update_site_hosts.push('srv' + (i + 1) + 'update.digitalcombatsimulator.com');
}
// 累计次数
var pingCount = 0;
// 每次发送ping包的数量
var pingTimes = 5;

// 依次ping服务器列表中的host
dcs_update_site_hosts.forEach(async function (host) {
    // ping host
    ping.promise.probe(host, {
        min_reply: pingTimes,
        timeout: 10,
    }).then(function (res) {
        pingCount++;
        var h = {
            'host': host,
            'cost_avg': res.avg,
            'ip': res.numeric_host,
            'packetLoss': 100
        };
        var platform = os.platform;
        if(platform == "win32"){ // Windows 
            if (res.output.indexOf('Ping') >= 0) {
                var regExp = /\[(.*)\]/g;
                h.ip = regExp.exec(res.output)[1];
            }
            if (res.output.indexOf('Ping') >= 0) {
                var regExp = /\((\d+)%/g;
                h.packetLoss = regExp.exec(res.output)[1];
            }
        } else { // MacOS
            if (res.output.indexOf('loss') >= 0) {
                var regExp = /(\d+.\d)%/g;
                h.packetLoss = regExp.exec(res.output)[1];
            }
        }
        dcs_update_site_top_list.push(h);

        // ping 完所有服务器
        if (pingCount == dcs_update_site_hosts.length) {
            dcs_update_site_top_list.sort(hostComparer()); // 排序
            showSiteTableHtml();    // 调用浏览器输出结果
        }
    });
});

/**
 * Host比较，根据丢包率和响应速度作为评判标注
 */
function hostComparer() {
    return function (a, b) {
        var q = 0;
        if (a.packetLoss < b.packetLoss) {
            q += 100;
        } else if (a.packetLoss > b.packetLoss) {
            q -= 100;
        }
        if (a.cost_avg < b.cost_avg) {
            q += 50;
        } else if (a.cost_avg > b.cost_avg) {
            q -= 50;
        }
        return -q; //降序
    }
}

/**
    在Console中打印host的信息
    @param {*} host 
*/
function printHost(host) {
    var blank = host.ip.length < 15 ? 15 - host.ip.length : 0;
    var ip = host.ip;
    for (i = 0; i < blank; i++){
        ip += ' ';
    }
    console.log(util.format("%s \t %s \t %dms \t %f% loss", host.host, ip, host.cost_avg, host.packetLoss));
}

/**
 *  将host信息转换为html tr行
 * @param {*} host 
 */
function toHtml(host) {
    tr = "<tr>";
    tr += util.format("<td><a href=\"use?host=%s\" target=\"_blank\">Use</a> ></td>", host.ip);
    tr += util.format("<td>%s</td>", host.host);
    tr += util.format("<td>%s</td>", host.ip);
    tr += util.format("<td>%dms</td>", host.cost_avg);
    tr += util.format("<td>%f%</td>", host.packetLoss);
    tr += util.format("<td><a href=\"http://%s/files/DCS_updater_64bit.zip\" target=\"_blank\">Download Test</a></td>", host.ip);
    tr += "</tr>";
    return tr;
}

/**
 *  输出为Host文件的格式
 * @param {*} host 
 */
function toHost(host) {
    return util.format("%s %s </br>", host.ip, host.host);
}

/**
 * 显示结果HTML页面
 */
function showSiteTableHtml() {
    var app = express();
    app.get('/', function (req, res) {
        var html = '<h2>DCS Ping Tester</h2>';
        html += "by LITH";
        html += "<p>DCS拥有多台服务器用来提供更新服务，并由主服务器进行分配。但分配的服务器并不是最优最快的。</br>通过这个工具，你可以看到本机到服务器的网速（ping）和丢包情况(package loss)，并可通过下载测试(Download Test)获取到真实的下载速度。当你找出了最优服务器，点击左侧Use，生成host内容，粘贴进本机的host文件中以达到自行选取更新主机的目的。</p>";
        html += "<table width='100%'><tr><th></th><th>HOST</th><th>IP</th><th>Ping</th><th>Package Loss</th><th></th></tr>";
        for (let host of dcs_update_site_top_list) {
            html += toHtml(host);
        }
        html += "</table>";
        res.send(html);
    });
    app.get('/use', function (req, res) {
        var html = '<h2># DCS Update HOSTS</h2>';
        html += "<p># 请将下面的内容复制到C:\\Windows\\system32\\drivers\\etc\\hosts中，并重新更新DCS。</br># 如果想恢复原样，青删除hosts文件中的类似内容。</p>";
        ip = req.query.host;
        for (let host of dcs_update_site_top_list) {
            host.ip = ip;
            html += toHost(host);
        }
        res.send(html);
    });
    app.listen(30492);
    opn('http://localhost:30492');
}