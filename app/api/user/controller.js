import { PrismaClient } from "@prisma/client"
import { nanoid } from "nanoid"
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

let customUnix = Math.floor(new Date().getTime() / 1000.0)

export const getUsers = async (req, res) => {
    try {
        const response = await prisma.user.findMany({
            where: {
                deleted: false
            }
        })
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

export const createUser = async (req, res) => {
    const {
        name,
        email,
        password,
    } = req.body
    const uuidTitle = "user"
    const uuid = `${uuidTitle}-${nanoid(16)}`

    try {
        const checkEmail = await prisma.user.findFirst({
            where: {
                email,
                deleted: false
            }
        })
        if (checkEmail) {
            const umpanBalik = {
                error: true,
                message: `email sudah terdaftar`,
            }
            return res.status(422).json({ umpanBalik: umpanBalik })
        }
        if (password.length === null || password.length <= 7) {
            const umpanBalik = {
                error: true,
                message: `Password minimal 8 karakter`,
                data: 'kosong'
            }
            return res.status(422).json({ umpanBalik: umpanBalik })
        }
        const lowerCaseLetters = /^(?=.*[a-z])/
        if (!lowerCaseLetters.test(password)) {
            const umpanBalik = {
                error: true,
                message: `Password minimal memiliki 1 karakter huruf kecil`,
                data: 'kosong'
            }
            return res.status(422).json({ umpanBalik: umpanBalik })
        }
        const upperCaseLetters = /^(?=.*[A-Z])/
        if (!upperCaseLetters.test(password)) {
            const umpanBalik = {
                error: true,
                message: `Password minimal memiliki 1 karakter huruf besar`,
                data: 'kosong'
            }
            return res.status(422).json({ umpanBalik: umpanBalik })
        }
        const numbers = /^(?=.*[0-9])/
        if (!numbers.test(password)) {
            const umpanBalik = {
                error: true,
                message: `Password minimal memiliki 1 karakter angka`,
                data: 'kosong'
            }
            return res.status(422).json({ umpanBalik: umpanBalik })
        }

        const saltRounds = 10;
        const hashedpass = await bcrypt.hash(password, saltRounds);
        const formData = {
            uuid,
            name,
            email,
            password: hashedpass,
            post_by: email,
            custom_unix_createdAt: customUnix,
            custom_unix_updatedAt: customUnix
        }
        const response = await prisma.$transaction([
            prisma.user.create({ data: formData })
        ])
        delete response[0].password

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

export const updateUser = async (req, res) => {
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
                data: formData
            })
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

export const deleteUser = async (req, res) => {
    const { uuid } = req.params
    try {
        prisma.$use(async (params, next) => {
            // Check incoming query type
            if (params.action == 'delete') {
                // Delete queries
                // Change action to an update
                params.action = 'update'
                params.args['data'] = { deleted: true }
            }
            return next(params)
        })

        const formData = {
            deleted_by: uuid,
            custom_unix_soft_delete: customUnix
        }
        const response = await prisma.$transaction([
            prisma.user.update({
                where: { uuid: uuid },
                data: formData
            }),
            prisma.user.delete({
                where: { uuid: uuid }
            })
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
