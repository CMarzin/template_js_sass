Loader.loadData('data/fr.json', function(data) {
  data = JSON.parse(data);
  var test = data.test;
  var t = test;

  function launch() {
<<<<<<< HEAD

    var content_test = MyApp.templates.test(t);

    $('#test').html(content_test);

=======
    var t = test;
    var test = MyApp.templates.test({
        test: data.test
    });
    $('#test').html(test);
    console.log('test');
>>>>>>> fa7337f5116cb74cc8d23857e7def937f25633b8
  }

  Anim.init();
  launch();
});
