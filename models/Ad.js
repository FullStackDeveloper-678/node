var mongoose = require('mongoose');
var NumberPlateSchema = require('./NumberPlate');
var VehicleSharedSchema = require('./Vehicle.js');
var BoatSchema = require('./Boat');
var CarSchema = require('./Car');
var HeavyVehicleSchema = require('./HeavyVehicle');
var MotorcycleSchema = require('./Motorcycle');

// Schema for Ads collection
// Discriminator key allows one of 'NumberPlates, 'Vehicles' or a vehicle sub-type, i.e. 'Boats', 'Cars', 'HeavyVehicle' or 'Motorcycle'
// Specifying 'Vehicle' in discriminatorKey will extend ad schema to include shared vehicle fields among all vehicle sub-types, but not any fields for any sub-types.
// Specifying a sub-type, ie.'Boats', 'Cars', 'HeavyVehicle' or 'Motorcycle' in discriminationKey will extend ad schema to include all the shared vehicle fields and the fields in specified sub-type.

var AdSchema = new mongoose.Schema({
  title: {type: String, required: true,
    set: function(val) { return val; },
    get: function(val) { return val; }
  },
  description: { type: String, required: true,
    set: function(val) { return val; },
    get: function(val) { return val; }
  },
  price: { type: Number, required: true,
    set: function(val) { 
      // val in setter is type of string.  If using '+', val will get appeneded as a string.  
      // Use Number(val) to convert value first.  Other math functions seem fine.
      return val; 
    },
    get: function(val) { return val; }
  },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  status: Boolean, 
},  {discriminatorKey: 'type', toJSON: { getters: true }});

var AdModel = mongoose.model('Ad', AdSchema);

var VehicleSchema = VehicleSharedSchema({});
var VehicleBoatSchema = VehicleSharedSchema(BoatSchema);

var VehicleCarSchema = VehicleSharedSchema(CarSchema);
var VehicleHeavySchema = VehicleSharedSchema(HeavyVehicleSchema);
var VehicleMotorcycleSchema = VehicleSharedSchema(MotorcycleSchema);

const NumberPlates =AdModel.discriminator("NumberPlates", new mongoose.Schema(NumberPlateSchema));
const Vehicle = AdModel.discriminator("Vehicle", new mongoose.Schema(VehicleSchema));
const Boats = AdModel.discriminator("Boats", new mongoose.Schema(VehicleBoatSchema));
const Cars = AdModel.discriminator("Cars", new mongoose.Schema(VehicleCarSchema));
const HeavyVehicle = AdModel.discriminator("HeavyVehicle", new mongoose.Schema(VehicleHeavySchema));
const Motorcycle = AdModel.discriminator("Motorcycle", new mongoose.Schema(VehicleMotorcycleSchema));

module.exports = AdModel;
module.exports = Vehicle;
module.exports = Boats;
module.exports = Cars;
module.exports = HeavyVehicle;
module.exports = Motorcycle;
module.exports = NumberPlates;
