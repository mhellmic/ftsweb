define([
  'lib/jquery',
  'lib/underscore',
  'lib/backbone',
  'endpointFile',
  'endpointFileView'
], function($, _, Backbone, EndpointFile, EndpointFileView) {
  var EndpointListView = Backbone.View.extend({
    tagName: 'ul',

    initialize: function(attrs) {
      this.endpoint = this.options.endpoint;
      this.listenTo(this.options.endpoint, 'change:location', this.refreshList);

      this.collection.on('reset', this.render, this);
    },

    removeAllFromView: function() {
      for (var i = this.collection.length -1; i >= 0; --i) {
        var item = this.collection.at(i);
        this.collection.remove(item);
      }
    },

    render: function() {
      _.each(this.collection.models, function(f) {
        $(this.el).append(new EndpointFileView({model: f, endpoint: this.endpoint}).render().el);
      }, this);
      return this;
    },

    refreshList: function() {
      var newLocation = this.endpoint.get('location');
      console.log('it changed to '+newLocation);
      this.removeAllFromView();
      this.collection.fetch({data: {location: newLocation}});
    }
  });

  console.log('from listview: '+typeof(EndpointListView));
  return EndpointListView;
});
