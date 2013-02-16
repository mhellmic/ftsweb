// Filename: router.js
define([
  'lib/jquery',
  'lib/underscore',
  'lib/backbone',
  'fileList',
  'fileListView',
  'endpoint',
  'endpointListView',
  'endpointSelect',
  'endpointSelectView'
], function($, _, Backbone, Session) {
  var AppRouter = Backbone.Router.extend({
    routes: {
      "list": "list",
      "": "min"
    },

    list: function() {
      console.log('list');
      this.fileList1 = new FileList();
      this.fileList2 = new FileList();
      this.leftFileListView = new FileListView({el: $('#left'), collection: this.fileList1});
      this.rightFileListView = new FileListView({el: $('#right'), collection: this.fileList2});
//      this.fileList1.fetch();
//      this.fileList2.fetch();
//      $('#left').html(this.leftFileListView.render().el);
//      $('#right').html(this.rightFileListView.render().el);
    },

    min: function() {
      console.log('min');
      this.endpoint1 = new Endpoint();
      this.fileList1 = new FileList();
      this.endpoint1listview = new EndpointListView({
        el: $('#right-list'),
        endpoint: this.endpoint1,
        collection: this.fileList1,
      });
      this.endpoint1listview.render();

      this.endpointselect = new EndpointSelect({
        location: 'dest',
        placeholder: 'destination',
      });
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
