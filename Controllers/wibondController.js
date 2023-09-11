const { createLinkPaymentHandle } = require("../Services/wibondServices");

exports.createLinkPayment = async (req, res) => {
    try {
        const result = await createLinkPaymentHandle(req);
        console.log("result", result);
        res.status(200).json(result);

    } catch (error) {
        res.status(500).send('Internal error server');
    }
};