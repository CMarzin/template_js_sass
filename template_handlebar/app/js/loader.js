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
