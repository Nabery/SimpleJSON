import initMiddleware from '../../lib/initMiddleware'
import validateMiddleware from '../../lib/validateMiddleware'
import { check, validationResult } from 'express-validator'
import clients from '../../clients.json'

const validateBody = initMiddleware(
    validateMiddleware([
        check('Id').isInt({min:1, max: clients.length}),
    ], validationResult)
)

const deleteClient = (req,res)=>{
    const {Id} = req.body
    clients.splice(Id - 1,1)
    res.send(clients)
}
export default async (req, res) => {
        switch (req.method) {
          case "DELETE":
            await validateBody(req, res)
      
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
              return res.status(422).json({ errors: errors.array() })
            }
      
            deleteClient(req, res)
      
            break;
          default:
            res.status(404).json({ message: "Request HTTP Method Incorrect." })
            break;
        }
    }
  