import { createBrandType } from './createBrandType.type'

export type ID = createBrandType<string & { length: 27 }, 'ID'>
