
window.self.onload = function() {

    var mybrowser = woothee.parse(window.navigator.userAgent);
    var browserIcon;
    var osIcon;
    if(mybrowser.name == "Firefox"){
    	browserIcon = document.getElementById("browser").dataset.firefox;
    }else if(mybrowser.name == "Chrome"){
    	browserIcon = document.getElementById("browser").dataset.chrome;
    }else if(mybrowser.name == "Edge"){
    	browserIcon = document.getElementById("browser").dataset.edge;
    }else if(mybrowser.name == "Interne Explorer"){
    	browserIcon = document.getElementById("browser").dataset.ie;
    }else if(mybrowser.name == "Safari"){
    	browserIcon = document.getElementById("browser").dataset.safari;
    }
    if(mybrowser.os == "Mac OSX"){
    	osIcon = document.getElementById("os").dataset.mac;
    }else if(mybrowser.os == "Windows"){
    	osIcon = document.getElementById("os").dataset.windows;
    }
    document.getElementById("browser").innerHTML = '<i class="fa '+ browserIcon + '" aria-hidden="true"></i> ' + mybrowser.name + " " + mybrowser.version;
    document.getElementById("os").innerHTML = '<i class="fa '+ osIcon + '" aria-hidden="true"></i> ' + mybrowser.os + " " + mybrowser.os_version;
    document.getElementById("userAgent").innerHTML = window.navigator.userAgent;

    if(mybrowser.category != "pc"){
    	alert("まだ対応していません。");
    }

    $.get("browser.json", function(data) {
        var hasData = false;
        $.each(data.browsers, function(k, master) {
            if (master.name.indexOf(mybrowser.name) !== -1) {
                hasData = true;
                if (master.version.indexOf(mybrowser.version) !== -1 || mybrowser.version >= master.version) {
                	document.getElementById("browserStatus").innerHTML = "<i class='fa "+ document.getElementById("browserStatus").dataset.current + "' aria-hidden='true'></i>";
                    document.getElementById("checkVersion").innerHTML = document.getElementById("checkVersion").dataset.current;
                    document.getElementById("checkVersionContainer").classList.add(document.getElementById("checkVersionContainer").dataset.current);
                    document.getElementById("checkVersionContainer").classList.remove('bg-info');
                } else {
                	document.getElementById("browserStatus").innerHTML = "<i class='fa "+ document.getElementById("browserStatus").dataset.newer + "' aria-hidden='true'></i>";
                    document.getElementById("checkVersion").innerHTML = document.getElementById("checkVersion").dataset.newer;
                    document.getElementById("checkVersionContainer").classList.add(document.getElementById("checkVersionContainer").dataset.newer);
                    document.getElementById("checkVersionContainer").classList.remove('bg-info');
                }
            }
        });
        if (!hasData) {
            document.getElementById("checkVersion").innerHTML = "...現在検出できません。しばらくしてからもう一度お試しください。";
        }
        document.getElementById("loadingHeader").style.display = "none";
        document.getElementById("loadingContents").style.display = "none";
        document.getElementById("header").style.display = "block";
        document.getElementById("contents").style.display = "block";
    }, "json");
}
