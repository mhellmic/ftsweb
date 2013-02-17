define([
  'lib/jquery',
  'lib/underscore',
  'lib/backbone'
], function($, _, Backbone) {
  var Endpoint = Backbone.Model.extend({
    defaults: {
      'location': '',
    },

    initialize: function() {
    },

    moveInPath: function(dir) {
      console.log('endpoint: new dir: '+dir);
      console.log('endpoint location: '+this.get('location'));
      var newLoc = this.get('location')+'/'+dir;
      this.set({'location': newLoc});
    }
  });

  console.log('from endpoint: '+typeof(Endpoint));
  return Endpoint;
});
