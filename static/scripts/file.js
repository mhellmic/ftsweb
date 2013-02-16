var File = Backbone.Model.extend({
  url: 'files',
  defaults: function() {
    return {
      name: "testfile"
    };
  }
});

