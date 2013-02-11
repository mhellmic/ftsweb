$(document).ready(function() {
  var File = Backbone.Model.extend({
    defaults: function() {
      return {
        name: "testfile"
      };
    }
  });

  var FileList = Backbone.Collection.extend({
    model: File
  });

  var FileView = Backbone.View.extend({
    tagName: 'li',

    events: {
      'click button.delete': 'unrender'
    },

    template: _.template($('#file-item-template').html()),

    initialize: function() {
      this.listenTo(this.model, 'change', this.render);
      this.listenTo(this.model, 'destroy', this.remove);
      this.listenTo(this.model, 'remove', this.remove);
    }, 

    render: function() {
      this.$el.html(this.template(this.model.toJSON()));
      return this;
    },

    unrender: function() {
      this.model.destroy();
    }  
  });

  var FileListView = Backbone.View.extend({
    el: $('#filelist'),

    events: {
      'click button#addItem': 'addItem',
      'click button#refreshList': 'refreshList'
    },

    initialize: function() {
      this.collection.on('add', this.appendItem);
      this.collection.on('reset', this.appendAll, this);
    },

    // this is quite hackish, normally reset() should remove the entries
    // it does remove them from the model, but not from the view
    refreshList: function() {
      for (var i = this.collection.length -1; i >= 0; --i) {
        var item = this.collection.at(i);
        this.collection.remove(item);
      }
      this.collection.reset(new File());
    },             

    addItem: function() {
      this.collection.add(new File());
    },

    appendItem: function(item) {
      var view = new FileView({model: item});
      $('#list').append(view.render().el);
    },

    appendAll: function(items) {
      items.each(this.appendItem, this);
    }
  });

  var AppRouter = Backbone.Router.extend({
    routes: {
      "": "list"
    },

    list: function() {
      console.log('list');
      this.fileList = new FileList();
      this.fileListView = new FileListView({collection: this.fileList});
      //this.fileList.fetch();
    }
  });

  app = new AppRouter();
  Backbone.history.start();
});

function handleFileSelect(evt) {
  var f = evt.target.files[0];
  if (f) {
    var xhr = new XMLHttpRequest();
    var fd = f;
    xhr.open("POST", "upload/"+fd.name);
    xhr.send(fd);
  }
}
