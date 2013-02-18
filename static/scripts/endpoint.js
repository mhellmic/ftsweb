define([
  'lib/jquery',
  'lib/underscore',
  'lib/backbone'
], function($, _, Backbone) {
  var Endpoint = Backbone.Model.extend({
    defaults: {
      'protocol': '',
      'host': '',
      'location': '', // 'changes' on first access to []
    },

    initialize: function() {
    },

    updatePath: function(url) {
      this.setLocation(url);
      console.log('endpoint newUrl: '+this.getUrl());
    },

    setLocation: function(locString) {
      this.set({'location': locString});
      console.log('endpoint setlocation: '+this.get('location'));
    },

    getUrl: function() {
      return this.get('location');
    },

    getFileUrl: function(filename) {
      return this.get('location')+'/'+filename;
    },

    getLocationString: function() {
      return this.get('location');
    },

    isRoot: function() {
      if (this.get('location').length == 0) {
        return true;
      } else {
        return false;
      }
    }
  });

  console.log('from endpoint: '+typeof(Endpoint));
  return Endpoint;
});
