import express from 'express';
import 'dotenv/config';
import morgan from 'morgan';
import routes from './routes/index.js';
import errorHandler from './middlewares/errorHandler.js';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from './docs/swagger.json' assert {type: "json"};

const app = express();

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(express.json())

app.use('/api', routes);
// app.use(errorHandler);
app.use(morgan('common'));

const port = process.env.APP_PORT;
app.listen(port, (err) => {
    if (err) {
        throw err;
    }
    else{
        console.log(`Server is running on port ${port}`)
    }
});