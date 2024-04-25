import { prisma } from "@/src/lib/prisma"

export const dynamic = 'force-dynamic'
//TODO: esto es mas para un ejemplo de api con nextJS 
export async function GET() {
    const orders = await prisma.persona.findMany({
        where: {
            esDoctor: false
        },
    })
    return Response.json(orders)
}
