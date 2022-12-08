let oracledb = require('oracledb');

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
    res.status(200).render('bbBasketStatus/createBasketStatusPage');
}

