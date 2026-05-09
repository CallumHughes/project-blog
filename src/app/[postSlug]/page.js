import React from 'react';

import BlogHero from '@/components/BlogHero';
import { loadBlogPost } from "@/helpers/file-helpers";
import { MDXRemote } from 'next-mdx-remote/rsc';

import styles from './postSlug.module.css';


export async function generateMetadata({ params }) {
    const { postSlug } = await params;
    const mdxBlogPost = await loadBlogPost(postSlug)

    return {
        title: mdxBlogPost.frontmatter.title,
        description: mdxBlogPost.frontmatter.description,
    };
}


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
