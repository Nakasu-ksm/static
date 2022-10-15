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
    if (cookie_notice != last_notice) {
        document.cookie = "last_notice=" + last_notice;
        alert("我们有新的公告！\n公告时间：" + data[last_notice].time + "\n公告内容：" + data[last_notice].content + "\n如需查看其他公告请展开首页的公告栏~");
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
    window.list_height = 0;
}
function changeBoard() {
    var notices = window.notices;
    var list = document.getElementById("notice_list");
    if (window.loaded_notice == 0){
        for (var i in notices) {
            var divObj = document.createElement("div");
            divObj.id = "notice_" + String(i);
            divObj.style = "background-color:rgba(255,255,255,0.6);text-align:left;height:" + notices[i].height + "px";
            divObj.innerHTML = "<p style='font-size:5px'>时间：" + notices[i].time + "</p><p>内容：<br>" + notices[i].content + "</p>";
            list.prepend(divObj);
            window.list_height += notices[i].height;
        }
        window.loaded_notice = 1;
    }
    list.style.height = list.offsetHeight==window.list_height?0+"px":window.list_height+"px";
    if (list.style.height == "0px") {
        document.getElementById("board_ontrol").innerHTML = "展开公告栏";
    } else {
        document.getElementById("board_ontrol").innerHTML = "收起公告栏";
    }
}
