define([
  'lib/jquery',
  'lib/underscore',
  'lib/backbone'
], function($, _, Backbone) {
  var EndpointFile = Backbone.Model.extend({
    defaults:  {
      name: "testfile"
    }
  });

  return EndpointFile;
});
