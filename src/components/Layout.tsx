import React from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import styles from '../style/layout.module.scss';
 
interface Props {
  children: React.ReactNode;
}

function Layout({ children }: Props): JSX.Element {
  return (
    <div className={styles.layout}>
      {children}
      <ToastContainer />
    </div>
  );
}

export default Layout;
