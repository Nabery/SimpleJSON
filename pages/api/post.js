import initMiddleware from '../../lib/initMiddleware'
import validateMiddleware from '../../lib/validateMiddleware'
import { check, validationResult } from 'express-validator'
import clients from '../../clients.json'

const validateBody = initMiddleware(
    validateMiddleware([
        check('Name').isLength({min:1, max: 40}),
        check('Tatoos').isArray({ min: 1, max: 31}),
        check('Gender').isIn(['M','F']),
        check('Number').isMobilePhone(['pt-BR']),
    ], validationResult)
)

const appendData = (req,res)=>{
  const {Name, Gender, Tatoos, Number} = req.body
  const person = {
    Id: clients.length +1,
    Name,
    Gender,
    Tatoos,
    Number,
  }
  clients.push(person)
  res.status(201).send({"Message": "Created"})
}

export default async (req, res) => {
  switch (req.method) {
    case "POST":
      await validateBody(req, res)

      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() })
      }

      appendData(req, res)

      break;
    default:
      res.status(404).json({ message: "Request HTTP Method Incorrect." })
      break;
  }
}
