const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middleware/auth');
const {
  getDashboard,
  getEvents,
  createEvent,
  getEvent,
  updateEvent,
  deleteEvent,
} = require('../controllers/eventController');

router.use(verifyToken);

router.get('/dashboard', getDashboard);
router.get('/dashboard/events', getEvents);

router.post('/api/events', createEvent);
router.get('/api/events/:id', getEvent);
router.put('/api/events/:id', updateEvent);
router.delete('/api/events/:id', deleteEvent);

module.exports = router;
