let oracledb = require('oracledb')

oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT

module.exports.getCalculateTaxPage = async (req, res, next) => {
    res.locals.title = 'Calculate Tax';
    res.status(200).render('bbTax/bbTaxCalculate');
}

module.exports.calculateTax = async (req, res, next) => {
    let connection;
    let result;
    let p_result;
    console.log(req.body)
    try {
        connection = await oracledb.getConnection({
            user: "COMP214_F22_er_19",
            password: "admingroup4",
            connectString: "199.212.26.208/SQLD"
        });
        let p_state = req.body.state;
        let p_subtotal = parseFloat(req.body.subtotal);

        result = await connection.execute(
            `BEGIN TAX_COST_SP(:p_state ,:p_subtotal, :p_result ); END;`,
            {
                p_state: p_state,
                p_subtotal: p_subtotal,
                p_result: { dir: oracledb.BIND_OUT, type: oracledb.NUMBER, val: p_result }
            }
        );
    } catch (err) {
        console.log(err)
        req.flash('error', 'No Tax were calculated')
        return res.redirect('/bb-tax/calculate-tax');
    } finally {
        if (connection) {
            try {
                await connection.close();
            } catch (err) {
                console.error(err);
            }
        }
    }
    console.log(result);
    req.flash('success', `The tax for this customer will be $${result.outBinds.p_result}`);
    return res.status(200).redirect('/bb-tax/calculate-tax')
}