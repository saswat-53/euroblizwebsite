import { config, fields, collection } from '@keystatic/core';

// Reader config uses local storage (reads from filesystem)
export default config({
  storage: {
    kind: 'local',
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
        quote_en: fields.document({
          label: 'Quote (English)',
          formatting: {
            headingLevels: [1, 2, 3],
            inlineMarks: {
              bold: true,
              italic: true,
              underline: true,
            },
          },
          links: true,
        }),
        position_en: fields.text({
          label: 'Position (English)',
        }),

        // French Content
        quote_fr: fields.document({
          label: 'Quote (French)',
          formatting: {
            headingLevels: [1, 2, 3],
            inlineMarks: {
              bold: true,
              italic: true,
              underline: true,
            },
          },
          links: true,
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
        content_en: fields.document({
          label: 'Content (English)',
          description: 'Main blog content in English',
          formatting: {
            headingLevels: [1, 2, 3],
            inlineMarks: {
              bold: true,
              italic: true,
              underline: true,
            },
          },
          links: true,
        }),

        // French Content
        title_fr: fields.text({ label: 'Title (French)' }),
        excerpt_fr: fields.text({
          label: 'Excerpt (French)',
          multiline: true,
          description: 'Short summary of the blog post',
        }),
        content_fr: fields.document({
          label: 'Content (French)',
          description: 'Main blog content in French',
          formatting: {
            headingLevels: [1, 2, 3],
            inlineMarks: {
              bold: true,
              italic: true,
              underline: true,
            },
          },
          links: true,
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
