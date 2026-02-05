import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'GitPad',
    start_url: '/',
    display: 'standalone',
    // This is the splashscreen background color visible while the app is opening
    background_color: '#ffffff',
    theme_color: '#ffffff',
    icons: [
      { src: '/icons/GitPad-dark.png', sizes: '192x192', type: 'image/png' },
      { src: '/icons/GitPad-dark.png', sizes: '512x512', type: 'image/png' },
    ],
  }
}
