import { PrismaClient } from "@prisma/client"
import { nanoid } from "nanoid"
import { rootPath } from "../../../config/index.js"
import path from 'path'
import fs from 'fs'

const prisma = new PrismaClient()

let customUnix = Math.floor(new Date().getTime() / 1000.0)

export const getProduct = async (req, res) => {
    const user_id = req.params.userid
    try {
        const response = await prisma.Master_Product.findMany({
            where: {
                user_id,
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

export const createProduct = async (req, res) => {
    const {
        user_id,
        name,
        description,
        ingredients,
        email,
    } = req.body
    const uuidTitle = "masterproduct"
    const uuid = `${uuidTitle}-${nanoid(16)}`

    try {
        const tmp_path = req.file.path
        const originalExt = req.file.originalname.split('.')[req.file.originalname.split('.').length - 1]
        const filename = req.file.filename + '.' + originalExt
        const public_folder = `public`;
        const lokasi_folder = `uploads/masterProduct`;
        const path_folder = `${public_folder}/${lokasi_folder}`;
        const folder = path.resolve(rootPath, path_folder);
        // membuat folder bila belum ada
        if (!fs.existsSync(folder)) {
            fs.mkdirSync(folder, { recursive: true });
            // menulis berkas
            const target_file_gitignore = path.resolve(rootPath, `${path_folder}/.gitignore`)
            const writableStream = fs.createWriteStream(target_file_gitignore);
            writableStream.write('*.png\n');
            writableStream.write('*.jpg\n');
            writableStream.end('*.jpeg');
        }

        const lokasi_gambar = `${lokasi_folder}/${filename}`
        const path_folder_gambar = `${public_folder}/${lokasi_gambar}`
        const target_path = path.resolve(rootPath, path_folder_gambar)

        const src = fs.createReadStream(tmp_path)
        const dest = fs.createWriteStream(target_path)

        src.pipe(dest)
        src.on('end', async () => {
            const formData = {
                uuid,
                user_id,
                name,
                description,
                ingredients,
                picture_path: lokasi_gambar,
                post_by: email,
                custom_unix_createdAt: customUnix,
                custom_unix_updatedAt: customUnix
            }
            const response = await prisma.$transaction([
                prisma.Master_Product.create({ data: formData })
            ])
            const umpanBalik = {
                error: false,
                message: 'success',
                data: response
            }

            return res.status(201).json({ umpanBalik })
        })
    } catch (err) {
        const umpanBalik = {
            error: true,
            message: err.message,
            data: 'kosong'
        }
        return res.status(500).json({ umpanBalik: umpanBalik || `Internal server error` })
    }
}

export const editProduct = async (req, res) => {
    const { master_product_id } = req.params
    const user_id = req.params.userid

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

export const updateProduct = async (req, res) => {
    const { master_product_id } = req.params
    const user_id = req.params.userid
    const {
        name,
        description,
        ingredients,
        email,
    } = req.body

    try {
        if (req.file) {


            const tmp_path = req.file.path
            const originalExt = req.file.originalname.split('.')[req.file.originalname.split('.').length - 1]
            const filename = req.file.filename + '.' + originalExt
            const public_folder = `public`;
            const lokasi_folder = `uploads/masterProduct`;
            const path_folder = `${public_folder}/${lokasi_folder}`;
            const folder = path.resolve(rootPath, path_folder);
            // membuat folder bila belum ada
            if (!fs.existsSync(folder)) {
                fs.mkdirSync(folder, { recursive: true });
                // menulis berkas
                const target_file_gitignore = path.resolve(rootPath, `${path_folder}/.gitignore`)
                const writableStream = fs.createWriteStream(target_file_gitignore);
                writableStream.write('*.png\n');
                writableStream.write('*.jpg\n');
                writableStream.end('*.jpeg');
            }

            const lokasi_gambar = `${lokasi_folder}/${filename}`
            const path_folder_gambar = `${public_folder}/${lokasi_gambar}`
            const target_path = path.resolve(rootPath, path_folder_gambar)

            const src = fs.createReadStream(tmp_path)
            const dest = fs.createWriteStream(target_path)

            src.pipe(dest)
            src.on('end', async () => {
                const checkGambar = await prisma.Master_Product.findUnique({
                    where: {
                        uuid: master_product_id,
                        user_id
                    }
                })
                const currentImage = `${rootPath}/${public_folder}/${checkGambar.picture_path}`
                if (fs.existsSync(currentImage)) {
                    fs.unlinkSync(currentImage)
                }

                const formData = {
                    name,
                    description,
                    ingredients,
                    picture_path: lokasi_gambar,
                    edited_by: email,
                    custom_unix_updatedAt: customUnix
                }
                const response = await prisma.$transaction([
                    prisma.Master_Product.update({
                        where: {
                            uuid: master_product_id,
                            user_id
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
            })
        } else {
            const formData = {
                name,
                description,
                ingredients,
                edited_by: email,
                custom_unix_updatedAt: customUnix
            }
            const response = await prisma.$transaction([
                prisma.Master_Product.update({
                    where: {
                        uuid: master_product_id,
                        user_id
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
        }
    } catch (err) {
        const umpanBalik = {
            error: true,
            message: err.message,
            data: 'kosong'
        }
        return res.status(500).json({ umpanBalik: umpanBalik || `Internal server error` })
    }
}

export const deleteProduct = async (req, res) => {
    const { master_product_id } = req.params
    const user_id = req.params.userid
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
            prisma.Master_Product.update({
                where: {
                    uuid: master_product_id,
                    user_id
                },
                data: formData
            }),
            prisma.Master_Product.delete({
                where: {
                    uuid: master_product_id,
                    user_id
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
