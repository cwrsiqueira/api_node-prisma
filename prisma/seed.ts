import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

const main = async () => {
    await prisma.user.deleteMany({})
    await prisma.post.deleteMany({})

    const user = await prisma.user.create({
        data: {
            email: 'admin@email.com',
            name: 'Admin',
        }
    })

    const post = await prisma.post.create({
        data: {
            title: 'Post via seed',
            body: 'Post de teste via seed ... ',
            authorId: user.id,
        }
    })
}

main()