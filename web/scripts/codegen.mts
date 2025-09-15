import 'dotenv/config'

import fs from 'node:fs'
import path from 'node:path'
import openapiTS, { astToString } from 'openapi-typescript'

const schemaPath = `${process.env.API_URL!.replace('/api/v1', '')}/docs-json`
const output = 'src/api/generated.ts'

const start = process.hrtime()

async function generate(schemaPath: string, output: string) {
  const ast = await openapiTS(schemaPath, {
    enum: true,
  })

  const contents = astToString(ast)

  const outPath = path.resolve(output)
  fs.mkdirSync(path.dirname(outPath), { recursive: true })
  fs.writeFileSync(outPath, contents)
}

function transform(output: string) {
  const toPascalCase = (str: string) =>
    str
      .toLowerCase()
      .replace(/[-_](.)/g, (_, g1) => g1.toUpperCase())
      .replace(/^(.)/, (_, g1) => g1.toUpperCase())

  const fileContent = fs.readFileSync(output, 'utf8')

  // Regex to match exported enums at the bottom, including members
  // Assumes enums are formatted like:
  // export enum EnumName {
  //   key = "value",
  //   ...
  // }
  const enumRegex = /export enum (\w+) \{([^}]+)\}/g

  const transformedContent = fileContent.replace(enumRegex, (_, enumName, membersBlock) => {
    // Process each enum member line, e.g. `check_approve = "check_approve",`
    const transformedMembers = membersBlock
      .split('\n')
      .map((line: string) => {
        const match = line.match(/^\s*(\w+)\s*=\s*("[^"]+"|'[^']+')\s*,?\s*$/)
        if (!match) return line // leave line as is (empty lines or comments)

        const [, key, value] = match
        const newKey = toPascalCase(key)
        return `  ${newKey} = ${value},`
      })
      .join('\n')

    return `\nexport enum ${enumName} {${transformedMembers}}`
  })

  fs.writeFileSync(output, transformedContent, 'utf8')
}

await generate(schemaPath, output)
transform(output)

// ✨ openapi-typescript 7.8.0
// 🚀 http://localhost:4002/docs-json → src/views/df/api/index.ts [51.2ms]

const diff = process.hrtime(start)
const timeMs = (diff[0] * 1e3 + diff[1] / 1e6).toFixed(1) // convert to milliseconds with 1 decimal

console.log(`\x1b[32m✅ ${schemaPath} → ${output}\x1b[0m`, `\x1b[2m\x1b[37m[${timeMs}ms]\x1b[0m`)
