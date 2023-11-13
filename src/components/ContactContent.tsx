import React from 'react';
import { Link } from 'react-router-dom';
import styles from 'style/about.module.scss';

function ContactContent() {
  return (
    <div className={styles.container}>
      <div className={styles.header__wrap}>
        <h2 className={styles.head__title}>Contact</h2>
      </div>
      <dl className={styles.contact__list}>
        <div>
          <dt>LinkedIn</dt>
          <dd>
            <Link to="https://linkedin.com/in/smkoak" target="_blank">
              https://linkedin.com/in/smkoak/
            </Link>
          </dd>
        </div>
        <div>
          <dt>Email</dt>
          <dd>
            <Link to={'mailto:smkoak@gmail.com'}>smkoak@gmail.com</Link>
          </dd>
        </div>
        <div>
          <dt>Github</dt>
          <dd>
            <Link to="https://github.com/smkoak" target="_blank">
              github.com/smkoak
            </Link>
          </dd>
        </div>
      </dl>
    </div>
  );
}

export default ContactContent;
