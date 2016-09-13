Loader.loadData('data/fr.json', function(data) {
  data = JSON.parse(data);
  var test = data.test;

  function launch() {
    var t = test;
    var test = MyApp.templates.test({
        test: data.test
    });
    $('#test').html(test);
    console.log('test');
  }
  launch();
});
