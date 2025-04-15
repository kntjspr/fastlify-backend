'use strict';

const AuthController = require('../controllers/auth.controller');
const { validateSignup, validateSignin } = require('../validators/auth.validator');

/**
 * Authentication routes
 * @param {FastifyInstance} fastify - Fastify instance
 * @param {Object} options - Route options
 * @param {Function} done - Callback when routes are registered
 */
async function routes(fastify, options, done) {
  // Register signup route
  fastify.post('/signup', { 
    preHandler: validateSignup 
  }, AuthController.signup);
  
  // Register signin route
  fastify.post('/signin', { 
    preHandler: validateSignin 
  }, AuthController.signin);
  
  // Get current authenticated user
  fastify.get('/me', { 
    preHandler: fastify.authenticate 
  }, AuthController.me);
  
  done();
}

module.exports = routes; 