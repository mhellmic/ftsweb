define([
  'lib/jquery',
  'lib/underscore',
  'lib/backbone'
], function($, _, Backbone) {
  var Transfer = Backbone.Model.extend({
    default: {
      'name': '',
    },

    start: function() {
    }
  });

  return Transfer;
});

