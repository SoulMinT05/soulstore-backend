// const createOrder = (newOrder) => {
//     return new Promise(async (resolve, reject) => {
//         console.log('order', newOrder);
//         // const { name, email, password, confirmPassword, phone } = newUser;
//         // try {
//         //     const checkUser = await User.findOne({
//         //         email: email,
//         //     });
//         //     if (checkUser !== null) {
//         //         resolve({
//         //             status: 'ERR',
//         //             message: 'The email is already',
//         //         });
//         //     }
//         //     const hash = bcrypt.hashSync(password, 10);
//         //     const createdUser = await User.create({
//         //         name,
//         //         email,
//         //         password: hash,
//         //         phone,
//         //     });
//         //     if (createdUser) {
//         //         resolve({
//         //             status: 'OK',
//         //             message: 'SUCCESS',
//         //             data: createdUser,
//         //         });
//         //     }
//         // } catch (e) {
//         //     reject(e);
//         // }
//     });
// };

// module.exports = {
//     createOrder,
// };

const Order = require('../models/OrderProduct');

const createOrder = (newOrder) => {
    return new Promise(async (resolve, reject) => {
        const {
            orderItems,
            paymentMethod,
            itemsPrice,
            shippingPrice,
            totalPrice,
            fullName,
            address,
            city,
            phone,
            user,
        } = newOrder;
        try {
            const createdOrder = await Order.create({
                orderItems,
                shippingAddress: {
                    fullName,
                    address,
                    city,
                    phone,
                },
                paymentMethod,
                itemsPrice,
                shippingPrice,
                totalPrice,
                user: user,
            });
            if (createdOrder) {
                resolve({
                    status: 'OK',
                    message: 'SUCCESS',
                    data: createdOrder,
                });
            }
        } catch (e) {
            console.log('e', e);
            reject(e);
        }
    });
};

module.exports = {
    createOrder,
};
