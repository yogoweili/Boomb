const request = require("request");

const userinfo = {
    "nickname": "五福一安",
    "phone": "15267268100",
    "useropenid": "15267268100cd55a8d0-81cb-11ec-a70f-d9d6aaf97aa8",
    "gamescore": ":199617",
    "origin": "0"
}
// const userinfo = {
//     "nickname": "Neinei",
//     "phone": "13656895170",
//     "useropenid": "1365689517094187a30-87e7-11ec-a47d-b7a0fedd4faf",
//     "gamescore": "226209",
//     "origin": "0"
// }

function GetScorelist() {
    request({
        url: "https://iqiyi.ovgo.cn/api/jieshiwu/page/1/30",
        method: "GET",
        json: true,
        headers: {
            "Host": "iqiyi.ovgo.cn",
            "Connection": "keep - alive",
            "Accept": "application/json, text/plain, */*",
            "User-Agent": "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.138 Safari/537.36 NetType/WIFI MicroMessenger/7.0.20.1781(0x6700143B) WindowsWechat(0x63050027)",
            "Sec-Fetch-Site": "same-origin",
            "Sec-Fetch-Mode": "cors",
            "Sec-Fetch-Dest": "empty",
            "Referer": "https://iqiyi.ovgo.cn/bowl/index.html",
            "Accept-Encoding": "gzip, deflate, br",
            "Accept-Language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",

        }
    }, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            if (body.success == true) {
                const top1 = body.data.ranklist[0];
                userinfo.gamescore = (parseInt(top1.gamescore + randomscore()).toString())
                console.log(JSON.stringify(userinfo))
                console.log(JSON.stringify(top1))
                postScore(userinfo)
            }
        } else {
            console.error(error)
        }
    })
}

function randomscore() {
    return (Math.floor(Math.random() * 10) * 20 + Math.floor(Math.random() * 50) * 15 + Math.floor(Math.random() * 10) * 10 + Math.floor(Math.random() * 10) * 5 + Math.floor(Math.random() * 10) * 3 + Math.floor(Math.random() * 10) * 2)
}

function postScore(data) {
    request({
        url: "https://iqiyi.ovgo.cn/api/jieshiwu/setuser",
        method: "POST",
        json: true,
        headers: {
            "Host": "iqiyi.ovgo.cn",
            "Connection": "keep-alive",
            "Accept": "application/json, text/plain, */*",
            "Origin": "https://iqiyi.ovgo.cn",
            "User-Agent": "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.138 Safari/537.36 NetType/WIFI MicroMessenger/7.0.20.1781(0x6700143B) WindowsWechat(0x63050027)",
            "Content-Type": "application/json",
            "Sec-Fetch-Site": "same-origin",
            "Sec-Fetch-Mode": "cors",
            "Sec-Fetch-Dest": "empty",
            "Referer": "https://iqiyi.ovgo.cn/bowl/index.html",
            "Accept-Encoding": "gzip, deflate, br",
            "Accept-Language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7"
        },
        body: data
    }, function (error, response, body) {
        console.log(response.statusCode)
        if (!error && response.statusCode == 200) {
            console.log(JSON.stringify(body))
        }
    })
}

GetScorelist()
// postScore(userinfo)
// console.log(randomscore())