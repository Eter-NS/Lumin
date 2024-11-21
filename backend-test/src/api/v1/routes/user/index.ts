import express from 'express'
import { register } from '../../controllers/user/register'
import { login } from '../../controllers/user/login'
import { getChats } from '../../controllers/user/getChats'
import { getChat } from '../../controllers/user/getChat'
import { createChat } from '../../controllers/user/createChat'
import { updateChat } from '../../controllers/user/updateChat'
import { deleteChat } from '../../controllers/user/deleteChat'

const router = express.Router()

router.post('/register', register)
router.get('/login', login)
router.get('/get-chats', getChats)
router.get('/get-chat/:id', getChat)
router.post('/create-chat', createChat)
router.patch('/update-chat', updateChat)
router.delete('/delete-chat', deleteChat)

export default router
