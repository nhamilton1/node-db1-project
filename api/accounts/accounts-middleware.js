const Accounts = require('./accounts-model')

exports.checkAccountPayload = (req, res, next) => {
  // DO YOUR MAGIC
  
}

exports.checkAccountNameUnique = (req, res, next) => {
  // DO YOUR MAGIC
}

exports.checkAccountId = async (req, res, next) => {
  // DO YOUR MAGIC
  try {
    const checkId = await Accounts.getById(req.params.id)
    if(checkId) {
      req.account = checkId
      next()
    } else {
      res.status(404).json({
        message: "account not found"
      })
    }
  } catch (err) {
    next(err)
  }
}
