import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'GitPad',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#000000',
    icons: [
      { src: '/icons/GitPad.png', sizes: '192x192', type: 'image/png' },
      { src: '/icons/GitPad.png', sizes: '512x512', type: 'image/png' },
    ],
  }
}
