import React from 'react';
import dynamic from 'next/dynamic';
import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';

import BlogHero from '@/components/BlogHero';
import { loadBlogPost } from '@/helpers/file-helpers';

import styles from './postSlug.module.css';
import CodeSnippet from '@/components/CodeSnippet';
import Spinner from '@/components/Spinner';

export async function generateMetadata({ params }) {
  const { postSlug } = await params;
  const mdxBlogPost = await loadBlogPost(postSlug);

  return {
    title: mdxBlogPost.frontmatter.title,
    description: mdxBlogPost.frontmatter.description,
  };
}

async function BlogPost({ params }) {
  const { postSlug } = await params;
  const mdxBlogPost = await loadBlogPost(postSlug);

  if (!mdxBlogPost) {
    notFound();
  }

  const DivisionGroupsDemo = dynamic(
    () => import('@/components/DivisionGroupsDemo'),
    { loading: Spinner },
  );

  const CircularColorsDemo = dynamic(
    () => import('@/components/CircularColorsDemo'),
    { loading: Spinner },
  );

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
          components={{
            pre: CodeSnippet,
            DivisionGroupsDemo,
            CircularColorsDemo,
          }}
        />
      </div>
    </article>
  );
}

export default BlogPost;
