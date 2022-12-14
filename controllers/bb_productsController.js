let oracledb = require('oracledb')

oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;

module.exports.getAllBBProducts = async (req, res, next) => {
    let connection;
    let result;
    let query = `SELECT * FROM BB_PRODUCT ORDER BY IDPRODUCT`;
    let binds = [];
    let basketIDs = [];
    if (req.query.search) {
        query = `SELECT * FROM BB_PRODUCT WHERE PRODUCTNAME LIKE :search ORDER BY IDPRODUCT`;
        binds.push(req.query.search);
        console.log(binds)
    } else {
        query = `SELECT * FROM BB_PRODUCT ORDER BY IDPRODUCT`
    }
    try {
        connection = await oracledb.getConnection({
            user: "COMP214_F22_er_19",
            password: "admingroup4",
            connectString: "199.212.26.208/SQLD"
        });
        basketIDs = await connection.execute(`SELECT IDBASKET FROM BB_BASKET`);
        result = await connection.execute(query, binds);
    } catch (err) {
        req.flash('error', err.message);
        res.redirect('/');
    } finally {
        if (connection) {
            try {
                await connection.close();
            } catch (err) {
                console.error(err);
            }
        }
    }
    res.locals.idbaskets = basketIDs?.rows;
    res.locals.title = 'BB Products';
    res.locals.products = result.rows;
    res.status(200).render('bbProducts/index')
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
    res.status(200).render('bbProducts/editBBProduct')
}

module.exports.editBBProduct = async (req, res, next) => {
    let connection;
    let result;
    try {
        connection = await oracledb.getConnection({
            user: "COMP214_F22_er_19",
            password: "admingroup4",
            connectString: "199.212.26.208/SQLD"
        });
        let p_id = parseInt(req.body.productId);
        let p_desc = req.body.newDescription
        result = await connection.execute(
            `BEGIN SP_EDIT_PROD_DESC(:p_id ,:p_desc); END;`,
            {
                p_id: p_id,
                p_desc: p_desc
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
    req.flash('success', 'Product Updated Succesfully')
    return res.status(200).redirect('/')
}

module.exports.getBBProductCreatePage = async (req, res, next) => {
    res.locals.title = 'Add new Product';
    res.status(200).render('bbProducts/addBBProduct');
}

module.exports.createBBProduct = async (req, res, next) => {
    let connection;
    let result;
    try {
        connection = await oracledb.getConnection({
            user: "COMP214_F22_er_19",
            password: "admingroup4",
            connectString: "199.212.26.208/SQLD"
        });
        result = await connection.execute(
            `BEGIN PROD_ADD_SP(:p_name, :p_desc , :p_img, :p_price, :p_status); END;`,
            {
                p_name: req.body.productName,
                p_desc: req.body.description,
                p_img: req.body.imageName,
                p_price: parseFloat(req.body.price),
                p_status: parseInt(req.body.status)
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
    req.flash('success', 'Product Created Succesfully')
    return res.status(200).redirect('/')
}
