import type { Metadata } from 'next'
import { env } from '@/lib/env'

interface GenerateMetadataOptions {
  title: string
  description?: string
  path?: string
}

// Default SEO description (160 chars max)
const DEFAULT_DESCRIPTION = 'Simple iOS & Web micro-SaaS ideas. Validate fast. Demos, data, decisions.'

/**
 * Generate OpenGraph metadata for a page
 * Uses the /api/og route to generate dynamic OG images
 * 
 * SEO Guidelines:
 * - Titles: ≤60 characters
 * - Descriptions: ≤160 characters
 */
export function generateMetadata({
  title,
  description = DEFAULT_DESCRIPTION,
  path = '',
}: GenerateMetadataOptions): Metadata {
  const siteUrl = env.NEXT_PUBLIC_SITE_URL
  const url = `${siteUrl}${path}`
  const ogImageUrl = `${siteUrl}/api/og?t=${encodeURIComponent(title)}`

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url,
      siteName: 'Omar Creates',
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale: 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImageUrl],
      creator: '@omarcreates',
    },
  }
}
