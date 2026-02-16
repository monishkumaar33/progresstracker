const { check, validationResult } = require('express-validator');

const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

const handleResult = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

const validateSignup = [
  check('username').trim().isLength({ min: 3 }).withMessage('Username must be at least 3 characters'),
  check('email').isEmail().withMessage('Invalid email address'),
  check('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  handleResult
];

const validateLogin = [
  check('email').isEmail().withMessage('Invalid email address'),
  check('password').exists().withMessage('Password is required'),
  handleResult
];

const validateSession = [
  check('title').trim().notEmpty().withMessage('Title is required'),
  check('description').optional().isString().withMessage('Description must be a string'),
  check('completed').optional().isBoolean().withMessage('Completed must be boolean'),
  handleResult
];

const validateSchedule = [
  check('day').isIn(days).withMessage('Day must be one of ' + days.join(', ')),
  check('sessionsList').isArray({ min: 1 }).withMessage('sessionsList must be a non-empty array'),
  check('sessionsList.*').isInt().withMessage('All session ids must be integers'),
  handleResult
];

const validateParamId = (paramName) => [
  check(paramName).isInt().withMessage(`${paramName} must be an integer`),
  handleResult
];

module.exports = { validateSignup, validateLogin, validateSession, validateSchedule, validateParamId };
