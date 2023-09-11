const dotenv = require('dotenv');
const { default: axios } = require("axios");

dotenv.config({ path: './config.env' });

const getPlansProfile = async () => {
    try {
        const response = await axios.get(`${process.env.BASE_URL_WIBOND}/payment-link/anonymous/plans-profile/tenant/${process.env.ID_TENANT}/wallet/${process.env.ID_WALLET}`, { headers: { 'Authorization': process.env.SECRET_KEY } }
        );

        return {
            data: response.data,
            error: false
        }

    } catch (e) {

        console.error("Error:", e);

        return {
            data: {},
            error: true
        }
    }
}


const createLinkPayment = async (amount, plans) => {
    try {

        const response = await axios.post(`${process.env.BASE_URL_WIBOND}/payment-link/anonymous/create-payment-link/${process.env.ID_TENANT}/wallet/${process.env.ID_WALLET}`,
            {
                "productName": "Producto de prueba",
                "amount": amount,
                "options": plans,
                "urlSuccess": "https://www.google.com/?hl=es",
                "urlNotification": "https://example.com.ar/wc-api/wibond_gateway",
                "urlCheckout": "https://https://shapediver.com/"
            },
            { headers: { 'Authorization': process.env.SECRET_KEY } }
        );

        return {
            error: false,
            data: response.data
        }

    } catch (e) {
        console.error("Error:", e);

        return {
            error: true,
            data: e
        }
    }
}


const obtainKeyValuePair = (arr) => {

    let finalArr = []

    arr.forEach(plan => {
        finalArr.push({
            id: plan.id,
            code: plan.code
        })
    })

    return finalArr
}


exports.createLinkPaymentHandle = async (req) => {

    try {

        const plans = await getPlansProfile();

        if (!plans.error) {

            const arrPlansIdCodes = obtainKeyValuePair(plans.data.plans);

            const response = await createLinkPayment(req.body.amount, arrPlansIdCodes);

            return {
                data: response.data,
                status: 201
            }

        }

    } catch (e) {
        console.log("Error: " + e);

        return {
            data: e,
            status: 500
        }
    }

}