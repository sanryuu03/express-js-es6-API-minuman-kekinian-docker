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
        console.log(response);
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
