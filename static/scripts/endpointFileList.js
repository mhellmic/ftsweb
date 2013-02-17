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
    }
  });

  console.log('from filelist: '+typeof(EndpointFileList));
  return EndpointFileList;
});
