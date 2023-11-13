/* eslint-disable @typescript-eslint/no-misused-promises */
import React, { useContext } from 'react';
import { AiOutlineMail, AiFillGithub } from 'react-icons/ai';
import { VscSignOut } from 'react-icons/vsc';
import { GrLinkedinOption } from 'react-icons/gr';
import { app } from 'firebaseApp';
import { getAuth, signOut } from 'firebase/auth';
import styles from 'style/header.module.scss';
import { toast } from 'react-toastify';
import AuthContext from 'context/AuthContext';
import { Link } from 'react-router-dom';

function Header(): JSX.Element {
  const { user } = useContext(AuthContext);

  const onSignOut = async (): Promise<void> => {
    try {
      const auth = getAuth(app);
      await signOut(auth);
      toast.success('로그아웃 되었습니다.');
    } catch (error: any) {
      console.log(error);
      toast.error(error?.code);
    }
  };

  return (
    <header className={styles.header}>
      <Link to="/">
        <div className={styles.profile__img}></div>
      </Link>
      <div>
        <div className={styles.profile__links}>
          <Link to="https://www.linkedin.com/in/smkoak" target="_blank">
            <GrLinkedinOption />
          </Link>
          <Link to="mailto:smkoak@gmail.com">
            <AiOutlineMail />
          </Link>
          <Link to="https://github.com/smkoak" target="_blank">
            <AiFillGithub />
          </Link>
        </div>
        <div className={styles.flex}>
          <h1 className={styles.profile__txt}>Sunmin Koak</h1>
          {user != null && (
            <button
              type="button"
              className={styles['header__btn-signout']}
              onClick={onSignOut}
            >
              <VscSignOut />
            </button>
          )}
        </div>
        <p className={styles.profile__desc}>
          I&apos;m a Frontend Developer who builds things for the web.
        </p>
      </div>
      <ul className={styles['header__menu-list']}>
        <li className={styles['header__menu-item']}>
          <Link to="/">protfolio</Link>
        </li>
        <li className={styles['header__menu-item']}>
          <Link to="/about">about</Link>
        </li>
        <li className={styles['header__menu-item']}>
          <Link to="/contact">contact</Link>
        </li>
      </ul>
    </header>
  );
}

export default Header;
