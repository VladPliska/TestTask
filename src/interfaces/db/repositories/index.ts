export default interface Repository {
  create(data: any): Promise<any>
  find(data: any): Promise<any[]>
  delete(id: string): void
  update(data: any): Promise<any>
  findById(id: string): Promise<any>
}