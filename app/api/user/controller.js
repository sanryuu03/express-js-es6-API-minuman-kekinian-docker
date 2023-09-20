import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export const getUsers = async(req,res)=>{
    try {
        const response = await prisma.user.findMany()
        const umpanBalik = {
            error: false,
            message: 'success',
            data: response
          }
        res.status(200).json({ umpanBalik })
    } catch (err) {
        const umpanBalik = {
            error: true,
            message: err.message,
            data: 'kosong'
          }
          return res.status(500).json({ umpanBalik: umpanBalik || `Internal server error` })
    }
}

export const createUser = (req,res)=>{}

export const updateUser = (req,res)=>{}

export const deleteUser = (req,res)=>{}
