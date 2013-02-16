var FileListView = Backbone.View.extend({
  //el: $('body'),
  tagName: 'ul',

  events: {
    'click button.load': 'refreshList',
    'click button#refreshList': 'refreshList'
  },

  initialize: function(buttonEvent) {
    console.log(this.$el);
    this.collection.on('add', this.appendItem);
    this.collection.on('reset', this.appendAll, this);
    this.filelist = this.$el.find('ul.fileList');
    this.storageLocation = this.$el.find('input.location');
  },

  render: function() {
    _.each(this.collection.models, function(f) {
      $(this.el).append(new FileView({model:f}).render().el);
    }, this);
    return this;
  },

  // this is quite hackish, normally reset() should remove the entries
  // it does remove them from the model, but not from the view
  refreshList: function() {
    for (var i = this.collection.length -1; i >= 0; --i) {
      var item = this.collection.at(i);
      this.collection.remove(item);
    }

    // get new entries
    var newFileList = this.fetchFileList(this.storageLocation.val())

    console.log('list reset');
    this.collection.reset(newFileList);
  },             

  addItem: function() {
    this.collection.add(new File());
  },

  appendItem: function(item) {
    var view = new FileView({model: item});
    this.filelist.append(view.render().el);
  },

  appendAll: function(items) {
    items.each(this.appendItem, this);
  },

  fetchFileList: function(storageLocation) {
    var url = '/storage?location='+storageLocation;
    $.get(url, function(responseText) {
      console.log(responseText);
      return responseText;
    });
  }
});

