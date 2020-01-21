var mongoose = require('mongoose');

var HeavyVehicleSchema = {
  distance: { type: Number, required: true,
    set: function(val) { return val; },
    get: function(val) { return val; }
  },
  hour: { type: Number, required: true,
    set: function(val) { return val; },
    get: function(val) { return val; }
  },
  HVType: { type: String, required: true,
    set: function(val) { return val; },
    get: function(val) { return val; }
  },
}

module.exports = HeavyVehicleSchema;
