define([
  'lib/jquery',
  'lib/underscore',
  'lib/backbone'
], function($, _, Backbone) {
  var Endpoint = Backbone.Model.extend({
    defaults: {
      'location': '',
    },

    initialize: function() {
    }
  });

  console.log('from endpoint: '+typeof(Endpoint));
  return Endpoint;
});
