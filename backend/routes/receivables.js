import express from 'express';
import { body, validationResult } from 'express-validator';
import Receivable from '../models/Receivable.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const receivables = await Receivable.find().sort({ dueDate: 1 });
    res.json(receivables);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const receivable = await Receivable.findById(req.params.id);
    if (!receivable) {
      return res.status(404).json({ message: 'Receivable not found' });
    }
    res.json(receivable);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/', [
  body('client').notEmpty().trim(),
  body('invoiceNumber').notEmpty().trim(),
  body('amount').isNumeric().isFloat({ min: 0 }),
  body('issueDate').isISO8601(),
  body('dueDate').isISO8601(),
  body('project').notEmpty().trim()
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const receivable = new Receivable(req.body);
    const newReceivable = await receivable.save();
    res.status(201).json(newReceivable);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const receivable = await Receivable.findById(req.params.id);
    if (!receivable) {
      return res.status(404).json({ message: 'Receivable not found' });
    }

    Object.assign(receivable, req.body);
    const updatedReceivable = await receivable.save();
    res.json(updatedReceivable);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.patch('/:id/receive', async (req, res) => {
  try {
    const receivable = await Receivable.findById(req.params.id);
    if (!receivable) {
      return res.status(404).json({ message: 'Receivable not found' });
    }

    receivable.status = 'Paid';
    receivable.paidDate = new Date();
    const updatedReceivable = await receivable.save();
    res.json(updatedReceivable);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const receivable = await Receivable.findById(req.params.id);
    if (!receivable) {
      return res.status(404).json({ message: 'Receivable not found' });
    }

    await receivable.deleteOne();
    res.json({ message: 'Receivable deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;