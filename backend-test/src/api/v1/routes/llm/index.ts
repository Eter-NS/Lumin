import express from 'express'
import { changeChatModel } from '../../controllers/llm/changeModel'
import { chat } from '../../controllers/llm/chat'
import { generateTitle } from '../../controllers/llm/generateTitle'
import { getModels } from '../../controllers/llm/getModels'

const router = express.Router()

router.post('/change-chat-model', changeChatModel)
router.post('/chat', chat)
router.post('/generate-title', generateTitle)
router.get('/get-models', getModels)

export default router
