import React, { useContext } from 'react';
import styles from 'style/about.module.scss';
import AuthContext from 'context/AuthContext';
import { Link } from 'react-router-dom';

function AboutContent() {
  const { user } = useContext(AuthContext);
  return (
    <div className={styles.container}>
      <div className={styles.header__wrap}>
        <h2 className={styles.head__title}>About</h2>
        {user != null && (
          <Link className={styles.head__link} to="/portfolio/write">
            글쓰기
          </Link>
        )}
      </div>
      <article className={styles.header__content}>
        <p className={styles.introduce__title}>
          전 세계 1억 명 이상의 유저와 16개국에서 다국어를 사용하는 글로벌
          유저를 대상으로 하는 PC 및 모바일 게임 플랫폼 서비스에서 웹 접근성, 웹
          표준 및 크로스 브라우징, 다국어 대응 등을 고려한 웹 퍼블리싱 신규 제작
          및 구축 유지보수 마크업 업무를 담당하고 있습니다.
          <br />
          <br />
          저는 PC/Mobile Web, App, Webview, Wordpress, ChatBot, Groupware,
          Backoffice, React, Vue 등 다양한 환경에서의 퍼블리싱 경험을 가지고
          있습니다. 또한 해당 프로젝트와 연계된 기획, 마케팅, 디자인 및 개발
          직군과의 커뮤니케이션 등의 경험을 가지고 있어서 팀 내에서 원활한
          협업이 가능합니다.
          <br />
          <br />
          저는 새로운 기술에 대한 도전 및 학습에 대한 의욕이 높습니다. 또한
          기획, 디자인 및 개발 부서와 협업에서 유연하고 효과적인 방향을 잡는
          것을 추구합니다. 문제가 생겨도 그 상황 안에서 일을 진행할 수 있는
          방향을 찾습니다. 함께 정한 기한과 일정을 반드시 지키려고 노력합니다.
          감사합니다.
        </p>
        <div>
          <h3 className={styles.header__middle}>Career</h3>
          <ul className={styles.career__list}>
            <li>- 2016.09 ~ (주)컴투스플랫폼 웹개발팀 (재직 중)</li>
            <li>- 2016.06 ~ (주)컴투스</li>
          </ul>
          <h3 className={styles.header__middle}>Tech Skill</h3>
          <ul className={styles.career__list}>
            <li>- HTML</li>
            <li>- CSS, SCSS, LESS</li>
            <li>- JavaScript, TypeScript</li>
            <li>- React, Vue</li>
          </ul>
        </div>
      </article>
    </div>
  );
}

export default AboutContent;
