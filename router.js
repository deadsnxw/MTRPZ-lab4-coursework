const express = require('express');
const router = express.Router();
const role = require('./controllerRole');
const user = require('./controllerUser');
const report = require('./controllerReports');
const request = require('./controllerRequest');
const review = require('./controllerReview');
const result = require('./controllerResult');

//Routes for "Roles"
router
    .route('/roles')
    .get(role.getAllRoles);
router
    .route('/roles/:id')
    .get(role.getRoleById);

//Routes for "User"
router
    .route('/users')
    .get(user.getAllUsers)
    .post(user.createUser);
router
    .route('/users/:id')
    .get(user.getUserById)
    .delete(user.deleteUser)
    .patch(user.updateUser);

//Routes for "MetionReport"
router
    .route('/mention-reports')
    .get(report.getAllMentionReports)
    .post(report.createMentionReport)
router
    .route('/mention-reports/:id')
    .get(report.getMentionReportById)
    .delete(report.deleteMentionReport)
    .patch(report.updateMentionReport);

//Routes for "PubRequests"
router
    .route('/pub-requests')   
    .get(request.getAllPubRequests)
    .post(request.createPubRequst);
router
    .route('/pub-requests/:id')
    .get(request.getPubRequestById)
    .delete(request.deletePubRequest);

//Routes for "PubReview"
router
    .route('/pub-reviews')
    .get(review.getAllPubReview)
    .post(review.createPubReview);
router
    .route('/pub-reviews/:id')
    .get(review.getPubReviewById)
    .delete(review.deletePubReview)
    .patch(review.updatePubReview);

//Routes for "ResultsData"
router
    .route('/result-data')
    .get(result.getAllResultData)
    .post(result.createResultData);
router
    .route('/result-data/:id')
    .get(result.getResultDataById)
    .delete(result.deleteResultData);

module.exports = router;
