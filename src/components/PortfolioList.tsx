import React from 'react';
import Masonry from 'react-masonry-css';
import styles from '../style/portfoliolist.module.scss';
import { pick, randomColor } from '../util/random';

function PortfolioList(): JSX.Element {
  const numberOfBoxes = 16;
  const breakpointColumnsObj = {
    default: 6,
    2500: 5,
    2000: 4,
    1600: 3,
    1200: 2,
    600: 1,
  };
  return (
    <div className={styles.container}>
      <h2 className={styles['head-title']}>Portfolio</h2>
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className={styles['masonry-grid']}
        columnClassName={styles['masonry-grid_column']}
      >
        {Array.from({ length: numberOfBoxes }).map((_, index) => (
          <div key={index} className={styles['masonry-item']}>
            <div
              className={styles.screenshot}
              style={{
                backgroundColor: randomColor(),
                height: pick([200, 230, 380, 300, 360, 380]),
              }}
            ></div>
            <div className={styles['masonry-item__meta']}>
              <span className={styles['masonry-item__category']}>web</span>
              <span className={styles['masonry-item__date']}>2023.11.07 </span>
            </div>
            <h2 className={styles['masonry-item__title']}>
              transcription, editing, copy: mozilla internet health report 2022
            </h2>
            <div className={styles['masonry-item__desc']}>
              I worked as a researcher and communications consultant with Global
              Witness on their investigations into misinformation during the
              2020 Brazilian election and the 2020 midterms in the US.
            </div>
          </div>
        ))}
      </Masonry>
    </div>
  );
}

export default PortfolioList;
