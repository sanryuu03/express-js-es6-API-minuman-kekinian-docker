import { PrismaClient } from "@prisma/client"
import { nanoid } from "nanoid"

const prisma = new PrismaClient()

let customUnix = Math.floor(new Date().getTime() / 1000.0)

export const getTransactions = async (req, res) => {
    try {
        const response = await prisma.Transactions.findMany({
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

export const createTransactions = async (req, res) => {
    const {
        product_id,
        product_price_id,
        is_promo,
        quantity,
        price,
        amount,
        is_paid,
        buyer,
        buyer_phone_number,
        buyer_email,
        buyer_address,
        purchase_date,
        email,
    } = req.body
    const uuidTitle = "transactions"
    const uuid = `${uuidTitle}-${nanoid(16)}`

    try {
        const formData = {
            uuid,
            product_id,
            product_price_id,
            is_promo,
            quantity,
            price,
            amount,
            is_paid,
            buyer,
            buyer_phone_number,
            buyer_email,
            buyer_address,
            purchase_date,
            post_by: email,
            custom_unix_createdAt: customUnix,
            custom_unix_updatedAt: customUnix
        }
        const response = await prisma.$transaction([
            prisma.Transactions.create({ data: formData })
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

export const updateTransactions = async (req, res) => {
    const { transactions_id } = req.params
    const {
        product_id,
        product_price_id,
        is_promo,
        quantity,
        price,
        amount,
        is_paid,
        buyer,
        buyer_phone_number,
        buyer_email,
        buyer_address,
        purchase_date,
        email,
    } = req.body

    try {
        const formData = {
            product_id,
            product_price_id,
            is_promo,
            quantity,
            price,
            amount,
            is_paid,
            buyer,
            buyer_phone_number,
            buyer_email,
            buyer_address,
            purchase_date,
            edited_by: email,
            custom_unix_updatedAt: customUnix
        }
        const response = await prisma.$transaction([
            prisma.Transactions.update({
                where: {
                    uuid: transactions_id
                },
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

export const deleteTransactions = async (req, res) => {
    const { transactions_id } = req.params
    const { email } = req.body
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
            deleted_by: email,
            custom_unix_soft_delete: customUnix
        }
        const response = await prisma.$transaction([
            prisma.Transactions.update({
                where: {
                    uuid: transactions_id
                },
                data: formData
            }),
            prisma.Transactions.delete({
                where: {
                    uuid: transactions_id
                }
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
