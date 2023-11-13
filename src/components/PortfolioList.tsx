/* eslint-disable @typescript-eslint/no-floating-promises */
import React, { useContext, useEffect, useState } from 'react';
import Masonry from 'react-masonry-css';
import styles from '../style/portfoliolist.module.scss';
import { Link } from 'react-router-dom';
import { collection, getDocs } from 'firebase/firestore';
import { db } from 'firebaseApp';
import { randomColor } from 'util/random';
import AuthContext from 'context/AuthContext';

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
}

function PortfolioList(): JSX.Element {
  const { user } = useContext(AuthContext);

  const [portfolios, setPortfolios] = useState<PortfolioProps[]>([]);

  const getPortfolio = async () => {
    const data = await getDocs(collection(db, 'portfolio'));
    data.forEach((doc) => {
      const dataObj = { ...doc.data(), id: doc.id };
      setPortfolios((prev) => [...prev, dataObj as PortfolioProps]);
    });
  };

  useEffect(() => {
    getPortfolio();
  }, []);

  const breakpointColumnsObj = {
    default: 4,
    2500: 3,
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
          ? portfolios?.map((post, index) => (
              <div
                key={index}
                className={styles['masonry-item']}
                style={{ borderColor: randomColor() }}
              >
                <div
                  className={styles.screenshot}
                  style={{ backgroundImage: `url(${post?.screenshot})` }}
                ></div>
                <div className={styles['masonry-item__meta']}>
                  <span className={styles['masonry-item__category']}>
                    {post?.category}
                  </span>
                  <span className={styles['masonry-item__date']}>
                    {post?.startMonth} ~ {post?.endMonth}
                  </span>
                </div>
                <h2 className={styles['masonry-item__title']}>{post?.title}</h2>
                <div className={styles['masonry-item__desc']}>
                  {post?.content}
                </div>
              </div>
            ))
          : '데이터가 없습니다.'}
      </Masonry>
    </div>
  );
}

export default PortfolioList;
