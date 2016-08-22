'use strict'

/**
 * @param {UserModel} user
 * @param {UserModel} author
 * @constructor
 */
function ActivateUserCommand (user, author) {
  this.user = user
  this.author = author
}

module.exports = ActivateUserCommand
