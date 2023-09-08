const dotenv = require('dotenv');
const { default: axios } = require("axios");

dotenv.config({ path: './config.env' });


const getPlansProfile = async () => {
    const response = await axios.get(`${process.env.BASE_URL_WIBOND}/payment-link/anonymous/plans-profile/tenant/${process.env.ID_TENANT}/wallet/${process.env.ID_WALLET}`,
        {},
        { headers: { 'Content-Type': 'application/json' } }
    );

    return response
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
