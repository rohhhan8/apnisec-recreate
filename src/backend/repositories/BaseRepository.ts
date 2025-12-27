export abstract class BaseRepository<T, CreateInput, UpdateInput> {
  constructor(protected readonly model: any) {}

  async create(data: CreateInput): Promise<T> {
    return this.model.create({ data });
  }

  async findById(id: string): Promise<T | null> {
    return this.model.findUnique({ where: { id } });
  }

  async findAll(where: any = {}): Promise<T[]> {
    return this.model.findMany({ where });
  }

  async update(id: string, data: UpdateInput): Promise<T> {
    return this.model.update({ where: { id }, data });
  }

  async softDelete(id: string): Promise<T> {
    // Check if the model supports soft delete (has deletedAt)
    // We assume the caller knows what they are doing or strictly types T to have deletedAt
    return this.model.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }
}
