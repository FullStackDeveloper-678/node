var mongoose = require('mongoose');

var CarSchema = {
  distance: { type: Number, required: true,
    set: function(val) { return val; },
    get: function(val) { return val; }
  },
  bodyType: { type: String, required: true,
    set: function(val) { return val; },
    get: function(val) { return val; }
  },
  doors: { type: String, required: true,    
    set: function(val) { return val; },
    get: function(val) { return val; }
  },
  transmission: { type: String, required: true,
    set: function(val) { return val; },
    get: function(val) { return val; }
  },
  HP: { type: String, required: true,
    set: function(val) { return val; },
    get: function(val) { return val; }
  },
  color: { type: String, required: true,
    set: function(val) { return val; },
    get: function(val) { return val; }
  },
  regionalSpec: { type: String, required: true,
    set: function(val) { return val; },
    get: function(val) { return val; }
  },
}

module.exports = CarSchema;
