import { Request, Response } from "express"
import { UserService } from '../services/UserService'

export const all = async (req: Request, res: Response) => {
    const users = await UserService.findAll()
    res.json({ users })
}

export const one = async (req: Request, res: Response) => {
    const { id } = req.params
    const user = await UserService.findOne({id: parseInt(id)})
    if(user) {
        res.json({ user })
    } else {
        res.json({ error: 'User não encontrado' })
    }
    
}

export const create = async (req: Request, res: Response) => {
    const { email, name, age } = req.body

    if(email && name) {
        // Validar email
        const user = await UserService.findOne({ email })
        if(!user) {
            const newUser = await UserService.create({
                email, name, age: parseInt(age)
            })
            res.status(201).json({ user: newUser })
        } else {
            res.json({error:'Email já cadastrado!'})
        }
    } else {
        res.json({error:'Dados não preenchidos'})
    }   
}