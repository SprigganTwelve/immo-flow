
import { PrismaClient } from "@/generated/prisma/client";


class TenantRepository implements ITenantRepository {

    async add(input: Tenant): Promise<string> {
    }

    async getAll(tenant: Tenant): Promise<Tenant[]> {
        
    }

    async getById(id: number): Promise<Tenant> {
        
    }

    async deleteAll(id: number): Promise<string> {
        
    }

    async deleteById(id: number): Promise<string> {
        
    }

    async count(where: string, period: [Date, Date]): number {
        
    }
}
