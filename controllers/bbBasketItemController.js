let oracledb = require('oracledb')
oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;

module.exports.createBasketItem = async (req, res, next) => {
    let connection;
    let result;
    try {
        connection = await oracledb.getConnection({
            user: "COMP214_F22_er_19",
            password: "admingroup4",
            connectString: "199.212.26.208/SQLD"
        });
        result = await connection.execute(
            `BEGIN BASKET_ADD_SP(:p_quantity, :p_idbasket , :p_idproduct, :p_price); END;`,
            {
                p_quantity: parseInt(req.body.quantity),
                p_idbasket: parseInt(req.body.idbasket),
                p_idproduct: req.body.idproduct,
                p_price: parseFloat(req.body.price) * parseInt(req.body.quantity)
            }
        );
    } catch (err) {
        console.log(err)
        req.flash('error', 'Something went wrong')
        return res.redirect('/');
    } finally {
        if (connection) {
            try {
                await connection.close();
            } catch (err) {
                console.error(err);
            }
        }
    }
    req.flash('success', 'Item added to cart succesfully');
    res.redirect('/');
}