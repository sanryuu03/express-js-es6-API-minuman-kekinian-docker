import { PrismaClient, Prisma } from "@prisma/client"
import { nanoid } from "nanoid"

const prisma = new PrismaClient()

let customUnix = Math.floor(new Date().getTime() / 1000.0)

export const getShopProduct = async (req, res) => {
    const { master_product_id, user_id } = req.params
    try {
        const response = await prisma.$transaction([
            prisma.Master_Product.findFirst({
                where: {
                    uuid: master_product_id,
                    user_id,
                    deleted: false
                }
            })
        ])
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

export const getShopProductPrice = async (req, res) => {
    const { master_product_id, size_id, status_promo } = req.params
    try {
        const response = await prisma.$transaction([
            prisma.Product_Price.findFirst({
                where: {
                    AND: [
                        { product_id: master_product_id },
                        { size_id },
                        { is_promo: status_promo === 'true' ? true : false },
                        { deleted: false },
                    ]
                }
            })
        ])
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

export const postShopAddToCart = async (req, res) => {
    const {
        buyer,
        buyer_address,
        buyer_email,
        buyer_phone_number,
        is_promo,
        product_id,
        purchase_date,
        quantity,
        size_id,
        email,
    } = req.body
    const uuidTitle = "Transactions"
    const uuid = `${uuidTitle}-${nanoid(16)}`

    const checkProductPrice = await prisma.$transaction([
        prisma.Product_Price.findFirst({
            where: {
                product_id,
                size_id,
                is_promo,
                deleted: false
            }
        })
    ])

    if (!checkProductPrice) {
        const umpanBalik = {
            error: true,
            message: `maaf produk belum memiliki size dan harga, silahkan pilih menu update`,
            data: 'kosong'
        }
        return res.status(422).json({ umpanBalik: umpanBalik })
    }
    try {
        const price = checkProductPrice[0].price
        const amount = quantity * price

        const formData = {
            uuid,
            product_id,
            product_price_id: checkProductPrice[0].uuid,
            is_promo,
            quantity,
            price,
            amount,
            is_paid: true,
            buyer,
            buyer_phone_number,
            buyer_email,
            buyer_address,
            purchase_date: Math.floor(new Date(`${purchase_date}:00+0700`) / 1000.0),
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
