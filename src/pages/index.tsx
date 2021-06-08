import Link from 'next/link';
import { GetStaticProps } from 'next';

import { FiCalendar, FiUser } from 'react-icons/fi';
import Prismic from '@prismicio/client';
import { useState } from 'react';
import { getPrismicClient } from '../services/prismic';
import { formatDate } from '../utils/format';

import commonStyles from '../styles/common.module.scss';
import styles from './home.module.scss';

interface Post {
  uid?: string;
  first_publication_date: string | null;
  data: {
    title: string;
    subtitle: string;
    author: string;
  };
}

interface PostPagination {
  next_page: string;
  results: Post[];
}

interface HomeProps {
  postsPagination: PostPagination;
}

export default function Home({ postsPagination }: HomeProps) {
  const { results, next_page } = postsPagination;
  const [posts, setPosts] = useState<Post[]>(results);
  const [nextPage, setNextPage] = useState<string | null>(next_page);

  const handleShowMore = (): void => {
    if (!nextPage) return;

    fetch(nextPage, { method: 'GET' })
      .then(response => response.json())
      .then((data: PostPagination) => {
        setNextPage(data.next_page);
        setPosts([...posts, ...data.results]);
      })
      .catch(err => console.log(err));
  };

  return (
    <div className={styles.container}>
      {posts.map(post => {
        return (
          <div key={post.uid} className={styles.listItem}>
            <Link href={`/post/${post.uid}`}>
              <a>
                <h2 className={styles.heading}>{post.data.title}</h2>
              </a>
            </Link>
            <span className={styles.subtitle}>{post.data.subtitle}</span>
            <div className={styles.info}>
              <FiCalendar size={20} />
              <span>
                {formatDate(post.first_publication_date, 'dd MMM yyyy')}
              </span>
              <FiUser size={20} /> {post.data.author}
            </div>
          </div>
        );
      })}
      {nextPage && (
        <button
          onClick={handleShowMore}
          type="button"
          className={styles.buttonShowMore}
        >
          Carregar mais posts
        </button>
      )}
    </div>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const prismic = getPrismicClient();
  const postsResponse = await prismic.query(
    [Prismic.predicates.at('document.type', 'posts')],
    {
      fetch: ['posts.title', 'posts.subtitle', 'posts.author'],
      pageSize: 1,
    }
  );

  return {
    props: {
      postsPagination: {
        next_page: postsResponse.next_page,
        results: postsResponse.results,
      },
    },
  };
};
