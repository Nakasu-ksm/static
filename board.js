function readCookie(name) {
    var prefix = name + "="
    var start = document.cookie.indexOf(prefix)
    if (start == -1) {
        return null;
    }
    var end = document.cookie.indexOf(";", start + prefix.length)
    if (end == -1) {
        end = document.cookie.length;
    }
    var value = document.cookie.substring(start + prefix.length, end)
    return unescape(value);
}
function alertNotice(data, last_notice) {
    var cookie_notice = readCookie("last_notice");
    let noticeMessage;
    if (data[last_notice].brief === undefined || data[last_notice].brief === "") {
        noticeMessage = data[last_notice].content;
    } else {
        noticeMessage = data[last_notice].brief;
    }

    if (cookie_notice != last_notice) {
        var exp = new Date();
        exp.setTime(exp.getTime() + 30 * 24 * 60 * 60 * 1000);
        document.cookie = "last_notice=" + last_notice  + ";expires=" + exp.toGMTString();
        Swal.fire({
            title: "新公告！",
            html: "<span style=\"color: red; font-weight: bold;\">本站QQ群(点击群号即可加入)：<a href=\"https://jq.qq.com/?_wv=1027&amp;k=G9DJBTKA\" style=\"color:rgb(64, 158, 255);\">659950593</a>  欢迎加入！！！</span><br>"+"公告时间：" + data[last_notice].time + "<br>公告内容：<span style='color: dodgerblue;font-weight: bold;'>" + noticeMessage + "</span><br>如需查看其他公告请展开首页的公告栏~",
            icon: "success",
            confirmButtonText: "知道啦~",
        });
    }
}
window.onload = function () {
    var request = new XMLHttpRequest();
    request.open("get", "notices.json");
    request.send(null);
    request.onload = function () {
        if (request.status == 200) {
            var data = JSON.parse(request.responseText);
            window.notices = data;
            var last_notice = Object.keys(data)[Object.keys(data).length - 1];
            alertNotice(data, last_notice);
        }
    }
    window.loaded_notice = 0;
    //Fix Background
    var img = new Image();
    img.src = "https://www.dmoe.cc/random.php";
    if (img.width == 0) {
        var fixBg = document.createElement("style");
        fixBg.innerText = ".background:before {background:url(https://www.animedb.cn/api/background);background-size:cover;background-position:center 0;background-repeat: no-repeat;}";
        document.body.appendChild(fixBg);
    }
}
function changeBoard() {
    var notices = window.notices;
    var list = document.getElementById("notice_list");
    var hlist = document.getElementById("hidden_list");
    if (window.loaded_notice == 0){
        for (var i in notices) {
            var divObj = document.createElement("div");
            divObj.id = "notice_" + String(i);
            divObj.className = "noticeObjA";
            divObj.style = "text-align:left;height:auto";
            divObj.innerHTML = "<div class='noticeObjB' style='width:100%;height:16px;line-height:16px'><span style='font-size:12px;margin:8px'>时间：" + notices[i].time + "</span></div><p style='margin:8px'>" + notices[i].content + "</p>";
            hlist.prepend(divObj);
        }
        list.append(hlist);
        window.loaded_notice = 1;
    }
    list.style.height = list.style.height==String(hlist.offsetHeight)+"px"?"0px":String(hlist.offsetHeight)+"px";
    if (list.style.height == "0px") {
        document.getElementById("board_control").innerHTML = "展开公告栏";
    } else {
        document.getElementById("board_control").innerHTML = "收起公告栏";
    }
}
