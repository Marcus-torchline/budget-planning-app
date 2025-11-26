import express from 'express';
import { body, validationResult } from 'express-validator';
import Payable from '../models/Payable.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const payables = await Payable.find().sort({ dueDate: 1 });
    res.json(payables);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const payable = await Payable.findById(req.params.id);
    if (!payable) {
      return res.status(404).json({ message: 'Payable not found' });
    }
    res.json(payable);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/', [
  body('vendor').notEmpty().trim(),
  body('invoiceNumber').notEmpty().trim(),
  body('amount').isNumeric().isFloat({ min: 0 }),
  body('dueDate').isISO8601(),
  body('category').notEmpty().trim()
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const payable = new Payable(req.body);
    const newPayable = await payable.save();
    res.status(201).json(newPayable);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const payable = await Payable.findById(req.params.id);
    if (!payable) {
      return res.status(404).json({ message: 'Payable not found' });
    }

    Object.assign(payable, req.body);
    const updatedPayable = await payable.save();
    res.json(updatedPayable);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.patch('/:id/pay', async (req, res) => {
  try {
    const payable = await Payable.findById(req.params.id);
    if (!payable) {
      return res.status(404).json({ message: 'Payable not found' });
    }

    payable.status = 'Paid';
    payable.paidDate = new Date();
    const updatedPayable = await payable.save();
    res.json(updatedPayable);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const payable = await Payable.findById(req.params.id);
    if (!payable) {
      return res.status(404).json({ message: 'Payable not found' });
    }

    await payable.deleteOne();
    res.json({ message: 'Payable deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;