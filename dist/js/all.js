var Loader = function( exports )
{
    exports.loadData = function(json,cb){

        var xobj = new XMLHttpRequest();
        xobj.overrideMimeType("application/json");
        xobj.open('GET', json, true);
        xobj.onreadystatechange = function () {

          if (xobj.readyState == 4 && xobj.status == "200") {
            if(cb)cb(xobj.responseText);
          }
        };

        xobj.send(null);
    }

    return exports;

}({});

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
