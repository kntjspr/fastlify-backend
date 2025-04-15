'use strict';

const db = require('../db');
const bcrypt = require('bcrypt');

// User model with database operations
const User = {
  /**
   * Find user by email
   * @param {string} email - User email
   * @returns {Promise<Object|null>} User object or null
   */
  async findByEmail(email) {
    const query = 'SELECT * FROM users WHERE email = $1';
    const { rows } = await db.query(query, [email]);
    return rows[0] || null;
  },

  /**
   * Find user by username
   * @param {string} username - Username
   * @returns {Promise<Object|null>} User object or null
   */
  async findByUsername(username) {
    const query = 'SELECT * FROM users WHERE username = $1';
    const { rows } = await db.query(query, [username]);
    return rows[0] || null;
  },

  /**
   * Find user by ID
   * @param {number} id - User ID
   * @returns {Promise<Object|null>} User object or null
   */
  async findById(id) {
    const query = 'SELECT id, email, username, created_at, updated_at FROM users WHERE id = $1';
    const { rows } = await db.query(query, [id]);
    return rows[0] || null;
  },

  /**
   * Create a new user
   * @param {Object} userData - User data
   * @returns {Promise<Object>} Created user
   */
  async create(userData) {
    const { email, username, password } = userData;
    
    // Hash the password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    
    const query = `
      INSERT INTO users (email, username, password)
      VALUES ($1, $2, $3)
      RETURNING id, email, username, created_at, updated_at
    `;
    
    const values = [email, username, hashedPassword];
    const { rows } = await db.query(query, values);
    return rows[0];
  },

  /**
   * Verify a user's password
   * @param {string} providedPassword - Password to verify
   * @param {string} storedPassword - Stored hashed password
   * @returns {Promise<boolean>} Whether the password is correct
   */
  async verifyPassword(providedPassword, storedPassword) {
    return bcrypt.compare(providedPassword, storedPassword);
  }
};

module.exports = User; 