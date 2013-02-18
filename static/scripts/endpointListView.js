define([
  'lib/jquery',
  'lib/underscore',
  'lib/backbone',
  'endpointFile',
  'endpointFileView'
], function($, _, Backbone, EndpointFile, EndpointFileView) {
  var EndpointListView = Backbone.View.extend({
    tagName: 'table',

    initialize: function(attrs) {
      this.endpoint = this.options.endpoint;
      this.listenTo(this.options.endpoint, 'change:location', this.refreshList, this);

      this.collection.on('reset', this.render, this);
    },

    removeAll: function() {
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
      var newLocation = this.endpoint.getUrl();
      console.log('it changed to '+newLocation);
      this.removeAll();
      this.collection.fetch({data: {location: newLocation}});
      // doesnt work because it will not be rendered
      // leave it for later, maybe we have to modify the
      // fetch method to do it before 'reset' is called
      //if (!this.endpoint.isRoot()) {
      //  this.collection.add(new EndpointFile({'name':'..'}));
      //}
    }
  });

  console.log('from listview: '+typeof(EndpointListView));
  return EndpointListView;
});
