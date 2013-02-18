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
      console.log('from router: filelist '+typeof(EndpointFileList));
      this.fileList1 = new EndpointFileList();
      this.endpoint1listview = new EndpointListView({
        el: $('#right-list table.filelist'),
        endpoint: this.endpoint1,
        collection: this.fileList1,
      });
      this.endpoint1listview.render();

      this.endpointselect = new EndpointSelect({
        location: 'dest',
        placeholder: 'destination',
      });
      console.log('from router: select '+typeof(EndpointSelectView));
      this.endpointselectview = new EndpointSelectView({
        el: $('#right-selector'),
        model: this.endpointselect,
        endpoint: this.endpoint1,
      });
      this.endpointselectview.render();
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
