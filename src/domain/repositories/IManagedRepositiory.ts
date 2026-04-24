

interface ICrudRepository<Input, Output>{
    add(input: Input): Promise<string>;
    getById(id: number): Promise<Output>;
    getAll(tenant: Input): Promise<Output[]>;
    deleteAll(id: number): Promise<string>;
    deleteById(id: number): Promise<string>;
    count(where: string, period: [Date, Date]): number;
    update<T extends string[]>(id: number, keys: [...T], value: [...T]): string; //same array range
}
