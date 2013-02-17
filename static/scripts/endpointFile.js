define([
  'lib/jquery',
  'lib/underscore',
  'lib/backbone'
], function($, _, Backbone) {
  var EndpointFile = Backbone.Model.extend({
    defaults:  {
      name: "testfile",
      isMarked: false,
    },

    toggleMark: function() {
      if (this.get('isMarked') == false) {
        this.set({'isMarked': true});
      } else {
        this.set({'isMarked': false});
      }
      console.log('endpoint file: toggled mark to '+this.get('isMarked'));
    }
  });

  return EndpointFile;
});
