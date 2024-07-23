require('dotenv').config();
const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const sequelize = require('./config/database');
const productRoutes = require('./Routes/api/products');
const customerRoutes = require('./Routes/api/customers');
const orderRoutes = require('./Routes/api/orders');

const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'SHOPEASE API',
      description: 'GRUP J API documentation for the e-commerce application,  GEORGE ,  KELVIN , TIFFANY',
      version: '1.0.0',
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Development server',
      },
    ],
    components: {
      schemas: {
        Product: {
          type: 'object',
          properties: {
            name: { type: 'string' },
            price: { type: 'number' },
            description: { type: 'string' },
            
            
          },
        },
        Customer: {
          type: 'object',
          properties: {
            customer_id: { type: 'integer' },
            name: { type: 'string' },
            email: { type: 'string' },
            password: { type: 'string' },
            address: { type: 'string' },
            phone_number: { type: 'string' },
            date_of_birth: { type: 'string', format: 'date' },
          },
          required: ['name', 'email', 'password'],
        },
        Order: {
          type: 'object',
          properties: {
            order_id: { type: 'integer' },
            customer_id: { type: 'integer' },
            order_date: { type: 'string', format: 'date-time' },
            total_amount: { type: 'number' },
            
          },
        },
        
      },
    },
  },
  apis: ['./Routes/api/*.js'],
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Define a basic route to avoid "Cannot GET /"
app.get('/', (req, res) => {
  res.send('Welcome to the SHOPEASE API. This is a project done by Groups J, Authours: Tiffany, George and Kelvin. Go to /api-docs to view the API documentation.');
});

app.use('/api/products', productRoutes);
app.use('/api/customers', customerRoutes);
app.use('/api/orders', orderRoutes);




sequelize.sync()
  .then(() => {
    app.listen(3000, () => {
      console.log('Server started on http://localhost:3000');
    });
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });
