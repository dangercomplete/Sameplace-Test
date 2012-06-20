define(["jquery", "utilities", "bootstrap_modal"], function($) {
  var url_params = {};
  (function() {
      var e,
          a = /\+/g,  // Regex for replacing addition symbol with a space
          r = /([^&=]+)=?([^&]*)/g,
          d = function(s) { return decodeURIComponent(s.replace(a, ' ')); },
          q = window.location.search.substring(1);
      e = r.exec(q);
      while (e) {
        url_params[d(e[1])] = d(e[2]);
        e = r.exec(q);
      }
  })();
  var test_hash_code = function(i) {
    if (!i) {
      i = 0;
    }
    var user_id = $.cookie('tred_user_id');
    if (!user_id) {
      user_id = (Number.MAX_VALUE * Math.random()).toString(36).substring(0, 32);
      $.cookie('tred_user_id', user_id, {expires: 3650, path: '/'});
    }
    log('Identified user as ' + user_id);
    mixpanel.identify(user_id);
    return Math.abs((user_id.substring(i) + user_id.substring(0, i)).hashCode());
  };
  var track = function(msg) {
    log("Track: “" + msg + "”");
    setTimeout(function(){
      mixpanel.track(msg);
    }, 250);
    _gaq.push(['_trackEvent', 'Page', msg]);
  };
  var register_once = function(properties) {
    log("Register (Once):");
    log(properties);
    mixpanel.register_once(properties);
  };
  var register = function(properties) {
    log("Register:");
    log(properties);
    mixpanel.register(properties);
  };
  var google_adwords_conversion_click_action_button = function() {
    setTimeout(function(){
    google_conversion_id = 1000684591;
    google_conversion_language = "en";
    google_conversion_format = "3";
    google_conversion_color = "ffffff";
    google_conversion_label = "oS2GCJGjpwMQr_iU3QM";
    google_conversion_value = 0;
    var randomNum = new Date().getMilliseconds();
    $.getScript("http://www.googleadservices.com/pagead/conversion.js");
    var image = new Image(1,1);
    image.src = 'http://www.googleadservices.com/pagead/conversion/' + google_conversion_id + '/?random=' + randomNum + 'label=' + google_conversion_label + '&guid=ON&script=0';
    }, 250);
  };
  $(document).ready(function() {
    track("Visited Page");
    $(document).on("change", "select", function(e){
      var properties = {};
      properties[this.name] = $(this).find("option[value='" + $(this).val() + "']").text();  
      register(properties);
      track("Changed " + this.name);
    });
    $(document).on("click", "#try", function(e){
      register({
        "Action Button": $(this).val(),
        "Clicked Action Button": true,
        "Left Via": "Action: " + $(this).val()
      });
      track("Click Action Button");
      google_adwords_conversion_click_action_button();
      e.preventDefault();
      $('#modal_form').modal({});
    });
    $(document).on("click", "a:not(.select2-container a, .modal a, #try)", function(e){
      var name = $(this).text();
      e.preventDefault();
      register({
        "Clicked Action Button": false,
        "Left Via": "Link: " + name
      });
      track("Click Non-Action Button");  
      track("Leave Page Via Click");
      //google_adwords_conversion_click_non_action_button();
      $('#modal_form').modal({});
    });
    $(document).on("click", "#inviteform_submit", function(){
      $('#inviteform').submit();
    });
    $('#inviteform').submit(function(e) {
      $.ajax({
        url: this.action,
        data: $(this).serialize(),
        type: 'GET',
        dataType: 'jsonp',
        success: function(data) {
          if (data.Status != 200) {
            register({"Valid Email":false});
            alert(data.Message);
          } else {
            log("Name Tag:" + $('#email').val());
            mixpanel.name_tag($('#email').val());
            register({"Valid Email":true});
            $('#inviteform').slideToggle(250, function() {
              $('#thanks').slideToggle();
              $('.modal-footer').slideToggle();
            });
          }
          track("Submitted Email");
        }
      });
      e.preventDefault();
    });
  });
});