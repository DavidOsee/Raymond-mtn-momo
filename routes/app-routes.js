import express from 'express'

// Controllers  
import {RequestPayment} from '../controllers/app-controllers.js'


//:: ROUTES
const router = express.Router()

router
.post('/request-payment', RequestPayment)



//Export to routes
export default router