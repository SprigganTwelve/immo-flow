import "dotenv/config";
import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient } from '../../../generated/prisma/client'


declare global{
    var prisma: PrismaClient | undefined
}

let prisma

if(global.prisma){
    prisma = global.prisma
}
else{
    const connectionString = `${process.env.SUPABASE_TRANSACTION_URL}`
    const adapter = new PrismaPg({ connectionString })
    prisma = new PrismaClient({ adapter });
}

if (process.env.NODE_ENV !== 'production') global.prisma = prisma; //bypass the hot reload side effects

export default prisma;
