import express from 'express';
import { body, validationResult } from 'express-validator';
import Budget from '../models/Budget.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const budgets = await Budget.find().sort({ startDate: -1 });
    res.json(budgets);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/current', async (req, res) => {
  try {
    const now = new Date();
    const budgets = await Budget.find({
      startDate: { $lte: now },
      endDate: { $gte: now }
    });
    res.json(budgets);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const budget = await Budget.findById(req.params.id);
    if (!budget) {
      return res.status(404).json({ message: 'Budget not found' });
    }
    res.json(budget);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/', [
  body('category').notEmpty().trim(),
  body('budgeted').isNumeric().isFloat({ min: 0 }),
  body('period').notEmpty().trim(),
  body('startDate').isISO8601(),
  body('endDate').isISO8601()
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const budget = new Budget(req.body);
    const newBudget = await budget.save();
    res.status(201).json(newBudget);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const budget = await Budget.findById(req.params.id);
    if (!budget) {
      return res.status(404).json({ message: 'Budget not found' });
    }

    Object.assign(budget, req.body);
    const updatedBudget = await budget.save();
    res.json(updatedBudget);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const budget = await Budget.findById(req.params.id);
    if (!budget) {
      return res.status(404).json({ message: 'Budget not found' });
    }

    await budget.deleteOne();
    res.json({ message: 'Budget deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;