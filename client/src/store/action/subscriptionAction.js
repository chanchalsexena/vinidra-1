import axios from 'axios';
import { server } from '../store';

export const buySubscription = () => async (dispatch) => {
    try {
        dispatch({ type: 'buySubscriptionRequest' });
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
            withCredentials: true,
        };
        const { data } = await axios.get(`${server}/buy-subscription`, config);
        dispatch({ type: 'buySubscriptionSuccess', payload: data.subscriptionId });
    } catch (error) {
        dispatch({ type: 'buySubscriptionFailed', payload: error.response.data });
    }
};
// Cancel Subscription
export const cancelSubscription = () => async (dispatch) => {
    try {
        dispatch({ type: 'cancelSubscriptionRequest' });
        const config = { withCredentials: true };
        const { data } = await axios.delete(`${server}/cancel-subscription`, config);
        dispatch({ type: 'cancelSubscriptionSuccess', payload: data.message });
    } catch (error) {
        dispatch({ type: 'cancelSubscriptionFailed', payload: error.response.data });
    }
};