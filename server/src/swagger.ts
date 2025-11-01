import swaggerJSDoc from "swagger-jsdoc";
import * as swaggerUi from "swagger-ui-express";
import { Application } from "express";
import path from "path";

const options: swaggerJSDoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "TaxPal API Documentation",
      version: "1.0.0",
      description: "Comprehensive API documentation for all modules",
    },
    servers: [
      {
        url:
          process.env.NODE_ENV === "production"
            ? "https://taxpal-a-personal-finance-tracking-app-2.onrender.com/api/v1"
            : "http://localhost:5000/api/v1",
        description:
          process.env.NODE_ENV === "production"
            ? "Render production server"
            : "Local development server",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [{ bearerAuth: [] }],
  },
  apis: [
    // ✅ Use .ts in dev and .js in production
    path.join(__dirname, "./api/**/*.{ts,js}"),
  ],
};

const swaggerSpec = swaggerJSDoc(options);

export const setupSwagger = (app: Application) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  console.log(
    `📘 Swagger docs available at: ${
      process.env.NODE_ENV === "production"
        ? "https://taxpal-a-personal-finance-tracking-app-2.onrender.com/api-docs"
        : "http://localhost:5000/api-docs"
    }`
  );
};
