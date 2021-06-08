import { GetStaticPaths, GetStaticProps } from 'next';

import { FiCalendar, FiClock, FiUser } from 'react-icons/fi';
import { useRouter } from 'next/router';
import Prismic from '@prismicio/client';
import { RichText } from 'prismic-dom';
import { getPrismicClient } from '../../services/prismic';
import { removeTags } from '../../utils/removeTags';
import { formatDate } from '../../utils/format';

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

export default function Post({ post }: PostProps) {
  const router = useRouter();

  if (router.isFallback) {
    return <div className={styles.container}>Carregando...</div>;
  }

  const postFormatted = {
    first_publication_date: formatDate(
      post.first_publication_date,
      'dd MMM yyyy'
    ),
    data: {
      title: post.data.title,
      banner: {
        url: post.data?.banner?.url,
      },
      author: post.data.author,
      content: post.data.content?.map(el => ({
        heading: el.heading,
        body: [{ text: RichText.asHtml(el.body) }],
      })),
    },
  };

  const wordsPerMinute = 200;

  const totalWords = post.data.content?.reduce((acc, cur) => {
    return acc + removeTags(RichText.asText(cur.body) || '').length;
  }, 0);

  const readingTime = Math.ceil(totalWords / wordsPerMinute);

  return (
    <section>
      <div className={styles.banner}>
        <img
          src={postFormatted.data.banner.url}
          alt={postFormatted.data.title}
        />
      </div>
      <div className={styles.container}>
        <div className={styles.listItem}>
          <h1 className={styles.heading}>{postFormatted.data.title}</h1>
          <div className={styles.info}>
            <div className={styles.infoItem}>
              <FiCalendar size={20} />{' '}
              <span>{postFormatted.first_publication_date}</span>
            </div>
            <div className={styles.infoItem}>
              <FiUser size={20} /> {postFormatted.data.author}
            </div>
            <div className={styles.infoItem}>
              <FiClock size={20} />
              <span>{`${readingTime} min`}</span>
            </div>
          </div>
        </div>
        <div className={styles.content}>
          {postFormatted.data?.content?.map(content => {
            return (
              <div key={content.heading}>
                <h2>{content.heading}</h2>
                {content.body.map(body => (
                  <div
                    key={body.text}
                    dangerouslySetInnerHTML={{ __html: String(body.text) }}
                  />
                ))}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const prismic = getPrismicClient();
  const posts = await prismic.query(
    [Prismic.predicates.at('document.type', 'posts')],
    {
      fetch: ['posts.uid'],
      pageSize: 1,
    }
  );

  const paths = posts.results.map(post => {
    return { params: { slug: post.uid } };
  });

  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async context => {
  const prismic = getPrismicClient();
  const response = await prismic.getByUID(
    'posts',
    String(context.params.slug),
    {}
  );

  return {
    props: {
      post: response,
    },
  };
};
