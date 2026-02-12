'use client'

import { definePlugin } from 'sanity'
import { createGlobalStyle } from 'styled-components'

const HideUploadStyle = createGlobalStyle`
  /* 
   * Hide the specific "Upload" button within our custom wrapper.
   * Sanity V3 buttons often don't have stable classes, so we rely on:
   * 1. The wrapper class we add (.hide-upload-btn-wrapper)
   * 2. Data attributes if available, or position/icon
   */
   
  /* Target the "Upload" button specifically */
  .hide-upload-btn-wrapper [data-testid="file-input-upload-button"],
  .hide-upload-btn-wrapper button[aria-label="Upload"],
  .hide-upload-btn-wrapper button[text="Upload"] {
    display: none !important;
  }
  
  /* Also try to hide the "Browse" or "Select" button IF it leads to default gallery and we only want the custom one? 
     But User said "select meg maradjon meg" (Select should remain). 
     So we only hide Upload. 
  */
`

export const hideUploadButtonPlugin = definePlugin({
    name: 'hide-upload-button',
    form: {
        components: {
            input: (props) => {
                if (props.schemaType.name === 'image' || props.schemaType.name === 'file') {
                    return (
                        <div className="hide-upload-btn-wrapper">
                            {props.renderDefault(props)}
                            <HideUploadStyle />
                        </div>
                    )
                }
                return props.renderDefault(props)
            },
        },
    },
})
