/**
 * kikuzu.com
 *
 */

window.self.onload = function() {

    var parameters = location.search.substring(1).split("&");
    var targetBrowserList = {};
    for (var i = 0; i < parameters.length; i++) {
        var element = parameters[i].split("=");
        var paramName = decodeURIComponent(element[0]);
        var paramValue = decodeURIComponent(element[1]);
        if (paramName == "windows[]") {
            if (typeof targetBrowserList['Windows'] === "undefined") {
                targetBrowserList['Windows'] = [];
            }
            targetBrowserList['Windows'].push(paramValue);
        } else if (paramName == "mac[]") {
            if (typeof targetBrowserList['Mac OSX'] === "undefined") {
                targetBrowserList['Mac OSX'] = [];
            }
            targetBrowserList['Mac OSX'].push(paramValue);
        } else if (paramName == "ios[]") {
            if (typeof targetBrowserList['iPhone'] === "undefined") {
                targetBrowserList['iPhone'] = [];
            }
            targetBrowserList['iPhone'].push(paramValue);
        } else if (paramName == "android[]") {
            if (typeof targetBrowserList['Android'] === "undefined") {
                targetBrowserList['Android'] = [];
            }
            targetBrowserList['Android'].push(paramValue);
        }
    }

    var mybrowser = woothee.parse(window.navigator.userAgent);
    var browserIcon;
    var osIcon;
    if (mybrowser.name == "Firefox") {
        browserIcon = document.getElementById("browser").dataset.firefox;
    } else if (mybrowser.name == "Chrome") {
        browserIcon = document.getElementById("browser").dataset.chrome;
    } else if (mybrowser.name == "Edge") {
        browserIcon = document.getElementById("browser").dataset.edge;
    } else if (mybrowser.name == "Interne Explorer") {
        browserIcon = document.getElementById("browser").dataset.ie;
    } else if (mybrowser.name == "Safari") {
        browserIcon = document.getElementById("browser").dataset.safari;
    } else if (mybrowser.name == "Opera") {
        browserIcon = document.getElementById("browser").dataset.opera;
    }
    if (mybrowser.os == "Mac OSX") {
        osIcon = document.getElementById("os").dataset.mac;
    } else if (mybrowser.os == "Windows") {
        osIcon = document.getElementById("os").dataset.windows;
    } else if (mybrowser.os == "iPhone") {
        osIcon = document.getElementById("os").dataset.ios;
    } else if (mybrowser.os == "Android") {
        osIcon = document.getElementById("os").dataset.android;
    }
    document.getElementById("browser").innerHTML = '<i class="fa ' + browserIcon + '" aria-hidden="true"></i> ' + mybrowser.name + " " + mybrowser.version;
    document.getElementById("os").innerHTML = '<i class="fa ' + osIcon + '" aria-hidden="true"></i> ' + mybrowser.os + " " + mybrowser.os_version;
    document.getElementById("userAgent").innerHTML = window.navigator.userAgent;

    $.get("browser.json", function(data) {
            var hasData = false;
            if ($.inArray(mybrowser.name.toLowerCase(), targetBrowserList[mybrowser.os]) !== -1) {
                $.each(data[mybrowser.os], function(k, master) {
                    if (master.name.indexOf(mybrowser.name) !== -1) {
                        hasData = true;
                        if (master.version.indexOf(mybrowser.version) !== -1 || mybrowser.version >= master.version) {
                            document.getElementById("browserStatus").innerHTML = "<i class='fa " + document.getElementById("browserStatus").dataset.current + "' aria-hidden='true'></i>";
                            document.getElementById("checkVersion").innerHTML = document.getElementById("checkVersion").dataset.current;
                            document.getElementById("checkVersionContainer").classList.add(document.getElementById("checkVersionContainer").dataset.current);
                            document.getElementById("checkVersionContainer").classList.remove('bg-info');
                        } else {
                            document.getElementById("browserStatus").innerHTML = "<i class='fa " + document.getElementById("browserStatus").dataset.newer + "' aria-hidden='true'></i>";
                            document.getElementById("checkVersion").innerHTML = document.getElementById("checkVersion").dataset.newer;
                            document.getElementById("checkVersionContainer").classList.add(document.getElementById("checkVersionContainer").dataset.newer);
                            document.getElementById("checkVersionContainer").classList.remove('bg-info');
                        }
                    }
                });
            }
            if (!hasData) {
                document.getElementById("browserStatus").innerHTML = "<i class='fa " + document.getElementById("browserStatus").dataset.unsupported + "' aria-hidden='true'></i>";
                document.getElementById("checkVersion").innerHTML = document.getElementById("checkVersion").dataset.unsupported;
                document.getElementById("checkVersionContainer").classList.add(document.getElementById("checkVersionContainer").dataset.unsupported);
                document.getElementById("checkVersionContainer").classList.remove('bg-info');
            }
            document.getElementById("loadingHeader").style.display = "none";
            document.getElementById("loadingContents").style.display = "none";
            document.getElementById("header").style.display = "block";
            document.getElementById("contents").style.display = "block";
        }, "json")
        .fail(function() {
            document.getElementById("checkVersion").innerHTML = "...現在検出できません。しばらくしてからもう一度お試しください。";
            document.getElementById("checkVersionContainer").classList.add(document.getElementById("checkVersionContainer").dataset.unsupported);
            document.getElementById("checkVersionContainer").classList.remove('bg-info');
        });
};