import { Nota } from '../entities/Nota'

export type CreateRegistroDeNotaDTO = {
  rm: string // FK → aluno.rm
  year: number // ano do bimestre
  term: number // número do bimestre (1-4)
  matematica?: number
  portugues?: number
  historia?: number
}

export type CreateNotaRepositoryDTO = {
  rm: string // FK → aluno.rm
  idBimestre: string // FK → bimestres.id
  matematica?: number
  portugues?: number
  historia?: number
}

export type PaginateParams = {
  page: number // representa qual página vc quer
  skip: number // espera o número de quantos itens pular antes de começar a pegar
  take: number // espera o número de itens que vc vai receber
}

export type NotasPaginateProperties = {
  // resposta de uma paginação de notas
  per_page: number
  total: number
  current_page: number
  data: Nota[]
}

export interface INotasRepository {
  create({
    rm,
    idBimestre,
    matematica,
    portugues,
    historia,
  }: CreateNotaRepositoryDTO): Promise<Nota>
  findAll({
    page,
    skip,
    take,
  }: PaginateParams): Promise<NotasPaginateProperties>
}
