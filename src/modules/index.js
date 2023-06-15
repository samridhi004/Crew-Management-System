import * as path from 'path'
import { makeExecutableSchema } from '@graphql-tools/schema'
import { mergeTypeDefs,mergeResolvers} from '@graphql-tools/merge'
import { loadFilesSync } from '@graphql-tools/load-files'
import {
    typeDefs as scalarTypeDefs,
    resolvers as scalarResolvers,
} from 'graphql-scalars'

const typesArray = [
    ...loadFilesSync(path.join(__dirname,'./**/*.graphql')),
    ...scalarTypeDefs,
]

const resolverArray = [
    ...loadFilesSync(path.join(__dirname, './**/*.resolvers.*')),
    scalarResolvers,
]

export const typeDefs = mergeTypeDefs(typesArray)
export const resolvers = mergeResolvers(resolverArray)

const schemaWithoutMiddleware = makeExecutableSchema({
    typeDefs,
    resolvers: { ...resolvers },
    resolverValidationOptions: {
      requireResolversForResolveType: false,
    },
  })
  
  export default schemaWithoutMiddleware