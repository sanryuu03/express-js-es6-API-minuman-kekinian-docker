import { PrismaClient } from "@prisma/client"
import { nanoid } from "nanoid"

const prisma = new PrismaClient()

let customUnix = Math.floor(new Date().getTime() / 1000.0)

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

export const createUser = async(req,res)=>{
    const {
        name,
        email,
        password,
      } = req.body
      const uuidTitle = "user"
      const uuid = `${uuidTitle}-${nanoid(16)}`

      try {
        const formData = {
            uuid,
            name,
            email,
            password,
            post_by: email,
            custom_unix_createdAt: customUnix,
            custom_unix_updatedAt: customUnix
          }
          const response = await prisma.$transaction([
            prisma.user.create({data: formData})
          ])
          const umpanBalik = {
            error: false,
            message: 'success',
            data: response
          }

          return res.status(201).json({ umpanBalik })
      } catch (err) {
        const umpanBalik = {
            error: true,
            message: err.message,
            data: 'kosong'
          }
          return res.status(500).json({ umpanBalik: umpanBalik || `Internal server error` })
      }
}

export const updateUser = async(req,res)=>{
    const { uuid } = req.params
    const {
        name,
        email,
        password,
      } = req.body

      try {
        const formData = {
            name,
            email,
            password,
            edited_by: email,
            custom_unix_updatedAt: customUnix
          }
          const response = await prisma.$transaction([
            prisma.user.update({
                where: { uuid: uuid },
                data: formData})
          ])
          const umpanBalik = {
            error: false,
            message: 'success',
            data: response
          }

          return res.status(201).json({ umpanBalik })
      } catch (err) {
        const umpanBalik = {
            error: true,
            message: err.message,
            data: 'kosong'
          }
          return res.status(500).json({ umpanBalik: umpanBalik || `Internal server error` })
      }
}

export const deleteUser = async(req,res)=>{
    const { uuid } = req.params
    try {
        const response = await prisma.$transaction([
            prisma.user.delete({
                where: { uuid: uuid }})
          ])
        const umpanBalik = {
          error: false,
          message: 'success',
          berisi: response
        }
        return res.status(200).json({ umpanBalik })
      } catch (err) {
        const umpanBalik = {
          error: true,
          message: err.message,
          berisi: 'kosong'
        }
        return res.status(500).json({ umpanBalik: umpanBalik || `Internal server error` })
      }
}
