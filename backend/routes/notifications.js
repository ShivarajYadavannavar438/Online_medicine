const express = require('express');
const router = express.Router();

// Send email reminder
router.post('/send-email-reminder', async (req, res) => {
  try {
    const { email, medicineName, dosage, time, precaution } = req.body;
    
    // Email sending logic would go here
    console.log(`Email reminder sent to ${email} for ${medicineName}`);
    
    res.json({ success: true, message: 'Email sent successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Send SMS reminder
router.post('/send-sms-reminder', async (req, res) => {
  try {
    const { phone, message } = req.body;
    
    // SMS sending logic would go here
    console.log(`SMS reminder sent to ${phone}: ${message}`);
    
    res.json({ success: true, message: 'SMS sent successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;