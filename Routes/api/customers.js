const express = require('express');
const { Customer } = require('../../models/customer');
const router = express.Router();

/**
 * @swagger
 * /api/customers:
 *   get:
 *     tags:
 *       - Customers
 *     description: Returns all customers
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: An array of customers
 *         schema:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Customer'
 *       500:
 *         description: Server error
 */
router.get('/', async (req, res) => {
  try {
    const customers = await Customer.findAll();
    res.json(customers);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

/**
 * @swagger
 * /api/customers/{id}:
 *   get:
 *     tags:
 *       - Customers
 *     description: Returns a single customer
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: Customer ID
 *         in: path
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: A single customer
 *         schema:
 *           $ref: '#/components/schemas/Customer'
 *       404:
 *         description: Customer not found
 *       500:
 *         description: Server error
 */
router.get('/:id', async (req, res) => {
  try {
    const customer = await Customer.findByPk(req.params.id);
    if (customer) {
      res.json(customer);
    } else {
      res.status(404).send('Customer not found');
    }
  } catch (err) {
    res.status(500).send('Server error');
  }
});

/**
 * @swagger
 * /api/customers:
 *   post:
 *     tags:
 *       - Customers
 *     description: Adds a new customer
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: customer
 *         description: Customer object
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/components/schemas/Customer'
 * content
 *     responses:
 *       201:
 *         description: Successfully added
 *       500:
 *         description: Server error
 */
router.post('/', async (req, res) => {
  try {
    const customer = await Customer.create(req.body);
    res.status(201).json(customer);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

/**
 * @swagger
 * /api/customers/{id}:
 *   put:
 *     tags:
 *       - Customers
 *     description: Updates a customer
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: Customer ID
 *         in: path
 *         required: true
 *         type: integer
 *       - name: customer
 *         description: Customer object
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/components/schemas/Customer'
 *     responses:
 *       200:
 *         description: Successfully updated
 *       404:
 *         description: Customer not found
 *       500:
 *         description: Server error
 */
router.put('/:id', async (req, res) => {
  try {
    const [updated] = await Customer.update(req.body, {
      where: { customer_id: req.params.id },
    });
    if (updated) {
      const updatedCustomer = await Customer.findByPk(req.params.id);
      res.status(200).json(updatedCustomer);
    } else {
      res.status(404).send('Customer not found');
    }
  } catch (err) {
    res.status(500).send('Server error');
  }
});

/**
 * @swagger
 * /api/customers/{id}:
 *   delete:
 *     tags:
 *       - Customers
 *     description: Deletes a customer
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: Customer ID
 *         in: path
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: Successfully deleted
 *       404:
 *         description: Customer not found
 *       500:
 *         description: Server error
 */
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Customer.destroy({
      where: { customer_id: req.params.id },
    });
    if (deleted) {
      res.status(200).send('Customer deleted');
    } else {
      res.status(404).send('Customer not found');
    }
  } catch (err) {
    res.status(500).send('Server error');
  }
});

module.exports = router;
