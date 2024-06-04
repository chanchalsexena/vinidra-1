import express from "express";
import cors from "cors";
import cookie from 'cookie-parser';
import env from 'dotenv';
import userRoute from './routes/userRoute.js';
import contactRoute from './routes/contactRoute.js';
import courseRoute from './routes/courseRoute.js';
import paymentRoute from './routes/paymentRoute.js';
import examRoute from './routes/examRoute.js';
import homeRoute from './routes/homeRoute.js';
import faqRoute from './routes/faqRoute.js';
const app = express();
env.config({ path: './config/.env' });
// Handle Form Data
app.use(express.urlencoded({ extended: true }));
app.use(express.json({
    limit: '100mb'
}));


// Enable CORS
app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE']
}));

// Enable Cookie

app.use(cookie());


// Routes

// Apply the userRoute to the app
app.use("/api/v1", userRoute, contactRoute, courseRoute, paymentRoute, examRoute, homeRoute, faqRoute);
app.get('/test', (req, res) => {
    res.status(200).json({ message: "Hello from server" });
});


app.all("*", (req, res, next) => {
    const err = new Error(`Route ${req.originalUrl} not found`)
    err.statusCode = 404;
    next(err);
});
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    res.status(statusCode).json({
        success: false,
        statusCode,
        message,
    });
});


export default app;
