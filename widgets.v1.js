(function() {

    'use strict';

    var scripts = document.getElementById('kikuzu');
    var src = scripts.src;
    var query = src.substring(src.indexOf('?') + 1);
    var div = document.createElement('div');
    div.id = 'kikuzu-widget-container';

    var date = new Date();
    var param = date.getTime();

    var host = location.hostname;
    var protocol = location.protocol;

    var iframe = document.createElement('iframe');
    iframe.id = 'kikuzu-widget';
    iframe.style.border = '0px none';
    iframe.style.outline = '0px none currentcolor';
    iframe.style.maxWidth = '100%';
    iframe.width = '520';
    iframe.height = '125';
    iframe.frameborder = '0';
    iframe.src = protocol + "//" + host + '/checker.html' + '?' + query + '&t=' + param;

    div.appendChild(iframe);
    var x = document.getElementsByTagName('script')[0];
    x.parentNode.insertBefore(div, x);


})();