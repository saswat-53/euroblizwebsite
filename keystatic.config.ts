import { config, fields, collection } from '@keystatic/core';

export default config({
  storage: {
    kind: 'github',
    repo: {
      owner: process.env.NEXT_PUBLIC_GITHUB_OWNER!,
      name: process.env.NEXT_PUBLIC_GITHUB_REPO!,
    },
  },

  ui: {
    brand: {
      name: 'Eurobliz CMS',
    },
  },

  collections: {
    testimonials: collection({
      label: 'Testimonials',
      slugField: 'name',
      path: 'content/testimonials/*',
      format: { data: 'yaml' },
      schema: {
        name: fields.slug({ name: { label: 'Client Name' } }),

        // English Content
        quote_en: fields.text({
          label: 'Quote (English)',
          multiline: true,
        }),
        position_en: fields.text({
          label: 'Position (English)',
        }),

        // French Content
        quote_fr: fields.text({
          label: 'Quote (French)',
          multiline: true,
        }),
        position_fr: fields.text({
          label: 'Position (French)',
        }),

        // Metadata
        rating: fields.integer({
          label: 'Rating (1-5)',
          validation: { min: 1, max: 5 },
          defaultValue: 5,
        }),
      },
    }),

    posts: collection({
      label: 'Blog Posts',
      slugField: 'title_en',
      path: 'content/posts/*/',
      format: { data: 'yaml' },
      schema: {
        // English Content
        title_en: fields.slug({ name: { label: 'Title (English)' } }),
        excerpt_en: fields.text({
          label: 'Excerpt (English)',
          multiline: true,
          description: 'Short summary of the blog post',
        }),
        content_en: fields.text({
          label: 'Content (English)',
          multiline: true,
          description: 'Main blog content in English (supports markdown)',
        }),

        // French Content
        title_fr: fields.text({ label: 'Title (French)' }),
        excerpt_fr: fields.text({
          label: 'Excerpt (French)',
          multiline: true,
          description: 'Short summary of the blog post',
        }),
        content_fr: fields.text({
          label: 'Content (French)',
          multiline: true,
          description: 'Main blog content in French (supports markdown)',
        }),

        // Metadata
        image: fields.image({
          label: 'Featured Image',
          directory: 'public/images/blog',
          publicPath: '/images/blog/',
        }),
        date: fields.text({
          label: 'Publication Date',
          description: 'e.g., "Jan 15, 2025"',
        }),
        readTime: fields.text({
          label: 'Read Time',
          description: 'e.g., "5 min read"',
        }),
      },
    }),
  },
});
