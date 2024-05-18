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
        <div>Bạn đã đặt sản phẩm <b>${order.name}</b> với số lượng: <b>${order.amount}</b>
                và gía: 
                <b>${order.price} VND</b>
            </div>
            <div>Phía dưới là hình ảnh của sản phẩm</div>           
        </div>`;
        attachImage.push({ path: order.image });
    });

    // async..await is not allowed in global scope, must use a wrapper
    // send mail with defined transport object
    let receivers = ['tamstoreweb@gmail.com', 'minhtam5111993@gmail.com', 'tamb2113394@student.ctu.edu.vn'];
    let info = await transporter.sendMail({
        from: process.env.MAIL_ACCOUNT, // sender address
        // to: 'tamstoreweb@gmail.com', // list of receivers
        to: receivers, // list of receivers
        subject: 'Đăt hàng thành công tại TamStore ✔', // Subject line
        text: 'Hello world?', // plain text body
        html: `<div>
        <div>Đặt hàng thành công.</div>${listItem}
        <div></div>
        <div>Cám ơn bạn đã sử dụng dịch vụ chúng tôi. Chúc bạn một ngày tốt lành</div>
        </div>`,
        attachments: attachImage,
    });
};

module.exports = {
    sendEmailCreateOrder,
};
