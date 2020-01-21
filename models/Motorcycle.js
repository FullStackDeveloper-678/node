var mongoose = require('mongoose');

var MotorcycleSchema = {
  engineSize: { type: Number, required: true,
    set: function(val) { return val; },
    get: function(val) { return val; }
  },
  hour: { type: Number, required: true,
    set: function(val) { return val; },
    get: function(val) { return val; }
  },
}

module.exports = MotorcycleSchema;
