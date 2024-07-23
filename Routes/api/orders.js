const express = require('express');
const { Order, OrderItem} = require('../../models');
const router = express.Router();


/**
 * @swagger
 * /api/orders:
 *   get:
 *     tags:
 *       - Orders
 *     description: Returns all orders
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: An array of orders
 *         schema:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Order'
 *       500:
 *         description: Server error
 */
router.get('/', async (req, res) => {
  try {
    const orders = await Order.findAll();
    res.json(orders);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

/**
 * @swagger
 * /api/orders/{id}:
 *   get:
 *     tags:
 *       - Orders
 *     description: Returns a single order
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: Order ID
 *         in: path
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: A single order
 *         schema:
 *           $ref: '#/components/schemas/Order'
 *       500:
 *         description: Server error
 */
router.get('/:id', async (req, res) => {
  try {
    const order = await Order.findByPk(req.params.order_id);
    if (order) {
      res.json(order);
    } else {
      res.status(404).send('Order not found');
    }
  } catch (err) {
    res.status(500).send('Server error');
  }
});

/**
 * @swagger
 * /api/orders:
 *   post:
 *     tags:
 *       - Orders
 *     description: Adds a new order
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: order
 *         description: Order object
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/components/schemas/Order'
 *     responses:
 *       201:
 *         description: Successfully added
 *       500:
 *         description: Server error
 */
router.post('/', async (req, res) => {
  try {
    const order = await Order.create(req.body);
    res.status(201).json(order);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

/**
 * @swagger
 * /api/orders/{id}:
 *   put:
 *     tags:
 *       - Orders
 *     description: Updates an order
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: Order ID
 *         in: path
 *         required: true
 *         type: integer
 *       - name: order
 *         description: Order object
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/components/schemas/Order'
 *     responses:
 *       200:
 *         description: Successfully updated
 *       500:
 *         description: Server error
 */
router.put('/:id', async (req, res) => {
  try {
    const [updated] = await Order.update(req.body, {
      where: { order_id: req.params.id },
    });
    if (updated) {
      const updatedOrder = await Order.findByPk(req.params.id);
      res.status(200).json(updatedOrder);
    } else {
      res.status(404).send('Order not found');
    }
  } catch (err) {
    res.status(500).send('Server error');
  }
});

/**
 * @swagger
 * /api/orders/{id}:
 *   delete:
 *     tags:
 *       - Orders
 *     description: Deletes an order
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: Order ID
 *         in: path
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: Successfully deleted
 *       500:
 *         description: Server error
 */
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Order.destroy({
      where: { order_id: req.params.id },
    });
    if (deleted) {
      res.status(200).send('Order deleted');
    } else {
      res.status(404).send('Order not found');
    }
  } catch (err) {
    res.status(500).send('Server error');
  }
});

module.exports = router;
