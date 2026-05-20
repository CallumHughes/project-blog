import process from 'node:process';
import fs from 'node:fs/promises';
import path from 'node:path';
import RSS from 'rss';
import { BLOG_TITLE, BLOG_DESCRIPTION } from '../src/constants.js';
import { getBlogPostList } from '../src/helpers/file-helpers.js';

// Falling back to the dev server only because this project is a tutorial;
// a real deployment should always set SITE_URL so the feed contains absolute, public URLs.
const SITE_URL = process.env.SITE_URL || 'http://localhost:3000';

async function main() {
  const posts = await getBlogPostList();

  const feed = new RSS({
    title: BLOG_TITLE,
    description: BLOG_DESCRIPTION,
    feed_url: `${SITE_URL}/rss.xml`,
    site_url: SITE_URL,
    language: 'en-us',
  });

  for (const post of posts) {
    feed.item({
      title: post.title,
      description: post.abstract || '',
      url: `${SITE_URL}/${post.slug}`,
      guid: `${SITE_URL}/${post.slug}`,
      date: new Date(post.publishedOn),
    });
  }

  const outPath = path.join(process.cwd(), 'public', 'rss.xml');
  await fs.writeFile(outPath, feed.xml({ indent: true }), 'utf8');
  console.log(`Wrote ${posts.length} items to ${outPath}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
