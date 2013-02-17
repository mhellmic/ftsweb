define([
  'lib/jquery',
  'lib/underscore',
  'lib/backbone'
], function($, _, Backbone) {
  var EndpointFileView = Backbone.View.extend({
    tagName: 'li',

    events: {
      'click a.filelink': 'moveInPath',
      'click button.delete': 'unrender'
    },

    template: _.template($('#template-file-list-item').html()),

    initialize: function() {
      this.endpoint = this.options.endpoint;
      this.listenTo(this.model, 'change', this.render);
      this.listenTo(this.model, 'destroy', this.remove);
      this.listenTo(this.model, 'remove', this.remove);
    }, 

    render: function() {
      this.$el.html(this.template(this.model.toJSON()));
      return this;
    },

    unrender: function() {
      this.model.destroy();
    }, 

    moveInPath: function(evt) {
      if (evt.shiftKey) {
        console.log('endpoint file view: shift-click');
        this.model.toggleMark();
      } else {
        console.log('move in the directory path');
        this.endpoint.moveInPath(evt.target.name);
      }
    }
  });
  return EndpointFileView;
});
