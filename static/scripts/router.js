// Filename: router.js
define([
  'lib/jquery',
  'lib/underscore',
  'lib/backbone',
  'endpoint',
  'endpointFile',
  'endpointFileList',
  'endpointListView',
  'endpointSelect',
  'endpointSelectView'
], function($, _, Backbone, Endpoint, EndpointFile, EndpointFileList, EndpointListView, EndpointSelect, EndpointSelectView) {
  var AppRouter = Backbone.Router.extend({
    routes: {
      "": "min"
    },

    min: function() {
      console.log('min');
      this.endpoint1 = new Endpoint();
      this.endpoint2 = new Endpoint();
      this.fileList1 = new EndpointFileList();
      this.fileList2 = new EndpointFileList();

      // the left list
      this.endpoint1listview = new EndpointListView({
        el: $('#left-list table.filelist'),
        endpoint: this.endpoint1,
        collection: this.fileList1,
      });
      this.endpoint1listview.render();

      this.endpoint1select = new EndpointSelect({
        name: 'src',
        placeholder: 'source',
      });
      this.endpoint1selectview = new EndpointSelectView({
        el: $('#left-selector'),
        model: this.endpoint1select,
        endpoint: this.endpoint1,
      });
      this.endpoint1selectview.render();

      // the right list
      this.endpoint2listview = new EndpointListView({
        el: $('#right-list table.filelist'),
        endpoint: this.endpoint2,
        collection: this.fileList2,
      });
      this.endpoint2listview.render();

      this.endpoint2select = new EndpointSelect({
        name: 'dest',
        placeholder: 'destination',
      });
      this.endpoint2selectview = new EndpointSelectView({
        el: $('#right-selector'),
        model: this.endpoint2select,
        endpoint: this.endpoint2,
      });
      this.endpoint2selectview.render();
    }
  });

  var initialize = function(){
    var app_router = new AppRouter;
    Backbone.history.start();
  };
  return {
    initialize: initialize
  };
});
