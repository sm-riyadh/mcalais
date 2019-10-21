import Router from 'express'
import { Types } from 'mongoose'

const ObjectId = Types.ObjectId

// Model
// import User from '../models/user'

// Middleware
// import authenticate from '../middleware/authenticate'
// import authenticateAdmin from '../middleware/authenticateAdmin'

// Express > Router
const app = Router()

// CHECK SERVER STATUS
app.get('/api', (req, res) => res.send('Server is working :}'))

app.get('/api/auth', authenticate, async (req, res) => {
	res.send(req.userData)
})
// Sign In
app.post('/api/auth/signin', async (req, res) => {
	var body = _.pick(req.body, [ 'username', 'password', 'access', 'system' ])
	try {
		if (!body.username && !body.password) throw 'Username and Password are required'

		const user = await User.findByCredentials(body.username, body.password)
		const token = await user.generateAuthToken(body.access, body.system)
		return res.header('x-auth', token).send({ token })
	} catch (err) {
		return res.status(400).send(err)
	}
})
// Sign Out
app.delete('/api/auth/signout', authenticate, async (req, res) => {
	try {
		await User.removeToken(req.token)
		return res.send()
	} catch (err) {
		return res.status(400).send(err)
	}
})
app.patch('/api/admin/user', authenticateAdmin, async (req, res) => {
	const payload = _.pick(req.body, [ 'id', 'old_buyer_name', 'new_buyer_name' ])

	try {
		await Company.findOneAndUpdate(
			{ _id: ObjectId(payload.id), buyers: payload.old_buyer_name },
			{ $set: { 'buyers.$': payload.new_buyer_name } }
		)
		const data = await Company.find()
		return res.send(data)
	} catch (err) {
		res.status(400).send(err)
	}
})

export default app
