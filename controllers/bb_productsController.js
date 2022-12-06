let oracledb = require('oracledb')

oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;

module.exports.getAllBBProducts = async (req, res, next) => {
    let connection;
    let result;

    try {
        connection = await oracledb.getConnection({
            user: "COMP214_F22_er_19",
            password: "admingroup4",
            connectString: "199.212.26.208/SQLD"
        });

        result = await connection.execute(
            `SELECT * FROM BB_PRODUCT`
        );
    } catch (err) {
        console.log(err)
        next(err)
    } finally {
        if (connection) {
            try {
                await connection.close();
            } catch (err) {
                console.error(err);
            }
        }
    }
    res.locals.title = 'BB Products';
    res.locals.products = result.rows;
    res.status(200).render('index')
}

module.exports.editBBProductPage = async (req, res, next) => {
    let connection;
    let result;

    try {
        connection = await oracledb.getConnection({
            user: "COMP214_F22_er_19",
            password: "admingroup4",
            connectString: "199.212.26.208/SQLD"
        });

        result = await connection.execute(
            `SELECT * FROM BB_PRODUCT`
        );
    } catch (err) {
        console.log(err)
        next(err)
    } finally {
        if (connection) {
            try {
                await connection.close();
            } catch (err) {
                console.error(err);
            }
        }
    }
    res.locals.title = 'Edit BB Product';
    res.locals.products = result.rows;
    res.status(200).render('editBBProduct')
}

module.exports.editBBProduct = async (req, res, next) => {
    let connection;
    let result;
    console.log(req.body);
    try {
        connection = await oracledb.getConnection({
            user: "COMP214_F22_er_19",
            password: "admingroup4",
            connectString: "199.212.26.208/SQLD"
        });
        let p_id = parseInt(req.body.productId);
        let p_desc = req.body.newDescription
        result = await connection.execute(
            `EXEC SP_EDIT_PROD_DESC(2 ,"Hello world")`,
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
    req.flash('success', 'Product Updated Succesfully')
    return res.status(200).redirect('/')
}