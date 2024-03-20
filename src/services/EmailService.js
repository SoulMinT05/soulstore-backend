const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
dotenv.config();

const sendEmailCreateOrder = async (email, orderItems) => {
    let transporter = nodemailer.createTransport({
        // host: 'smtp.ethereal.email',
        host: 'smtp.gmail.com',
        port: 465,
        secure: true, // Use `true` for port 465, `false` for all other ports
        auth: {
            user: process.env.MAIL_ACCOUNT,
            pass: process.env.MAIL_PASSWORD,
        },
    });

    let listItem = '';
    const attachImage = [];
    orderItems.forEach((order) => {
        listItem += `<div>
        <div>You have ordered the product <b>${order.name}</b> with the quantity: <b>${order.amount}</b>
                and price: 
                <b>${order.price} $</b>
            </div>
            <div>Below is the product image</div>           
        </div>`;
        attachImage.push({ path: order.image });
    });

    // async..await is not allowed in global scope, must use a wrapper
    // send mail with defined transport object
    let info = await transporter.sendMail({
        from: process.env.MAIL_ACCOUNT, // sender address
        to: 'tamstoreweb@gmail.com', // list of receivers
        subject: 'Order at TamStore ✔', // Subject line
        text: 'Hello world?', // plain text body
        html: `<div>
        <div>Have placed order successfully.</div>${listItem}
        <div></div>
        <div>Thank you for using our service. Have a good day!</div>
        </div>`,
        attachments: attachImage,
    });
};

module.exports = {
    sendEmailCreateOrder,
};
