import type { MetadataRoute } from 'next'
 
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'QuickCv',
    short_name: 'QuickCv',
    description: "Generated your next ATS friendly CV with QuickCv",
    start_url: '/resume-generator',
    display: 'standalone',
    background_color: '#fff',
    theme_color: '#111',
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
    ],
  }
}