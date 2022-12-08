let oracledb = require('oracledb');

oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT

module.exports.getBasketStatusPage = async (req, res, next) => {
    let connection;
    let result;
    try {
        connection = await oracledb.getConnection({
            user: "COMP214_F22_er_19",
            password: "admingroup4",
            connectString: "199.212.26.208/SQLD"
        });

        result = await connection.execute(
            `SELECT * FROM BB_BASKETSTATUS`
        );
        // console.log(result.rows);
    } catch (err) {
        req.flash('error', 'Something went wrong');
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
    res.locals.title = 'Baskets Status';
    res.locals.baskets = result.rows;
    res.status(200).render('bbBasketStatus/bbBasketStatusPage');
}

module.exports.createBasketStatusPage = async (req, res, next) => {
    let connection;
    let result;
    try {
        connection = await oracledb.getConnection({
            user: "COMP214_F22_er_19",
            password: "admingroup4",
            connectString: "199.212.26.208/SQLD"
        });

        result = await connection.execute(
            `SELECT IDBASKET FROM BB_BASKET`
        );
        // console.log(result.rows);
    } catch (err) {
        req.flash('error', 'Something went wrong');
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
    res.locals.title = 'Create Basket Status';
    res.locals.baskets = result.rows;
    console.log(res.locals.baskets);
    res.status(200).render('bbBasketStatus/createBasketStatuspage');
}

module.exports.createBasketStatus = async (req, res, next) => {
    let connection;
    let result;
    console.log(req.body)
    try {
        connection = await oracledb.getConnection({
            user: "COMP214_F22_er_19",
            password: "admingroup4",
            connectString: "199.212.26.208/SQLD"
        });

        result = await connection.execute(
            `BEGIN STATUS_SHIP_SP(:p_bid, :p_idStage ,:p_dateShipped, :p_shipper, :p_tracking); END;`,
            {
                p_bid: parseInt(req.body.basketId),
                p_idStage: parseInt(req.body.idStage),
                p_shipper: req.body.shipper,
                p_tracking: req.body.trackNum,
                p_dateShipped: req.body.dtshipped
            }
        );
        // console.log(result.rows);
    } catch (err) {
        console.log(err)
        req.flash('error', 'Something went wrong');
        return res.redirect('/baskets-status/create-status');
    } finally {
        if (connection) {
            try {
                await connection.close();
            } catch (err) {
                console.error(err);
            }
        }
    }
    res.status(200).redirect('/baskets-status');
}