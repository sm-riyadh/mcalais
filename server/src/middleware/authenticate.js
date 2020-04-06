import User from '../models/user'

const authenticate = async (req, res, next) => {
  const token = req.header('x-auth')

  try {
    const user = await User.findByToken(token)
    if (!user) throw 'You need to signin'

    req.userData = {
      id       : user.id,
      username : user.username,
      name     : user.name,
      company  : user.company,
      power    : user.power,
    }
    return next()
  } catch (error) {
    return res.status(401).send(error)
  }
}

export default authenticate
