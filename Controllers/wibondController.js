const { getPlansProfile } = require("../Services/wibondServices");

exports.createPaymentInt = async (_, res) => {
    try {
        const result = await getPlansProfile();
        const { status, data } = result;
        console.log("result", result);
        res.status(status).json(data);

    } catch (error) {
        res.status(500).send('Internal error server');
    }
};