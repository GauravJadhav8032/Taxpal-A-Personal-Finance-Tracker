import { Router } from "express";
import { authenticateToken } from "../auth/auth";
import {
  createTransaction,
  deleteTransaction,
  deleteAllTransactions,
  getTransactions,
  getTransactionById,
  updateTransaction,
  validateTransaction,
} from "./transactionController";
import { handleValidationErrors } from "../../utils/validators/dashboardValidation";

const router = Router();
router.use(authenticateToken);

/**
 * @swagger
 * tags:
 *   name: Transactions
 *   description: Manage income and expense transactions
 */

/**
 * @swagger
 * /transactions:
 *   get:
 *     summary: Get all transactions
 *     tags: [Transactions]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all transactions
 *   post:
 *     summary: Create a new transaction
 *     tags: [Transactions]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               amount:
 *                 type: number
 *                 example: 500
 *               category:
 *                 type: string
 *                 example: Food
 *               type:
 *                 type: string
 *                 enum: [income, expense]
 *                 example: expense
 *     responses:
 *       201:
 *         description: Transaction created successfully
 */

/**
 * @swagger
 * /transactions/{id}:
 *   get:
 *     summary: Get transaction by ID
 *     tags: [Transactions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Transaction details
 *   put:
 *     summary: Update a transaction
 *     tags: [Transactions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Transaction updated successfully
 *   delete:
 *     summary: Delete a transaction
 *     tags: [Transactions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Transaction deleted successfully
 */

/**
 * @swagger
 * /transactions:
 *   delete:
 *     summary: Delete all transactions
 *     tags: [Transactions]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: All transactions deleted successfully
 */

router.get("/", getTransactions);
router.get("/:id", getTransactionById);
router.post("/", validateTransaction, handleValidationErrors, createTransaction);
router.put("/:id", validateTransaction, handleValidationErrors, updateTransaction);
router.delete("/", deleteAllTransactions);
router.delete("/:id", deleteTransaction);

export default router;
