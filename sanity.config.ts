'use client'

/**
 * This configuration is used to for the Sanity Studio that’s mounted on the `\app\studio\[[...index]]\page.tsx` route
 */
// import { visionTool } from '@sanity/vision'
import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'

import { cloudinarySchemaPlugin, cloudinaryImageSource, cloudinaryAssetSourcePlugin } from 'sanity-plugin-cloudinary'
import { hideUploadButtonPlugin } from './sanity/plugins/hide-upload'
import { iconPicker } from 'sanity-plugin-icon-picker'

// Go to https://www.sanity.io/docs/api-versioning to learn how API versioning works
import { dataset, projectId } from './sanity/env'
import { schema } from './sanity/schemaTypes'
import { structure } from './sanity/structure'

export default defineConfig({
    basePath: '/studio',
    projectId: projectId || '',
    dataset: dataset || '',
    // Add and edit the content schema in the './sanity/schemaTypes' folder
    schema,
    form: {
        // Enforce Cloudinary for both images and files
        image: {
            assetSources: () => [cloudinaryImageSource],
        },
        file: {
            assetSources: () => [cloudinaryImageSource],
        },
    },
    plugins: [
        structureTool({ structure }),
        cloudinarySchemaPlugin(),
        // Automatically configures image asset source
        cloudinaryAssetSourcePlugin(),
        // Custom plugin to hide the default Upload button
        hideUploadButtonPlugin(),
        iconPicker(),
        // Vision is a tool that lets you query your content with GROQ in the studio
        // https://www.sanity.io/docs/the-vision-plugin
        // visionTool({defaultApiVersion: apiVersion}),
    ],
})
