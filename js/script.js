function detectBlocker() {
    var ad = document.getElementsByClassName('adsbygoogle');

    if (ad.length == 0) return;

    if (!ad[0].getElementsByTagName('iframe').length) {
        document.getElementById("adblockEnabled").innerHTML = "有効";
    }
}
window.self.onload = function() {
    var screenWidth, screenHeight, windowWidth, windowHeight;
    screenWidth = screen.width;
    screenHeight = screen.height;

    windowWidth = window.innerWidth;
    windowHeight = window.innerHeight;
    document.getElementById("screenSize").innerHTML = screenWidth + " x " + screenHeight;
    document.getElementById("windowSize").innerHTML = windowWidth + " x " + windowHeight;

    var webSocketText;
    if (window.WebSocket) {
        webSocketText = "OK";
    } else {
        webSocketText = "NG";
    }
    //document.getElementById("websockets").innerHTML = 	webSocketText;

    document.getElementById("javascriptEnabled").innerHTML = "有効";
    var target = woothee.parse(window.navigator.userAgent);
    document.getElementById("browser").innerHTML = target.name + " " + target.version;
    document.getElementById("os").innerHTML = target.os + " " + target.os_version;
    document.getElementById("userAgent").innerHTML = window.navigator.userAgent;

    var setCookie = function(cookieName, value) {
        var cookie = cookieName + "=" + value + ";";
        document.cookie = cookie;
    }

    var getCookie = function(cookieName) {
        var l = cookieName.length + 1;
        var cookieAry = document.cookie.split("; ");
        var str = "";
        for (i = 0; i < cookieAry.length; i++) {
            if (cookieAry[i].substr(0, l) === cookieName + "=") {
                str = cookieAry[i].substr(l, cookieAry[i].length);
                break;
            }
        }
        return str;
    }
    setCookie('check_cookie', true);
    var val = getCookie('check_cookie');

    if (val) {
        document.getElementById("cookieEnabled").innerHTML = "有効";
    }



    $.get("api/browser.json", function(data) {
        var hasData = false;
        $.each(data.browsers, function(k, master) {
            if (master.name.indexOf(target.name) !== -1) {
                hasData = true;
                if (master.version.indexOf(target.version) !== -1) {
                    document.getElementById("checkVersion").innerHTML = "✓ このブラウザは最新バージョンです。";
                } else {
                    document.getElementById("checkVersion").innerHTML = "より新しいバージョンをご利用いただけます。";
                }
            }
        });
        if (!hasData) {
            document.getElementById("checkVersion").innerHTML = "...現在検出できません。しばらくしてからもう一度お試しください。";
        }
        document.getElementById("loading").style.display = "none";
        document.getElementById("item").style.display = "block";
    }, "json");
}
