const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
    name: {
      type: String,
      required: [true, "Name is required"],
      minLength: [3, "Name must be at least 3 characters long"],
      maxLength: [255, "Name must be at most 255 characters long"],
      unique: true,
    },

    color: {
      type: String,
      required: [true, "Color is required"],
      enum: {
        values: ["Yellow", "Green", "Blue", "Red", "Orange", "Purple"],
        message: "Select and available option",
      },
    },

    description: {
      type: String,
      maxLength: [255, "Description must be at most 255 characters long"],
    },

    service: {
      type: String,
      required: [true, "Service is required"],
      enum: {
        values: ["Expedited", "Regular"],
        message: "Select an available option",
      },
    },

    state: {
      type: String,
      required: [true, "State is required"],
      enum: {
        values: ["To-Do", "Do Today", "In-Progress", "Done", "Inactive"],
        message: "Select an available option",
      },
    },

    assignedRef: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Member'
    },

    dueDate: {
      type: Date,
    },
  },
    { timestamps: true }
  );

  TaskSchema.pre('find', function(next) {
    this.populate('assignedRef');
    next();
  });

  TaskSchema.pre('findOne', function(next) {
    this.populate('assignedRef');
    next();
  });

module.exports = mongoose.model('Task',TaskSchema);