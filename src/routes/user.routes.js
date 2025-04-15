'use strict';

const UserController = require('../controllers/user.controller');

/**
 * User routes (protected by authentication)
 * @param {FastifyInstance} fastify - Fastify instance
 * @param {Object} options - Route options
 * @param {Function} done - Callback when routes are registered
 */
async function routes(fastify, options, done) {
  // Apply authentication to all routes in this plugin
  fastify.addHook('preHandler', fastify.authenticate);
  
  // Get user profile by ID
  fastify.get('/:id', UserController.getProfile);
  
  done();
}

module.exports = routes; 