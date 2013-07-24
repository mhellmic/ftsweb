define([
  'lib/jquery',
  'lib/underscore',
  'lib/backbone'
], function($, _, Backbone) {
  var StartTransferView = Backbone.View.extend({
    template: _.template($('template-transfer-buttons').html()),

    events: {
      'click button': 'startTransfer',
    },

    initialize: function() {
      this.endpoint1 = this.options.endpoint1;
      this.endpoint2 = this.options.endpoint2;
    },

    startTransfer: function(evt) {
      var src;
      var dst;
      if (evt.target.id == 'transfer-from-left') {
        src = this.endpoint1;
        dst = this.endpoint2;
      } else {
        src = this.endpoint2;
        dst = this.endpoint1;
      }

      var tr = new Transfer(src, dst);
      tr.start();
    }

  });

  return TransferView;
});
