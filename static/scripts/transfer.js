define([
  'lib/jquery',
  'lib/underscore',
  'lib/backbone'
], function($, _, Backbone) {
  var Transfer = Backbone.Model.extend({
    default: {
      'name': '',
    },

    initialize: function(options) {
      this.src = options.src;
      this.dst = options.dst;
    },

    start: function() {
      console.log('building file list ...');
      console.log(this.src);
      console.log(this.src.get('filelist'));
      // select all marked files from source
      var filelist = this.src.get('filelist').filter(function(file) {
        return file.get('isMarked') === true;
      });
      console.log(filelist);
      // create fts request
      // send request
    }
  });

  return Transfer;
});

