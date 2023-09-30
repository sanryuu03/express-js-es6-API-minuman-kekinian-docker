import { PrismaClient } from "@prisma/client"
import jwt from "jsonwebtoken"
import bcrypt from 'bcryptjs'
import { jwtKeyAccess, jwtKeyRefresh } from "../../../config/index.js"

const prisma = new PrismaClient()

const generateAccessToken = (mitra) => {
    return jwt.sign({
        mitra: {
            uuid: mitra.uuid,
            name: mitra.name,
            email: mitra.email
        }
    }, jwtKeyAccess, {
        expiresIn: '20s'
    })
}

const generateRefreshToken = (mitra) => {
    return jwt.sign({
        mitra: {
            uuid: mitra.uuid,
            name: mitra.name,
            email: mitra.email
        }
    }, jwtKeyRefresh, {
        expiresIn: '1d'
    })
}

export const signIn = async (req, res) => {
    const {
        email,
        password,
    } = req.body

    try {
        const checkEmail = await prisma.user.findFirst({
            where: {
                email,
                deleted: false
            }
        })
        if (!checkEmail) {
            const umpanBalik = {
                error: true,
                message: `email yang anda masukan belum terdaftar`,
            }
            return res.status(422).json({ umpanBalik: umpanBalik })
        }
        const checkPassword = bcrypt.compareSync(password, checkEmail.password)
        if (!checkPassword) {
            const umpanBalik = {
                error: true,
                message: 'password anda salah',
                berisi: 'kosong'
            }
            return res.status(403).json({ umpanBalik: umpanBalik })
        }

        const accessToken = generateAccessToken(checkEmail)
        const refreshToken = generateRefreshToken(checkEmail)

        const umpanBalik = {
            error: false,
            message: 'success',
            data: { accessToken, refreshToken }
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
