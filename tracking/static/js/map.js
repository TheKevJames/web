(function() {
  var __bind = function(fn, me) {
    return function() {
      return fn.apply(me, arguments);
    };
  };

  var App = (function() {
    function App() {
      this.map = null;

      this.loadMapLocation = __bind(this.loadMapLocation, this);
      this.onResize = __bind(this.onResize, this);
      this.render = __bind(this.render, this);
      this.setupMap = __bind(this.setupMap, this);
    }

    App.prototype.render = function() {
      try {
        Typekit.load();
      } catch (_) { }

      document.addEventListener('touchstart', function() {
        return null;
      }, true);

      this.setupMap();
      this.loadMapLocation();

      $(window).on('resize', this.onResize);
      this.onResize();

      return null;
    };

    App.prototype.renderMapMarker = function(name) {
      $('.location').html(name);
      $('.marker').show();

      return $('.label').css({
        marginLeft: (-$('.label').outerWidth() / 2) + 'px'
      });
    };

    App.prototype.setupMap = function() {
      L.mapbox.accessToken = 'pk.eyJ1IjoidGhla2V2amFtZXMiLCJhIjoibDc2TEpyWSJ9.7pPwekH_8AYh_QorUs5pHQ';
      this.map = L.mapbox.map('map', 'thekevjames.l2c1nn28', {
        attributionControl: false,
        zoomControl: false
      });

      this.map.dragging.disable();
      this.map.touchZoom.disable();
      this.map.doubleClickZoom.disable();

      return this.map.scrollWheelZoom.disable();
    };

    App.prototype.loadMapLocation = function() {
      var self = this;

      var url = window.location.protocol + '//' + window.location.host + '/get_location'

      return $.getJSON(
        url,
        function(resp) {
          self.map.setView([resp.lat, resp.lng], 16);
          return self.renderMapMarker(resp.name);
        }
      );
    };

    App.prototype.onResize = function() {};

    return App;
  })();

  window.app = new App();

  $(app.render);
}).call(this);
