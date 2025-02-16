import swaggerJsdoc from "swagger-jsdoc";

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Documentación APIs NodeJs', 
            version: '1.0.0',
            description: "Documentación Prueba técnica de NodeJs - Macropay", 
            contact: {
                name: '@OMEDO'
            }
        }
    },
    apis: ['./src/routes/**/*.ts']
};


const specs = swaggerJsdoc(options);
export default specs;
