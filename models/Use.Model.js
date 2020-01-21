var mongoose = require('mongoose');
var Address = require('./Address.Model');
jwt = require('jsonwebtoken'),
crypto = require('crypto');

var UserSchema = new mongoose.Schema({
  username: { type: String, required: true,
    set: function(val) { return val; },
    get: function(val) { return val; } 
  }, 
  password: { type: String,
    set: function(val) { return val; },
    get: function(val) { return val; }
  },
  type: { type: Number,
    set: function(val) { return val; },
    get: function(val) { return val; }
  },
  address: Address.schema,
  hash: {type: String, required: true},
  salt: {type: String, required: true}
}, { toJSON: { getters: true }} );

UserSchema.methods.setPassword = function(password)  {
  this.salt = crypto.randomBytes(16).toString('hex');
  this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
};


UserSchema.methods.ValidPassword = function(password) {
  const hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
  return this.hash === hash;
};

UserSchema.methods.generateJwt = function() {
  const expiry = new Date();
  expiry.setDate(expiry.getDate() + 1);
  return jwt.sign({
        _id: this._id,
        username: this.username,
        type : this.type,
        exp: Math.floor(Date.now() / 1000) + (60 * 60)
      }, // 1 Hour
      process.env.JWT_SECRET);
};

module.exports = mongoose.model('User', UserSchema);
