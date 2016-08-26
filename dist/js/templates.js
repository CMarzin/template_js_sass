this["MyApp"] = this["MyApp"] || {};
this["MyApp"]["templates"] = this["MyApp"]["templates"] || {};
this["MyApp"]["templates"]["test"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1, alias1=this.lambda, alias2=this.escapeExpression;

  return "<h1>"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.test : depth0)) != null ? stack1.title : stack1), depth0))
    + "</h1>\n<h1>"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.test : depth0)) != null ? stack1.yolo : stack1), depth0))
    + "</h1>\n";
},"useData":true});