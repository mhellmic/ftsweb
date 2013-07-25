define([
  'lib/jquery',
  'lib/underscore',
  'lib/backbone',
  'transfer'
], function($, _, Backbone, Transfer) {
  var TransferView = Backbone.View.extend({
    //template: _.template($('template-transfer-buttons').html()),

    events: {
      'click button': 'startTransfer',
    },

    initialize: function(options) {
      this.endpoint1 = options.endpoint1;
      this.endpoint2 = options.endpoint2;
    },

    startTransfer: function(evt) {
      console.log('startTransfer event triggered');
      var src;
      var dst;
      if (evt.target.id == 'transfer-from-left') {
        src = this.endpoint1;
        dst = this.endpoint2;
      } else {
        src = this.endpoint2;
        dst = this.endpoint1;
      }

      var tr = new Transfer({
        src: src,
        dst: dst,
      });
      tr.start();
    }

  });

  console.log('from transferview: '+typeof(TransferView));
  return TransferView;
});
