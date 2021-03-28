const mongoose = require('mongoose')
  , Schema = mongoose.Schema;

const ProfileSchema = new Schema({
  name:String,
  image: String,
}, { timestamps: true });

/**
 * Statics
 */
 ProfileSchema.statics = {
  /**
   * List tasks in ascending order of 'dueDate' timestamp (oldest ones first)
   */
  list({ skip = "0", limit = "0" } = {}) {
    return this.find()
      .sort({ username: 1 })
      .skip(parseInt(skip))
      .limit(parseInt(limit))
      .exec();
  },
  findAndPopulate(id) {
    return this.findById(id)
      .populate('assignee', 'username')
      .exec();
  },
  findByUserId(userId) {
    return this.find({assignee: userId})
      .exec();
  }
};

module.exports = mongoose.model('Profile', ProfileSchema);
