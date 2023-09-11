const { createLinkPaymentHandle } = require("../Services/wibondServices");

exports.createLinkPayment = async (req, res) => {
    try {
        const { status, data } = await createLinkPaymentHandle(req);
        res.status(status).json(data);

    } catch (error) {
        res.status(500).send('Internal error server');
    }
};