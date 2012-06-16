
define('main',["jquery"], function($) {
  var jQuery = $;
  $(document).ready(function(){
    alert("ready");
  });
});
requirejs.config({
  deps: ["main"],
  paths: {
    jquery: "http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min"
  }
});
define("config", function(){});
