const mongoose = require("mongoose");

const MemberSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      minLength: [3, "Name must be at least 3 characters long"],
      maxLength: [255, "Name must be at most 255 characters long"],
    },
    initials: {
      type: String,
    }
  },
  { timestamps: true }
);

MemberSchema.pre('save', function(next) {
  this.initials = this.name.match(/\b([A-Za-z0-9])/g).join('').toUpperCase();
  next();
});

module.exports = mongoose.model('Member', MemberSchema);