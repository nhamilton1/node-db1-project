const Accounts = require('./accounts-model')
const yup = require('yup')
const db = require('../../data/db-config')

// const accountPayloadSchema = yup.object().shape({
//   name: yup
//     .string('name of account must be a string')
//     .trim()
//     .min(3, 'name of account must be between 3 and 100')
//     .max(100, 'name of account must be between 3 and 100')
//     .typeError('name must be a string')
//     .required(),
//   budget: yup
//     .number('budget of account must be a number')
//     .positive('budget of account is too large or too small')
//     .typeError('budget bust be a number')
//     .required()
// })

// exports.checkAccountPayload = async (req, res, next) => {
//   try {
//     const validatedPayload = await accountPayloadSchema.validate(
//       req.body,
//       { strict: false, stripUnknown: true }
//     )
//     req.body = validatedPayload
//     next()
//   } catch (err) {
//     res.status(400).json({
//       message: 'name and budget are required'
//     })
//   }
// }

exports.checkAccountPayload = async (req, res, next) => {
  const { name, budget } = req.body
  if (name === undefined || budget === undefined) {
    res.status(400).json({
      message:'name and budget are required'
    })
  } else if (typeof name !== 'string') {
    res.status(400).json({
      message:'name of account must be a string'
    })
  } else if (name.trim().length < 3 || name.trim().length > 100) {
    res.status(400).json({
      message:'name of account must be between 3 and 100'
    })
  } else if (typeof budget !== 'number' || isNaN(budget)) {
    res.status(400).json({
      message:'budget of account must be a number'
    })
  } else if (budget < 0 || budget > 1000000) {
    res.status(400).json({
      message:'budget of account is too large or too small'
    })
  } else {
    next()
  }
}

exports.checkAccountNameUnique = async (req, res, next) => {
  try {
    const exisiting = await db('accounts')
      .where('name', req.body.name.trim())
      .first()
      
    if (exisiting) {
      next({ status: 400, message: 'that name is taken'})
    } else {
      next()
    }
  } catch (err) {
    next(err)
  }
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
