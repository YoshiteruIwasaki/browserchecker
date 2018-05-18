(function() {

  'use strict';

  var scripts = document.getElementById('kikuzu');
  var src = scripts.src;
  var query = src.substring( src.indexOf( '?' ) + 1 );
  var div = document.createElement('div');
  div.id = 'kikuzu-widget-container';

  var iframe = document.createElement('iframe');
  iframe.id = 'kikuzu-widget';
  iframe.style.border = '0px none';
  iframe.style.outline = '0px none currentcolor';
  iframe.width = '520';
  iframe.height = '125';
  iframe.src = 'checker.html' + '?' + query;

  div.appendChild(iframe);
  var x = document.getElementsByTagName('script')[0];
  x.parentNode.insertBefore(div, x);


})();
