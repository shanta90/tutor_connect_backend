import express from 'express';

const router = express.Router();

/**
 * @route GET /api/v1/health
 * @desc System health check endpoint
 * @access Public
 */
router.get('/health', (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'System is healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

export default router;
