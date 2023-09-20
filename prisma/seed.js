import { PrismaClient } from "@prisma/client";
import { nanoid } from "nanoid";
const prisma = new PrismaClient();

const main = async () => {
    await prisma.Master_Size.create({
        data: {
            uuid: `size-${nanoid(16)}`,
            name: "small",
            size: "S",
        },
    })
    await prisma.Master_Size.create({
        data: {
            uuid: `size-${nanoid(16)}`,
            name: "medium",
            size: "M",
        },
    })
    await prisma.Master_Size.create({
        data: {
            uuid: `size-${nanoid(16)}`,
            name: "large",
            size: "L",
        },
    })
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });
