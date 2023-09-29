import { PrismaClient } from "@prisma/client"
import { nanoid } from "nanoid"

const prisma = new PrismaClient()

let customUnix = Math.floor(new Date().getTime() / 1000.0)

export const getProductPrice = async (req, res) => {
    const { master_product_id } = req.params
    try {
        const response = await prisma.Product_Price.findMany({
            where: {
                product_id: master_product_id,
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

export const createProductPrice = async (req, res) => {
    const {
        product_id,
        size_id,
        price,
        email,
    } = req.body
    const uuidTitle = "productprice"
    const uuid = `${uuidTitle}-${nanoid(16)}`

    const checkProductPrice = await prisma.Product_Price.findFirst({
        where: {
            product_id,
            size_id,
            deleted: false
        }
    })
    if (checkProductPrice) {
        const umpanBalik = {
            error: true,
            message: `maaf produk sudah memiliki size dan harga, silahkan pilih menu update`,
            data: 'kosong'
        }
        return res.status(422).json({ umpanBalik: umpanBalik })
    }
    try {
        const formData = {
            uuid,
            product_id,
            size_id,
            price,
            post_by: email,
            custom_unix_createdAt: customUnix,
            custom_unix_updatedAt: customUnix
        }
        const response = await prisma.$transaction([
            prisma.Product_Price.create({ data: formData })
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

export const updateProductPrice = async (req, res) => {
    const { master_product_id, product_price_id } = req.params
    const {
        product_id,
        size_id,
        price,
        email,
    } = req.body

    try {
        const formData = {
            product_id,
            size_id,
            price,
            edited_by: email,
            custom_unix_updatedAt: customUnix
        }
        const response = await prisma.$transaction([
            prisma.Product_Price.update({
                where: {
                    uuid: product_price_id,
                    product_id: master_product_id
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

export const deleteProductPrice = async (req, res) => {
    const { master_product_id, product_price_id } = req.params
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
            prisma.Product_Price.update({
                where: {
                    uuid: product_price_id,
                    product_id: master_product_id
                },
                data: formData
            }),
            prisma.Product_Price.delete({
                where: {
                    uuid: product_price_id,
                    product_id: master_product_id
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
