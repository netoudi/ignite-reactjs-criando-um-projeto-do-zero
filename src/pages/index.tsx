import Link from 'next/link';
import { GetStaticProps } from 'next';

import { FiCalendar, FiUser } from 'react-icons/fi';
import { getPrismicClient } from '../services/prismic';

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

export default function Home() {
  return (
    <div className={styles.container}>
      {[1, 2, 3].map(post => {
        return (
          <div key={post} className={styles.listItem}>
            <Link href="/post/xpto">
              <a>
                <h2 className={styles.heading}>Como utilizar Hooks</h2>
              </a>
            </Link>
            <span className={styles.subtitle}>
              Pensando em sincronização em vez de ciclos de vida.
            </span>
            <div className={styles.info}>
              <FiCalendar size={20} /> 15 Mar 2021
              <FiUser size={20} /> Joseph Oliveira
            </div>
          </div>
        );
      })}
      <button type="button" className={styles.buttonShowMore}>
        Carregar mais posts
      </button>
    </div>
  );
}

// export const getStaticProps = async () => {
//   // const prismic = getPrismicClient();
//   // const postsResponse = await prismic.query(TODO);

//   // TODO
// };
