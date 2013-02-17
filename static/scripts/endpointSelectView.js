define([
  'lib/jquery',
  'lib/underscore',
  'lib/backbone'
], function($, _, Backbone) {
  var EndpointSelectView = Backbone.View.extend({
    template: _.template($('#template-endpoint-select').html()),

    events: {
      'click button.load': 'changeEndpointLocation'
    },

    initialize: function(attrs) {
      this.endpoint = this.options.endpoint;
    },

    render: function() {
      $(this.el).html(this.template(this.model.toJSON()));
    },

    changeEndpointLocation: function(evt) {
      console.log('pressing the button');
      this.endpoint.set({location: $(this.el).find('input.location').val()});
    }
  });

  console.log('from selectview: '+typeof(EndpointSelectView));
  return EndpointSelectView;
});
