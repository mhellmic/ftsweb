var FileList = Backbone.Collection.extend({
  model: File,
  url: function() {
    return '/storage';
  }
});
