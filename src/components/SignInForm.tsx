/* eslint-disable @typescript-eslint/no-misused-promises */
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from 'style/form.module.scss';
import { app } from 'firebaseApp';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { toast } from 'react-toastify';

export default function LoginForm(): JSX.Element {
  const [error, setError] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const navigate = useNavigate();

  const onSubmit = async (
    e: React.FormEvent<HTMLFormElement>,
  ): Promise<void> => {
    e.preventDefault();

    try {
      const auth = getAuth(app);
      await signInWithEmailAndPassword(auth, email, password);

      toast.success('로그인에 성공하였습니다.');
      navigate('/');
    } catch (error: any) {
      toast.error(error?.code);
      console.log(error);
    }
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const {
      target: { name, value },
    } = e;

    if (name === 'email') {
      setEmail(value);

      const validRegex =
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

      if (value?.match(validRegex) == null) {
        setError('이메일 형식이 올바르지 않습니다.');
      } else {
        setError('');
      }
    }

    if (name === 'password') {
      setPassword(value);

      if (value?.length < 8) {
        setError('비밀번호는 8자리 이상 입력해주세요');
      } else {
        setError('');
      }
    }
  };

  return (
    <div className={styles['form__wrapper--center']}>
      <Link to="/">
        <div className={styles.profile__img}></div>
      </Link>
      <h1 className={styles.profile__txt}>Sunmin Koak</h1>
      <form onSubmit={onSubmit} className={`${styles.form__signin}`}>
        <div className={styles.form__block}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            required
            placeholder={'이메일을 입력해주세요.'}
            onChange={onChange}
            value={email}
            autoComplete="off"
          />
        </div>
        <div className={styles.form__block}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            required
            placeholder="비밀번호를 입력해주세요."
            onChange={onChange}
            value={password}
            autoComplete="off"
          />
        </div>
        {error.length > 0 && error?.length > 0 && (
          <div className={styles.form__block}>
            <div className={styles.form__error}>{error}</div>
          </div>
        )}
        <div className={styles.form__block}>
          <input
            type="submit"
            value="Sign In"
            className={styles['form__btn--submit']}
            disabled={error?.length > 0}
          />
        </div>
      </form>
    </div>
  );
}
