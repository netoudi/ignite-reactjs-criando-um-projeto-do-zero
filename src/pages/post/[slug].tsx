import { GetStaticPaths, GetStaticProps } from 'next';

import { FiCalendar, FiClock, FiUser } from 'react-icons/fi';
import { getPrismicClient } from '../../services/prismic';

import commonStyles from '../../styles/common.module.scss';
import styles from './post.module.scss';

interface Post {
  first_publication_date: string | null;
  data: {
    title: string;
    banner: {
      url: string;
    };
    author: string;
    content: {
      heading: string;
      body: {
        text: string;
      }[];
    }[];
  };
}

interface PostProps {
  post: Post;
}

export default function Post() {
  return (
    <section>
      <div className={styles.banner}>
        <img src="/images/banner.jpg" alt="Post title" />
      </div>
      <div className={styles.container}>
        <div className={styles.listItem}>
          <a href="/post/xpto">
            <h1 className={styles.heading}>Como utilizar Hooks</h1>
          </a>
          <span className={styles.subtitle}>
            Pensando em sincronização em vez de ciclos de vida.
          </span>
          <div className={styles.info}>
            <div className={styles.infoItem}>
              <FiCalendar size={20} /> 15 Mar 2021
            </div>
            <div className={styles.infoItem}>
              <FiUser size={20} /> Joseph Oliveira
            </div>
            <div className={styles.infoItem}>
              <FiClock size={20} /> 4 min
            </div>
          </div>
        </div>
        <div className={styles.content}>
          <h2>Lorem ipsum dolor.</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugiat in
            maxime omnis recusandae saepe vel! Autem consequatur eveniet hic
            illo labore magnam minus nemo, nobis nulla obcaecati odit
            praesentium quisquam, quo, recusandae reprehenderit tempora
            voluptates! Adipisci aut blanditiis exercitationem modi quasi quo
            tempora veniam voluptates. Earum enim excepturi ipsa ut.
          </p>
          <h2>Lorem ipsum dolor.</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            Dignissimos harum odio quam quod! Beatae deleniti dolores dolorum
            error et, ex facilis magni, nesciunt odit pariatur ratione
            reiciendis rem sapiente similique. Lorem ipsum dolor sit amet,
            consectetur adipisicing elit. Fugiat in maxime omnis recusandae
            saepe vel! Autem consequatur eveniet hic illo labore magnam minus
            nemo, nobis nulla obcaecati odit praesentium quisquam, quo,
            recusandae reprehenderit tempora voluptates! Adipisci aut blanditiis
            exercitationem modi quasi quo tempora veniam voluptates. Earum enim
            excepturi <a href="/">ipsa ut</a>.
          </p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            Dignissimos harum odio quam quod! Beatae deleniti dolores dolorum
            error et, ex facilis magni, nesciunt odit pariatur ratione
            reiciendis rem sapiente similique. Lorem ipsum dolor sit amet,
            consectetur adipisicing elit. Fugiat in maxime omnis recusandae
            saepe vel! Autem consequatur eveniet hic illo labore magnam minus
            nemo, nobis nulla obcaecati odit praesentium quisquam, quo,
            recusandae reprehenderit tempora voluptates! Adipisci aut blanditiis
            exercitationem modi quasi quo tempora veniam voluptates. Earum enim
            excepturi ipsa ut.
          </p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            Dignissimos harum odio quam quod! Beatae deleniti dolores dolorum
            error et, ex facilis magni, nesciunt odit pariatur ratione
            reiciendis rem sapiente similique. Lorem ipsum dolor sit amet,
            consectetur adipisicing elit. Fugiat in maxime omnis recusandae
            saepe vel! Autem consequatur eveniet hic illo labore magnam minus
            nemo, nobis nulla obcaecati odit praesentium quisquam, quo,
            recusandae reprehenderit tempora voluptates! Adipisci aut blanditiis
            exercitationem modi quasi quo tempora veniam voluptates. Earum enim
            excepturi ipsa ut.
          </p>
        </div>
      </div>
    </section>
  );
}

// export const getStaticPaths = async () => {
//   const prismic = getPrismicClient();
//   const posts = await prismic.query(TODO);

//   // TODO
// };

// export const getStaticProps = async context => {
//   const prismic = getPrismicClient();
//   const response = await prismic.getByUID(TODO);

//   // TODO
// };
