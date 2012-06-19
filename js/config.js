requirejs.config({
  deps: ["main", "testing"],
  paths: {
    jquery: "lib/jquery-1.7.2",
    utilities: "lib/utilities",
    bootstrap_modal: "../bootstrap/js/bootstrap-modal"
  },
  shim: {
  	utilities: [],
  	bootstrap_modal: ["jquery"]
  }
});