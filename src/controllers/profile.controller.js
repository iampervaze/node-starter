const Profile = require('models/profile.model')
  , helpers = require('util/helpers');

const {handle, handleErr} = helpers.handlers('Profile', 'profiles')
  , id = helpers.id;

/**
 * Get task
 */
function get(req, res, next) {
  Profile.findAndPopulate(id(req))
    .then(task => handle(req, res, task) )
    .catch(err => handleErr(next, err, 'get('+id(req)+')') );
}

/**
 * Create new Profile
 */
function create(req, res, next) {
  const profile = new Profile(req.body);

  profile.save()
    .then(o => res.json(o))
    .catch(err => handleErr(next, err, 'post()') );
}

/**
 * Update existing profile
 */
function update(req, res, next) {
  Profile.findByIdAndUpdate(id(req), req.body, {new: true}).exec()
    .then(o => handle(req, res, o) )
    .catch(err => handleErr(next, err, 'put('+id(req)+')') );
}

/**
 * Get profile list
 */
function list(req, res, next) {
  const { limit = "0", skip = "0" } = req.query;
  Profile.list({ limit, skip })
    .then(o => res.json(o))
    .catch(err => handleErr(next, err, 'getAll()') );
}

/**
 * Delete Profile
 */
function remove(req, res, next) {
  Profile.findByIdAndRemove(id(req)).exec()
    .then(o => handle(req, res, o) )
    .catch(err => handleErr(next, err, 'put('+id(req)+')') );
}

module.exports = { get, create, update, list, remove };
