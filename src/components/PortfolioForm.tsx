/* eslint-disable @typescript-eslint/no-misused-promises */
import AuthContext from 'context/AuthContext';
import { addDoc, collection } from 'firebase/firestore';
import { db } from 'firebaseApp';
import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import styles from 'style/form.module.scss';

function PortfolioForm(): JSX.Element {
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [category, setCategory] = useState<string>('');
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const onSubmit = async (
    e: React.FormEvent<HTMLFormElement>,
  ): Promise<void> => {
    e.preventDefault();

    try {
      // firestore로 데이터 생성
      await addDoc(collection(db, 'portfolio'), {
        title,
        content,
        category,
        createdAt: new Date()?.toLocaleDateString(),
        email: user?.email,
      });
      toast.success('포트폴리오가 등록되었습니다.');
      navigate('/');
    } catch (error: any) {
      console.log(error);
      toast.error(error?.code);
    }
  };

  const onChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ): void => {
    const {
      target: { name, value },
    } = e;

    if (name === 'title') {
      setTitle(value);
    } else if (name === 'content') {
      setContent(value);
    } else if (name === 'category') {
      setCategory(value);
    }
  };

  return (
    <div className={styles.form__wrapper}>
      <form onSubmit={onSubmit} className={`${styles.form}`}>
        <div className={styles.form__block}>
          <label htmlFor="title">제목</label>
          <input
            type="text"
            name="title"
            id="title"
            required
            value={title}
            onChange={onChange}
            autoComplete="off"
          />
        </div>
        <div className={styles.form__block}>
          <label htmlFor="category">분류</label>
          <select
            name="category"
            id="category"
            required
            value={category}
            onChange={onChange}
            autoComplete="off"
          >
            <option value="">분류 선택</option>
            <option value="com2us">Com2uS</option>
            <option value="holdings">Com2uS Holdings</option>
            <option value="personal">Personal</option>
          </select>
        </div>
        <div className={styles.form__block}>
          <label htmlFor="content">본문</label>
          <textarea
            name="content"
            id="content"
            required
            value={content}
            autoComplete="off"
            onChange={onChange}
          />
        </div>
        <div className={styles.form__block}>
          <input
            type="submit"
            value="글쓰기"
            className={styles['form__btn--submit']}
          />
        </div>
      </form>
    </div>
  );
}

export default PortfolioForm;
