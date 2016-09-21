var Anim = function(exports) {

    exports.init = function() {
      scroll();
    }

    function scroll() {
      console.log('scroll');
    }

    return exports;

}({});

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
  var t = test;

  function launch() {

    var content_test = MyApp.templates.test(t);

    $('#test').html(content_test);
  }

  Anim.init();
  launch();
});
