/* eslint-disable @typescript-eslint/no-explicit-any */
import { createResolver, defineNuxtModule, } from '@nuxt/kit'
import * as TypeDoc from 'typedoc'
import baseDocConfigs from '../typedoc.json'
import fs from 'fs'
import { isAbsolute, join, resolve } from 'path'
import type { Nuxt } from '@nuxt/schema'

const DEFAULT_OUT_TYPES_PATH = './content/api'

const resolver = createResolver(import.meta.url)
const resolvePath  = resolver.resolvePath('./', { cwd: './' })
const currentDirProcess = process.cwd()

function isInsideAnotherProject (currentDir: string) {
    const parentDir = resolve(currentDir, '..')
    // Check if 'package.json' or 'node_modules' exists in the parent directory
    return fs.existsSync(join(parentDir, 'package.json')) || fs.existsSync(join(parentDir, 'node_modules'))
}

async function copyRootReadmeFile (nuxt: Nuxt) {
    console.log({ currentDirProcess })
    nuxt.hook('build:done', async () => {
        const currentPath  = await resolvePath.then()
        const rootPath = isInsideAnotherProject(currentPath) ? resolve(currentPath, '..') : currentPath
        const rootReadme = resolver.resolve(rootPath, 'README.md')
        const dest = join(currentPath, 'content/docs/1.get-started.md')
        if (!fs.existsSync(rootReadme)) {
            console.log('not found README.md!', rootReadme)
            fs.writeFileSync(dest, '# GET STARTED', 'utf8')
            return
        }
        fs.copyFileSync(rootReadme, dest)
        console.log('copied file to ' + dest)
    })
}

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
        await copyRootReadmeFile(nuxt)
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
            const addPoints = [ ...entryPoints.map((i: string) => isAbsolute(i) ? i : `../${i}`) ]
            console.log('addPoints', addPoints)
            opts.tsConfig.include = [
                ...(opts.tsConfig.include || []),
                ...addPoints, // Example: Add your custom paths here
            ]
        })
        nuxt.hook('build:done', async () => {
            try {
                console.log('start api doc', entryPoints)
                const docApp = await TypeDoc.Application.bootstrapWithPlugins({
                    ...baseDocConfigs,
                    entryPoints: [ ...entryPoints ],
                })
                const project = await docApp.convert()
                console.log('hasProject', !!project)
                if (project) {
                    // Project may not have converted correctly
                    const outputDir = docOptions?.outContent || join(process.cwd(), options.outContent ?? DEFAULT_OUT_TYPES_PATH)
                    // Rendered docs
                    await docApp.generateDocs(project, outputDir)

                    const globalFile = resolver.resolve(outputDir, 'global.md')
                    const globalGroupFile = resolver.resolve(outputDir, '_group.md')
                    console.log('globalFile', globalFile)
                    console.log('globalGroupFile', globalGroupFile)
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
