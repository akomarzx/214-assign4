module.exports.getCalculateTaxPage = async (req, res, next) => {
    res.locals.title = 'Calculate Tax';
    res.status(200).render('bbTaxCalculate');
}