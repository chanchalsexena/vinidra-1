import Razorpay from 'razorpay';
import dotenv from 'dotenv';
dotenv.config({ path: '../config/.env' });
var instance = new Razorpay({
    key_id: process.env.RAZORPAY_API_KEY || "rzp_test_zczGgMm0B61buE",
    key_secret: process.env.RAZORPAY_API_SECRET || "Kkq4YDjiszb8aH7gltFMgaft"
});
export default instance;