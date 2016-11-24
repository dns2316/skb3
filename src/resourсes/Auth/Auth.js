import jwt from 'express-jwt'

export function canonize(str) {
  return str.toLowerCase().trim()
}

export default (ctx) => {
  const User = ctx.models.user
  const resource = {}

  resource.validate = async function (req) {
    const user = await User.findById(req.user._id)
    if (!user) return res.status(404).send('Not found \'user\' in db')
    return {
      __pack: 1,
      jwt: req.user,
      user: user
    }
  }

  resource.getUserFields = function (req) {
    return req.body
  }
  resource.getUserCriteria = function (req, res) {
    const params = req.body
    if (params.username) {
      return {
        username: canonize(params.username),
      }
    }
    return res.status(400).send('Params username, email, login not request')
  }
  resource.signup = async function (req, res) {
     try {
       const userFields = responce.getUserFields(req, res)
       const criteria = resource.getUserCriteria(req, res)
       const existUser = await User.findOne(criteria)
       if (existUser) return res.status(400).send('Username with this email or username is registered')
       const user = new User(userFields)
       await user.save()
       return res.json({
         signup: true,
         user,
         token: user.generateAuthToken()
       })

     } catch (err) {
       console.log(err);
       return res.status(500).json(err)
     }
  }

  resource.login = async function (req, res) {
    const params = resource.getUserCriteria(req, res)
    if (!params.password) return res.status(400).send('params passwords not found')

    const criteria = resource.getUserCriteria(req)
    const user = await User.findOne(criteria)

    if (!user) return res.status(404).send('user not found')

    if(!await user.verifyPassword(params.password)) {
      return res.status(400).send('password != password')
    }

    return res.json({
      __pack: 1,
      user,
      token: user.generateAuthToken(),
    })
  }
}
