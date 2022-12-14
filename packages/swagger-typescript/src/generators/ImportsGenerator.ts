import uniq from 'lodash.uniq'

import { Generator } from '@kubb/core'

import { createImportDeclaration } from '../utils/codegen'

import type { FileResolver, Refs } from './TypeGenerator'
import type ts from 'typescript'

type Options = {
  fileResolver?: FileResolver
}
export class ImportsGenerator extends Generator<Options> {
  async build(items: Array<{ refs: Refs; type: ts.TypeAliasDeclaration }>): Promise<Array<ts.ImportDeclaration> | undefined> {
    const refs = items.reduce((acc, currentValue) => {
      return {
        ...acc,
        ...currentValue.refs,
      }
    }, {} as Refs)

    if (Object.keys(refs).length === 0) {
      return undefined
    }

    // add imports based on $ref
    const importPromises = uniq(Object.keys(refs))
      .filter(($ref: string) => {
        // when using a $ref inside a type we should not repeat that import
        const { name } = refs[$ref]
        return !items.find((item) => item.type.name.escapedText === name)
      })
      .map(async ($ref: string) => {
        const { name } = refs[$ref]

        const path = (await this.options.fileResolver?.(name)) || `./${name}`

        // TODO weird hacky fix
        if (path === './' || path === '.') {
          return undefined
        }

        return createImportDeclaration({
          propertyNames: [name],
          path: path.replace('./../', '../'),
        })
      })

    const nodes = await Promise.all(importPromises)

    return nodes.filter(Boolean) as ts.ImportDeclaration[]
  }
}
