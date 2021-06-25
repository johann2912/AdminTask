const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const { Types } = mongoose; // const type = mongoose.Types

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      min: 3,
    },
    last_name: {
      type: String,
      required: true,
      min: 3,
    },
    document: {
      type: String,
      required: true,
    },
    document_number: {
      type: String,
      require: true,
      min: 3,
    },
    email: {
      type: String,
      required: true,
      min: 3,
      max: 1024,
    },
    password: {
      type: String,
      required: true,
      minlength: 3,
      select:false
    },
    rol: {
      ref: "Role",
      type: Types.ObjectId,
      required: false,
    },
  },
  {
    timestamps: true,
    versionkey: false,
  }
);

// encrypt password
userSchema.pre('save', function(next) {
    var user = this;

    // only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) return next();

    // generate a salt
    bcrypt.genSalt(10, function(err, salt) {
        if (err) return next(err);

        // hash the password using our new salt
        bcrypt.hash(user.password, salt, function(err, hash) {
            if (err) return next(err);
            // override the cleartext password with the hashed one
            user.password = hash;
            next();
        });
    });
});

// compare password
userSchema.methods.comparePassword = function(password){
  return bcrypt.compareSync(password, this.password );
};

module.exports = mongoose.model("user", userSchema);