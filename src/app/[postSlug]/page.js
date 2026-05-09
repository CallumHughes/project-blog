import React from 'react';

import BlogHero from '@/components/BlogHero';
import { MDXRemote } from 'next-mdx-remote/rsc';

import styles from './postSlug.module.css';
import { loadBlogPost } from "@/helpers/file-helpers";


async function BlogPost({ params }) {
  const { postSlug } = await params;
  const mdxBlogPost = await loadBlogPost(postSlug)

  return (
    <article className={styles.wrapper}>
      <BlogHero
        title={mdxBlogPost.frontmatter.title}
        publishedOn={mdxBlogPost.frontmatter.publishedOn}
      />
      <div className={styles.page}>
        <MDXRemote
          source={mdxBlogPost.content}
          frontmatter={mdxBlogPost.frontmatter}
        />
      </div>
    </article>
  );
}

export default BlogPost;
