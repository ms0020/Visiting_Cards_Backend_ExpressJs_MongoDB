const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Visiting Cards',
            version: '1.0.0',
            description: 'Visiting Card APIs',
        },
        servers: [
            {
                url: "http://localhost:8080" // Change base URL
            },
        ],
    },
    apis: [
        './routes/visitingCardRoutes.js'
    ]
};

const swaggerSpec = swaggerJSDoc(options);

const setupSwagger = (app) => {
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};

module.exports = setupSwagger;