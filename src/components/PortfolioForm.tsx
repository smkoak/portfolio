/* eslint-disable @typescript-eslint/no-misused-promises */
import AuthContext from 'context/AuthContext';
import { addDoc, collection } from 'firebase/firestore';
import { db, storage } from 'firebaseApp';
import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import styles from 'style/form.module.scss';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { v4 as uuidv4 } from 'uuid';

function PortfolioForm(): JSX.Element {
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [category, setCategory] = useState<string>('');
  const [url, setUrl] = useState<string>('');
  const [startMonth, setStartMonth] = useState<string>('');
  const [endMonth, setEndMonth] = useState<string>('');
  const [attachment, setAttachment] = useState<
    Blob | Uint8Array | ArrayBuffer
  >();

  const { user } = useContext(AuthContext);

  const navigate = useNavigate();

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    // 업로드 된 file
    if (e.target.files == null) return;
    const files = e.target.files[0];

    const reader = new FileReader();

    reader.onloadend = (e) => {
      setAttachment(files);
    };
    reader.readAsDataURL(files);
  };

  const onSubmit = async (
    e: React.FormEvent<HTMLFormElement>,
  ): Promise<void> => {
    e.preventDefault();

    const fileRef = ref(storage, uuidv4());

    if (attachment == null) {
      toast.error('이미지를 업로드 해주세요.');
      return;
    }

    try {
      const uploadImage = await uploadBytes(fileRef, attachment);
      const thumbURL = await getDownloadURL(uploadImage.ref); // firestore로 데이터 생성
      await addDoc(collection(db, 'portfolio'), {
        title,
        url,
        content,
        category,
        createdAt: new Date()?.toLocaleDateString(),
        email: user?.email,
        startMonth,
        endMonth,
        screenshot: thumbURL,
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
    } else if (name === 'start') {
      setStartMonth(value);
    } else if (name === 'end') {
      setEndMonth(value);
    } else if (name === 'url') {
      setUrl(value);
    }
  };

  return (
    <div className={styles.form__wrapper}>
      <h2 className={styles.head__title}>Portfolio 추가</h2>
      <form onSubmit={onSubmit} className={`${styles.form}`}>
        <div className={styles.form__block}>
          <label htmlFor="title">프로젝트 제목</label>
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
          <label htmlFor="title">프로젝트 URL</label>
          <input
            type="text"
            name="url"
            id="url"
            value={url}
            onChange={onChange}
            autoComplete="off"
          />
        </div>
        <div className={styles.form__block}>
          <ul className={styles.form__row}>
            <li>
              <label htmlFor="category">프로젝트 분류</label>
              <select
                name="category"
                id="category"
                required
                value={category}
                onChange={onChange}
                autoComplete="off"
              >
                <option value="">분류 선택</option>
                <option value="Com2uS">Com2uS</option>
                <option value="Com2uS Holdings">Com2uS Holdings</option>
                <option value="Com2us Platform">Com2uS Platform</option>
                <option value="Personal">Personal</option>
              </select>
            </li>
            <li>
              <label htmlFor="start">시작 달</label>
              <input
                type="month"
                id="start"
                name="start"
                value={startMonth}
                onChange={onChange}
              />
            </li>
            <li>
              <label htmlFor="start">종료 달</label>
              <input
                type="month"
                id="end"
                name="end"
                value={endMonth}
                onChange={onChange}
              />
            </li>
          </ul>
        </div>
        <div className={styles.form__block}>
          <label htmlFor="image">이미지 업로드</label>
          <input
            type="file"
            name="image"
            id="image"
            onChange={onFileChange}
            required
            accept="image/*"
          />
        </div>
        <div className={styles.form__block}>
          <label htmlFor="content">프로젝트 설명</label>
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
