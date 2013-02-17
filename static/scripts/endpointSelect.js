define([
  'lib/jquery',
  'lib/underscore',
  'lib/backbone'
], function($, _, Backbone) {
  var EndpointSelect = Backbone.Model.extend({
    defaults: {
      'name': 'source',
      'placeholder': 'source',
    }
  });

  return EndpointSelect;
});
