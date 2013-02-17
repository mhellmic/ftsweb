define([
  'lib/jquery',
  'lib/underscore',
  'lib/backbone'
], function($, _, Backbone) {
  var EndpointListView = Backbone.View.extend({

    template: _.template($('#template-endpoint-list').html()),

    initialize: function(attrs) {
      this.endpoint = this.options.endpoint;
      this.listenTo(this.options.endpoint, 'change', this.refreshList);
    },

    render: function() {
      $(this.el).html(this.template());
      return this;
    },

    refreshList: function() {
      var newLocation = this.endpoint.get('location');
      console.log('it changed to '+newLocation);
      this.collection.fetch({data: {location: newLocation}});
    }
  });

  console.log('from listview: '+typeof(EndpointListView));
  return EndpointListView;
});
