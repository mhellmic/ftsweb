define([
  'lib/jquery',
  'lib/underscore',
  'lib/backbone', 
  'endpointFile'
], function($, _, Backbone, EndpointFile) {
  var EndpointFileList = Backbone.Collection.extend({
    model: EndpointFile,
    url: function() {
      return '/storage';
    },

    comparator: function(fileEntry) {
      return fileEntry.get('name');
    }
  });

  console.log('from filelist: '+typeof(EndpointFileList));
  return EndpointFileList;
});
