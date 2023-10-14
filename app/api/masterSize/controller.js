import { PrismaClient } from "@prisma/client"
import { nanoid } from "nanoid"

const prisma = new PrismaClient()

let customUnix = Math.floor(new Date().getTime() / 1000.0)

export const getSize = async (req, res) => {
    try {
        const response = await prisma.Master_Size.findMany({
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

export const createSize = async (req, res) => {
    const {
        name,
        size,
        email,
    } = req.body
    const uuidTitle = "size"
    const uuid = `${uuidTitle}-${nanoid(16)}`

    try {
        const formData = {
            uuid,
            name,
            size,
            post_by: email,
            custom_unix_createdAt: customUnix,
            custom_unix_updatedAt: customUnix
        }
        const response = await prisma.$transaction([
            prisma.Master_Size.create({ data: formData })
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

export const editSize = async (req, res) => {
    const { uuid } = req.params

    try {
        const response = await prisma.$transaction([
            prisma.Master_Size.findFirst({
                where: { uuid, deleted: false },
            })
        ])
        const umpanBalik = {
            error: false,
            message: 'success',
            data: response
        }

        return res.status(200).json({ umpanBalik })
    } catch (err) {
        const umpanBalik = {
            error: true,
            message: err.message,
            data: 'kosong'
        }
        return res.status(500).json({ umpanBalik: umpanBalik || `Internal server error` })
    }
}

export const updateSize = async (req, res) => {
    const { uuid } = req.params
    const {
        name,
        size,
        email,
    } = req.body

    try {
        const formData = {
            name,
            size,
            edited_by: email,
            custom_unix_updatedAt: customUnix
        }
        const response = await prisma.$transaction([
            prisma.Master_Size.update({
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

export const deleteSize = async (req, res) => {
    const { uuid, user_id } = req.params
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
            deleted_by: user_id,
            custom_unix_soft_delete: customUnix
        }
        const response = await prisma.$transaction([
            prisma.Master_Size.update({
                where: { uuid: uuid },
                data: formData
            }),
            prisma.Master_Size.delete({
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
