Loader.loadData('data/fr.json', function(data) {
  data = JSON.parse(data);
  var test = data.test;
  var t = test;

  function launch() {

    var content_test = MyApp.templates.test(t);

    $('#test').html(content_test);
  }

  Anim.init();
  launch();
});
