(function() {

  'use strict';

  var div = document.createElement('div');
  div.id = 'kikuzu-widget-container';

  var iframe = document.createElement('iframe');
  iframe.id = 'kikuzu-widget';
  iframe.style.border = '0px none';
  iframe.style.outline = '0px none currentcolor';
  iframe.width = '520';
  iframe.height = '125';
  iframe.src = 'checker.html';

  div.appendChild(iframe);
  var x = document.getElementsByTagName('script')[0];
  x.parentNode.insertBefore(div, x);


})();
