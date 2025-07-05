import journalingLow from './blogtext/journal-low.md?raw';

export interface Blog {
  slug: string;
  title: string;
  body: string; // Markdown content
  image: string;
}

export const blogs: Blog[] = [
  {
    slug: 'are-you-journaling-all-wrong-when-you-feel-low',
    title: 'Are You Journaling All Wrong When You Feel Low?',
    body: journalingLow,
    image: '/JOURNAL.png',
  }
];
