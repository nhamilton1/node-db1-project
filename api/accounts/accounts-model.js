const db = require('../../data/db-config')

const getAll = () => {

  // select * from accounts;
  return db('accounts')
    .select('id', 'name', 'budget')
}

const getById = id => {

  return db('accounts')
    .where('id', id)
    .first()
}

const create = async account => {
  const [id] = await db('accounts')
    .insert(account)
    return getById(id)
}

const updateById = (id, account) => {

}

const deleteById = id => {
  return db('accounts').where('id', id).del()
}

module.exports = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
}
