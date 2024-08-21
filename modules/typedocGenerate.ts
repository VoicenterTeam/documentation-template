/* eslint-disable @typescript-eslint/no-explicit-any */
import { createResolver, defineNuxtModule } from '@nuxt/kit'
import * as TypeDoc from 'typedoc'
import baseDocConfigs from '../typedoc.json'
import fs from 'fs'
import { isAbsolute, join } from 'path'

const DEFAULT_OUT_TYPES_PATH = './content/api'

export default defineNuxtModule<{
    typesGenerate?: boolean
    outContent?: string
    entryPoints?: Array<string>
}>({
    meta: {
        name: 'ui-typedoc',
        configKey: 'uiTypedoc',
        compatibility: {
            nuxt: '^3.10.0'
        },
    },
    defaults: {
        outContent: './content/api',
        typesGenerate: false,
        entryPoints: []
    },
    async setup (options, nuxt) {
        const resolver = createResolver(import.meta.url)
        const docOptions = (nuxt.options as any)?.uiTypedoc
        if (!docOptions) {
            return
        }
        const hasTypedocGenerate = docOptions?.typesGenerate !== undefined ? docOptions?.typesGenerate : options.typesGenerate
        if (!hasTypedocGenerate) {
            return
        }
        const entryPoints = docOptions.entryPoints || options.entryPoints
        if (!entryPoints.length) {
            console.error('Need to sdd entryPoints or set typesGenerate to false')
            return
        }
        nuxt.hook('prepare:types', (opts) => {
            opts.tsConfig.include = [
                ...(opts.tsConfig.include || []),
                ...entryPoints.map((i: string) => isAbsolute(i) ? i : `../${i}`), // Example: Add your custom paths here
            ]
        })
        nuxt.hook('build:done', async () => {
            try {
                const docApp = await TypeDoc.Application.bootstrapWithPlugins({
                    ...baseDocConfigs,
                    entryPoints: [ ...entryPoints ],
                })
                const project = await docApp.convert()
                if (project) {
                    // Project may not have converted correctly
                    const outputDir = docOptions?.outContent || join(process.cwd(), options.outContent ?? DEFAULT_OUT_TYPES_PATH)
                    // Rendered docs
                    await docApp.generateDocs(project, outputDir)

                    const globalFile = resolver.resolve(outputDir, 'global.md')
                    const globalGroupFile = resolver.resolve(outputDir, '_group.md')

                    if (fs.existsSync(globalFile)) {
                        fs.renameSync(globalFile, resolver.resolve(outputDir, '1.global.md'))
                    } else if (fs.existsSync(globalGroupFile)) {
                        fs.renameSync(globalGroupFile, resolver.resolve(outputDir, '1.global.md'))
                    }
                }
            } catch (e) {
                console.error(e)
            }
        })
    }
})
