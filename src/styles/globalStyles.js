import { createGlobalStyle } from 'styled-components';
import base from './base';
import RobotoEOT from '../assets/fonts/Roboto-Regular.eot';
import RobotoTTF from '../assets/fonts/Roboto-Regular.ttf';
import RobotoWOFF from '../assets/fonts/Roboto-Regular.woff';


export const injectGlobalStyle = () =>
  createGlobalStyle`    
    @font-face {
      font-family: 'Roboto';
      src: url(${RobotoEOT}), url(${RobotoWOFF}), url(${RobotoTTF});
    }

    html, body, div, span, applet, object, iframe,
    h1, h2, h3, h4, h5, h6, p, blockquote, pre,
    a, abbr, acronym, address, big, cite, code,
    del, dfn, em, img, ins, kbd, q, s, samp,
    small, strike, strong, sub, sup, tt, var,
    b, u, i, center,
    dl, dt, dd, ol, ul, li,
    fieldset, form, label, legend,
    table, caption, tbody, tfoot, thead, tr, th, td,
    article, aside, canvas, details, embed, 
    figure, figcaption, footer, header, hgroup, 
    menu, nav, output, ruby, section, summary,
    time, mark, audio, video {
      margin: 0;
      padding: 0;
      border: 0;
      font: inherit;
    };
    
    html {
      box-sizing: border-box;
    }
    *, *:before, *:after {
      box-sizing: border-box; 
    }
    
    html,
    body {
      display: flex;
      align-items: stretch;
      overflow-x: hidden;
    };

    body {
      cursor: default;
      background-color: ${base.colors.white};
      position: relative;
      width: 100%;
      font-family: 'Roboto', serif;
      display: flex;
      min-height: 100vh;
      flex-direction: column;
    }
    
    button, input {
      outline: none;
    }
    
  .sortableHelper {
    display: flex !important;
  }
`;
