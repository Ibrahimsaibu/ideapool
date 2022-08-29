import { createIdea, getIdeas, removeIdea, updateIdea } from './../controller/ideaController';

import { Router } from 'express'
import authMiddleware from '../middleware/authMiddleware';

const ideaRoute = Router()

ideaRoute.post('/createidea', authMiddleware, createIdea)
ideaRoute.get('/getideas', authMiddleware, getIdeas)
ideaRoute.delete('/:id', authMiddleware, removeIdea)
ideaRoute.put('/:id', authMiddleware, updateIdea)





export default ideaRoute