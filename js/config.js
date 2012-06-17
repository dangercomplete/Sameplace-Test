requirejs.config({
  deps: ["main", "testing"],
  paths: {
    jquery: "http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min",
    utilities: "lib/utilities",
    bootstrap_modal: "../bootstrap/js/bootstrap-modal"
  }
});