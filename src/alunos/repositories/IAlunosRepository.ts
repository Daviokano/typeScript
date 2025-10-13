import { Aluno } from '../entities/Aluno'

export type CreateAlunoDTO = {
  cpf: string
  name: string
  email: string
  dataNascimento: Date
}

export type PaginateParams = {
  page: number // representa qual página vc quer
  skip: number // espera o número de quantos itens pular antes de começar a pegar
  take: number // espera o número de itens que vc vai receber
}

export type AlunosPaginateProperties = {
  // resposta de uma paginação de usuários
  per_page: number
  total: number
  current_page: number
  data: Aluno[]
}

export interface IAlunosRepository {
  create({ cpf, name, email, dataNascimento }: CreateAlunoDTO): Promise<Aluno>
  save(aluno: Aluno): Promise<Aluno>
  findAll({ page, skip, take }): Promise<AlunosPaginateProperties>
  findByRm(id: string): Promise<Aluno | null>
  findByCpf(cpf: string): Promise<Aluno | null>
  findByName(name: string): Promise<Aluno | null>
  findByEmail(email: string): Promise<Aluno | null>
  delete(aluno: Aluno): Promise<void>
}
