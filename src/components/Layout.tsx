import React from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import styles from '../style/layout.module.scss';
import { createGlobalStyle, styled } from 'styled-components';
import randomColor from 'randomcolor';

const customDarkColors = randomColor({
  luminosity: 'dark',
});
const customLightColors = randomColor({
  luminosity: 'light',
});

const GlobalStyles = createGlobalStyle`
    :root {
        --themeColor: ${customDarkColors};
        --background: #fff;
        --mainFontColor: #000;
        --cardBgColor: #fff;
        --cardFontColor : #000;
    }

    @media (prefers-color-scheme: dark) {
        :root {
            --themeColor: ${customLightColors};
            --background: #000;
            --mainFontColor: #fff;
            --cardBgColor: #181818;
            --cardFontColor : #fff;
        }
    }
`;

const Background = styled.div`
  position: absolute;
  overflow: hidden;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: --var(background);
  display: flex;
  flex-grow: 1;
  z-index: -1;
`;

interface Props {
  children: React.ReactNode;
}

function Layout({ children }: Props): JSX.Element {
  return (
    <>
      <GlobalStyles />
      <Background>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </Background>
      <div className={styles.layout}>
        {children}
        <ToastContainer />
      </div>
    </>
  );
}

export default Layout;
