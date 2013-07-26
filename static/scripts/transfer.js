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
      /// get source filenames
      var filenames = filelist.map(function(file) { return file.get('name'); });
      /// get source paths
      
      ///  get dest path equivalents

      var data = 
      { "files": [
          {
            "sources": filenames,
            "destinations": ["root:"],
            "metadata": "User defined metadata",   
            "filesize": 1024,                      
            "checksum": 'adler32:1234',            
          }
        ], 
        "params": {
          "verify_checksum": true,    
          "reuse": false,             
          "spacetoken": null,         
          "bring_online": null,
          "copy_pin_lifetime": -1,    
          "job_metadata": null,       
          "source_spacetoken": null,  
          "overwrite": false,         
          "gridftp": null             
        }
      };

      // Attention: this is an example request,
      // not the one we need here :)
      // send request
      $.ajax({
        type: "GET",
        url: "https://fts3-pilot.cern.ch:8446/jobs",
        //data: data,
        error: function(jqXHR, textStatus, errorThrown) {
          console.log("fts connect failed");
          console.log(jqXHR);
          console.log(textStatus);
          console.log(errorThrown);
          },
        success: function(data, textStatus, xhr) {
          console.log(data);
          console.log(textStatus)
          },
        //dataType: "application/json",
        xhrFields: {
          withCredentials: true
          },
        crossDomain: true,
        });
    }
  });

  return Transfer;
});

