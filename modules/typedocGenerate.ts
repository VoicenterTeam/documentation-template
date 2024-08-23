/* eslint-disable @typescript-eslint/no-explicit-any */
import { createResolver, defineNuxtModule, } from '@nuxt/kit'
import * as TypeDoc from 'typedoc'
import baseDocConfigs from '../typedoc.json'
import fs from 'fs'
import { join, resolve } from 'path'
import type { Nuxt } from '@nuxt/schema'

type TUiTypedocModule = {
    typesGenerate?: boolean
    outContent?: string
    entryPoints?: Array<string>
    exclude?: Array<string>
}

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
        const destFolder = join(currentPath, 'content/docs')
        const fileName = '1.get-started.md'
        if (!fs.existsSync(destFolder)) {
            fs.mkdirSync(destFolder, { recursive: true })
        }
        const destination = resolver.resolve(destFolder, fileName)
        if (!fs.existsSync(rootReadme)) {
            console.log('not found README.md!', rootReadme)
            fs.writeFileSync(destination, '# GET STARTED', 'utf8')
            return
        } else {
            fs.copyFileSync(rootReadme, destination)
            console.log('copied file to ' + destination)
        }
    })
}

export default defineNuxtModule<TUiTypedocModule>({
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
        entryPoints: [],
        exclude: []
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
        // nuxt.hook('prepare:types', (opts) => {
        //     opts.tsConfig.include = [
        //         ...(opts.tsConfig.include || []),
        //         ...entryPoints, // Example: Add your custom paths here
        //     ]
        // })
        nuxt.hook('build:done', async () => {
            try {
                console.log('start api doc', entryPoints)
                const currentPath  = await resolvePath.then()
                const rootPath = isInsideAnotherProject(currentPath) ? resolve(currentPath, '..') : currentPath
                const typeDocConfigs = {
                    ...baseDocConfigs,
                    entryPoints: [ ...entryPoints ],
                    tsconfig: resolver.resolve(rootPath, 'tsconfig.json'),
                }
                if (docOptions?.exclude?.length) {
                    typeDocConfigs.exclude = [ ...docOptions.exclude ]
                }
                const docApp = await TypeDoc.Application.bootstrapWithPlugins({ ...typeDocConfigs })

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
