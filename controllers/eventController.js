const db = require('../config/db');

async function getDashboard(req, res) {
  try {
    const [total] = await db.query('SELECT COUNT(*) as count FROM events');
    const [upcoming] = await db.query(
      "SELECT COUNT(*) as count FROM events WHERE event_date >= NOW() AND status != 'Completed'"
    );
    const [soldOut] = await db.query("SELECT COUNT(*) as count FROM events WHERE status = 'Sold Out'");
    const [recent] = await db.query('SELECT * FROM events ORDER BY event_date DESC LIMIT 5');

    res.render('dashboard/index', {
      user: req.user,
      stats: {
        total: total[0].count,
        upcoming: upcoming[0].count,
        soldOut: soldOut[0].count,
      },
      recentEvents: recent,
    });
  } catch (err) {
    console.error('Dashboard error:', err);
    res.status(500).send('Server error');
  }
}

async function getEvents(req, res) {
  try {
    const search = req.query.search || '';
    const status = req.query.status || '';

    let sql = 'SELECT * FROM events WHERE 1=1';
    const params = [];

    if (search) {
      sql += ' AND title LIKE ?';
      params.push(`%${search}%`);
    }

    if (status) {
      sql += ' AND status = ?';
      params.push(status);
    }

    sql += ' ORDER BY event_date ASC';

    const [events] = await db.query(sql, params);

    res.render('dashboard/events', {
      user: req.user,
      events,
      search,
      status,
      statuses: ['Draft', 'Scheduled', 'Sold Out', 'Completed'],
      success: req.query.success || null,
    });
  } catch (err) {
    console.error('Events error:', err);
    res.status(500).send('Server error');
  }
}

async function createEvent(req, res) {
  const { title, category, location, event_date, capacity, status, description } = req.body;

  if (!title || !category || !location || !event_date || !capacity) {
    return res.status(400).json({ error: 'Required fields: title, category, location, event_date, capacity' });
  }

  try {
    await db.query(
      'INSERT INTO events (title, category, location, event_date, capacity, status, description) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [title, category, location, event_date, parseInt(capacity), status || 'Draft', description || '']
    );
    res.json({ success: true });
  } catch (err) {
    console.error('Create event error:', err);
    res.status(500).json({ error: 'Failed to create event' });
  }
}

async function getEvent(req, res) {
  try {
    const [rows] = await db.query('SELECT * FROM events WHERE id = ?', [req.params.id]);
    if (rows.length === 0) return res.status(404).json({ error: 'Event not found' });
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch event' });
  }
}

async function updateEvent(req, res) {
  const { title, category, location, event_date, capacity, status, description } = req.body;

  try {
    await db.query(
      'UPDATE events SET title=?, category=?, location=?, event_date=?, capacity=?, status=?, description=? WHERE id=?',
      [title, category, location, event_date, parseInt(capacity), status, description, req.params.id]
    );
    res.json({ success: true });
  } catch (err) {
    console.error('Update event error:', err);
    res.status(500).json({ error: 'Failed to update event' });
  }
}

async function deleteEvent(req, res) {
  try {
    await db.query('DELETE FROM events WHERE id = ?', [req.params.id]);
    res.json({ success: true });
  } catch (err) {
    console.error('Delete event error:', err);
    res.status(500).json({ error: 'Failed to delete event' });
  }
}

module.exports = { getDashboard, getEvents, createEvent, getEvent, updateEvent, deleteEvent };
