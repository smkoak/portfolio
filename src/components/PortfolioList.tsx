/* eslint-disable @typescript-eslint/no-floating-promises */
import React, { useContext, useEffect, useState } from 'react';
import { RiExternalLinkLine } from 'react-icons/ri';
import { CiCalendarDate } from 'react-icons/ci';
import Masonry from 'react-masonry-css';
import styles from '../style/portfoliolist.module.scss';
import { Link } from 'react-router-dom';
import { collection, getDocs } from 'firebase/firestore';
import { db } from 'firebaseApp';
import AuthContext from 'context/AuthContext';
import Loader from './Loader';

interface PortfolioProps {
  title: string;
  content: string;
  category: string;
  createdAt: string;
  startMonth: string;
  endMonth: string;
  screenshot: string;
  email: string;
  id: string;
  url: string;
}

function PortfolioList(): JSX.Element {
  const { user } = useContext(AuthContext);

  const [portfolios, setPortfolios] = useState<PortfolioProps[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const getPortfolio = async () => {
    const data = await getDocs(collection(db, 'portfolio'));
    data.forEach((doc) => {
      const dataObj = { ...doc.data(), id: doc.id };
      setPortfolios((prev) => [...prev, dataObj as PortfolioProps]);
    });
  };

  useEffect(() => {
    getPortfolio().then(() => {
      setLoading(true);
    });
  }, []);

  const breakpointColumnsObj = {
    default: 4,
    3200: 3,
    1600: 2,
    1100: 1,
  };

  return (
    <div className={styles.container}>
      <div className={styles.header__wrap}>
        <h2 className={styles.head__title}>Portfolio</h2>
        {user != null && (
          <Link className={styles.head__link} to="/portfolio/write">
            글쓰기
          </Link>
        )}
      </div>
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className={styles['masonry-grid']}
        columnClassName={styles['masonry-grid_column']}
      >
        {portfolios?.length > 0
          ? // startMonth 순으로 정렬
            portfolios
              ?.sort((a, b) => {
                if (a.startMonth > b.startMonth) return -1;
                if (a.startMonth < b.startMonth) return 1;
                return 0;
              })
              .map((post, index) => (
                <div key={post?.id} className={styles['masonry-item']}>
                  <Link to={post?.url} target="_blank">
                    <div
                      className={styles.screenshot}
                      style={{ backgroundImage: `url(${post?.screenshot})` }}
                    ></div>

                    <h2 className={styles['masonry-item__title']}>
                      {post?.title}
                    </h2>
                    <div className={styles['masonry-item__desc']}>
                      {post?.content}
                    </div>
                    <div className={styles['masonry-item__meta']}>
                      <span className={styles['masonry-item__category']}>
                        {post?.category}
                      </span>
                      <span className={styles['masonry-item__date']}>
                        <CiCalendarDate /> {post?.startMonth} ~ {post?.endMonth}
                      </span>
                    </div>
                    <div className={styles['masonry-item__link-icon']}>
                      <RiExternalLinkLine />
                    </div>
                  </Link>
                </div>
              ))
          : '데이터가 없습니다.'}
      </Masonry>
      {!loading && <Loader opacity={true} />}
    </div>
  );
}

export default PortfolioList;
