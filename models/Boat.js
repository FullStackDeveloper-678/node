var mongoose = require('mongoose');

var BoatSchema = {
  length: { type: Number, required: true,
    set: function(val) { return val; },
    get: function(val) { return val; }
  },
  Type: { type: String, required: true,
    set: function(val) { return val; },
    get: function(val) { return val; }
  },
  SubType: { type: String, required: true,
    set: function(val) { return val; },
    get: function(val) { return val; }
  },
  hour: { type: Number,
    set: function(val) { return val; },
    get: function(val) { return val; }
  },
}

module.exports = BoatSchema;
