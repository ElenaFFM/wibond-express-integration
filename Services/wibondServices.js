const dotenv = require('dotenv');
const { default: axios } = require("axios");

dotenv.config({ path: './config.env' });

const getPlansProfile = async () => {
    try {
        const response = await axios.get(`${process.env.BASE_URL_WIBOND}/payment-link/anonymous/plans-profile/tenant/${process.env.ID_TENANT}/wallet/${process.env.ID_WALLET}`, { headers: { 'Authorization': process.env.SECRET_KEY } }
        );

        // console.log("response1", typeof response.data);
        // console.log("response2", response.data);
        // // console.log("response3", JSON.parse(response.data));
        // console.log("response4", JSON.stringify(response.data));

        return {
            'error': false,
            'data': response.data
        }

    } catch (e) {

        console.error("Error:", e);

        return {}
    }
}


const createLinkPayment = async (amount, plans) => {
    try {
        const response = await axios.post(`${process.env.BASE_URL_WIBOND}/payment-link/anonymous/create-payment-link/tenant/${process.env.ID_TENANT}/wallet/${process.env.ID_WALLET}`,
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

        console.log("PLAANS", typeof plans.data.plans, plans.data.plans);

        if (!plans.error) {
            const arrPlansIdCodes = obtainKeyValuePair(plans.plans);

            const response = await createLinkPayment(req.amount, arrPlansIdCodes);

            return response
        }

    } catch (e) {
        console.log("-------------------");
        console.log("Error crítico: " + e);
    }

}



// const generateAccessToken = async () => {
//     const response = await axios.post(`${process.env.BASE_URL_WIBOND}/merchants/middleman/token`,
//         {
//             username: process.env.CLIENT_ID,
//             password: process.env.CLIENT_SECRET,
//         },
//         { headers: { 'Content-Type': 'application/json' } });
//     return response.data.accessToken;
// };


// exports.createPaymentIntention = async (req) => {

//     // Crear orden de compra en la base de datos de la tienda. Esto viene desde el front (?.
//     const mockOrder = {
//         id: 123,
//     };

//     try {

//         const accessToken = await generateAccessToken();

//         const response = await axios.post(`${process.env.BASE_URL_WIBOND}/merchants/ecommerce/payment-intention`,
//             {
//                 productName: 'Producto botón de pago',
//                 price: req.body.price,
//                 quantity: 1,
//                 storeId: process.env.STORE_ID,
//                 currency: 'ARS',
//                 externalIntentionId: mockOrder.id,
//                 // expirationDate: "2023-12-27 18:50",
//             },
//             {
//                 headers: {
//                     'Content-Type': 'application/json',
//                     Authorization: `Bearer ${accessToken}`,
//                 },
//             });

//         return {
//             status: 201,
//             data: response.data
//         }


//     } catch (error) {

//         return {
//             status: 500,
//             data: error
//         }
//     }
// };
