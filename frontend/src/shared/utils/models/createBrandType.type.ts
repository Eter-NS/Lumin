import { brand } from './brandTypeSymbol'

export type createBrandType<T, K extends string> = T & { [brand]: K }
