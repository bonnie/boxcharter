/*
 * Copyright (c) 2017 Bonnie Schulkin. All Rights Reserved.
 *
 * This file is part of BoxCharter.
 *
 * BoxCharter is free software: you can redistribute it and/or modify it under
 * the terms of the GNU Affero General Public License as published by the Free
 * Software Foundation, either version 3 of the License, or (at your option)
 * any later version.
 *
 * BoxCharter is distributed in the hope that it will be useful, but WITHOUT
 * ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or
 * FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License
 * for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with BoxCharter. If not, see <http://www.gnu.org/licenses/>.
 *
 */

const express = require('express')
const passport = require('passport')
const Authentication = require('../controllers/authentication')

// middleware for before signin route -- don't let them in unless they have
// a correct email / password
const requireSignin = passport.authenticate('local', { session: false })

// create the router
const router = express.Router()

// routes
router.post('/sign-in', requireSignin, Authentication.signin)
router.post('/sign-up', Authentication.signup)
router.get('/check-email', Authentication.checkUser)

module.exports = router;

/* ******************* */
/* PUT user details.   */
/* ******************* */
// router.post('/add', (req, res) => {
//   const userInfo = req.body

//   /* { email: 'bonnie@bonnie',
//   fname: 'bonnie',
//   lname: 'bonnie',
//   password: 'bonnie',
//   password2: 'bonnie' } */

//   // create salted password hash
//   // general web consensus seems to be: hash on server side, and use
//   // https to protect password in transit
//   const passData = passUtils.saltHashPassword(userInfo.password)

//   // massage userInfo obj to contain salted pass hash
//   userInfo.passwordHash = passData.passwordHash
//   userInfo.passwordSalt = passData.salt
//   delete userInfo.password

  // create user
//   User
//     .create(userInfo)
//     .then((newUser) => {
//       const email = newUser.email
//       const msg = `New user ${email} successfully added.`
//       logger.info(msg)

//       const response = {}
//       response.status = new Status(statusStrings.success, msg)
//       User.getByEmail(email)
//         .then((newUserJSON) => {
//           response.user = newUserJSON
//           res.status(200).json(response);
//         })
//     })
//     .catch((error) => {
//       const msg = `Unable to add user ${userInfo.email}`
//       const response = procError(error, msg)
//       res.status(200).json(response)
//     })
// });

// /* ******************* */
// /* GET user existence. */
// /* ******************* */
// router.get('/check', (req, res) => {
//   const email = req.query.email

//   User.findOne({ where: { email } })
//     .then((foundUser) => {
//       const inDB = foundUser !== null
//       const result = { status: { type: statusStrings.success }, inDB }
//       res.status(200).json(result)
//     })
//     .catch((error) => {
//       const msg = `Unable to check user ${email}`
//       const response = procError(error, msg)
//       res.status(200).json(response)
//     })
// });