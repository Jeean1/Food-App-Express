const swaggerUI = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");
const path = require("path");
const swaggerSpec = {
  definition: {
    openapi: "3.0.3",
    info: {
      title: "Restaurant App Documentation",
      description:
        "App use for create a restaurants with his food and sells to clients. Can create a user, to buy food or create your restaurant and start your own bussiness in this app",
      version: "1.0.0",
    },
    servers: [
      {
        url: "http://localhost:4000",
      },
    ],
  },
  apis: [`${path.join(__dirname, "./routes/swagger.js")}`],
};

module.exports = { swaggerUI, swaggerJsDoc, swaggerSpec };
