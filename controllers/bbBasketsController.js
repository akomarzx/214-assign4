let oracledb = require('oracledb')
oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;

module.exports.getBasket = async (req, res, next) => {
    let connection;
    let basketsIDResult;
    let basketIdquery = `SELECT IDBASKET FROM BB_BASKET ORDER BY IDBASKET`
    let getBasketByIdQuery = ''
    let getBasketItemResult;
    try {
        connection = await oracledb.getConnection({
            user: "COMP214_F22_er_19",
            password: "admingroup4",
            connectString: "199.212.26.208/SQLD"
        });
        if (req.query.basketId) {
            getBasketItemResult = await connection.execute(`
                SELECT prod.productname, bi.quantity, bi.price FROM bb_basket b
                JOIN bb_basketitem bi ON b.idbasket = bi.idbasket
                JOIN bb_product prod ON bi.idproduct = prod.idproduct
                WHERE b.idbasket = :basket_id
            `, [req.query.basketId])
        }
        basketsIDResult = await connection.execute(basketIdquery);
    } catch (err) {
        req.flash('error', err.message);
        return res.redirect('/baskets');
    } finally {
        if (connection) {
            try {
                await connection.close();
            } catch (err) {
                console.error(err);
            }
        }
    }
    res.locals.selectedBasket = req.query.basketId || 3
    res.locals.basketItems = getBasketItemResult?.rows || [];
    res.locals.title = 'BB Products';
    res.locals.baskets = basketsIDResult?.rows;
    res.status(200).render('bbBasket/bbBasketList')
}