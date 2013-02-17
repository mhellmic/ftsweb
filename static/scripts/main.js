requirejs.config({
  baseUrl: 'scripts',

  paths: {
  },

  shim: {
    'lib/jquery': {
      exports: 'jQuery'
    },
    'lib/underscore': {
      exports: '_'
    },
    'lib/backbone': {
      deps: ['lib/underscore', 'lib/jquery'],
      exports: 'Backbone'
    },
    'app': {
      deps: ['lib/underscore', 'lib/backbone', 'lib/jquery']
    }
  }
});

require([
  'app'
],

function(App) {
  App.initialize();
}); 
