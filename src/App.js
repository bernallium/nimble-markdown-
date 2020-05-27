import React, { useState, useEffect, useRef } from 'react';
import nimblelogo from './nimble-logo.png';
import AceEditor from "react-ace";
import MarkdownView from "react-showdown";
import themes from "./themes";
import "ace-builds/src-noconflict/ace";
import "ace-builds/src-noconflict/mode-markdown";
import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/theme-tomorrow";
import "ace-builds/src-noconflict/theme-kuroir";
import "ace-builds/src-noconflict/theme-twilight";
import "ace-builds/src-noconflict/theme-xcode";
import "ace-builds/src-noconflict/theme-textmate";
import "ace-builds/src-noconflict/theme-solarized_dark";
import "ace-builds/src-noconflict/theme-solarized_light";
import "ace-builds/src-noconflict/theme-terminal";
import { Link } from 'react-scroll';

function onChange(newValue) {
  console.log("change", newValue);
}

// function useOnScreen(options) {
//   const ref = useRef();
//   const [visivle, setVisible] = useState(false);

//   useEffect(() => {
//     const heroObserver = new InteractionObserver(([entry]) => {
//       setVisible(entry.isIntersecting);
//     }, options);
//     if (ref.current) heroObserver.observe(ref.current);
//   }, [ref, options]);
// }

function App() {
  let [markdown, setMarkDown] = useState(`### Hello! :wave:\n\nThanks for visiting **nimble** :rabbit:
  \n\nEdit me and get a live preview of the markdown output thanks to the power of React! :sunglasses:
  \n\nTry changing the theme of the editor too! :art:`);
  let [theme, setTheme] = useState('monokai');
  // const ref = { current: null };

  const themeOptions = themes.map((theme, i) => (
    <option className="theme-option" key={theme}>
      {theme}
    </option>
  ));

  function updateEditorTheme(selectedTheme) {
    setTheme(selectedTheme);
  }

  useEffect(() => {
    const navbar = document.querySelector('.navbar');
    const hero = document.getElementById('hero');
    const themeSelector = document.querySelector('.theme-selector');

    const heroOptions = {
      rootMargin: '-600px 0px 0px 0px'
    };

    const heroObserver = new IntersectionObserver((entries, heroObserver) => {
      entries.forEach((entry) => {
        console.log(entry.target);
        if (!entry.isIntersecting) { // User has scrolled
          navbar.classList.add('scrolled');
          themeSelector.classList.remove('navtop');
          navbar.classList.remove('navtop');
        } else { // Navbar is at the top of the page
          navbar.classList.add('navtop');
          themeSelector.classList.add('navtop');
          navbar.classList.remove('scrolled');
        }
      })
    }, heroOptions);

    heroObserver.observe(hero);
  }, []);

  return (
    <div className="App">
      <div className='page' id='hero'> 
        <div>
          <h1 className='landing-page-header'>nimble</h1>
          <h2>A simple markdown editor</h2>
        </div>
        <Link 
          to='editor' 
          smooth={true} 
          duration={500}
        >
          <i className="fas fa-arrow-down" />
        </Link>
      </div>
      <nav className='navbar navbar-expand-lg navbar-light fixed-top'>
        <div className="theme-selector">
          <label><i className="fas fa-paint-roller"></i></label>
          {/* <Link to='/#editor'><i className="fas fa-paint-roller"></i></Link> */}
          <select
            name="theme-names"
            id="theme-names"
            aria-label="Select a theme for your editor"
            aria-required="false"
            onChange={e => updateEditorTheme(e.target.value)}
          >
            {themeOptions}
          </select>
        </div>
        <div className="navbar-brand">
          <img src={nimblelogo} height="30" className="d-inline-block align-center" alt="" />
          <span className='navbar-brand-title'>nimble</span>
        </div>
      </nav>
      <div className="page">
        <div className="editor-and-panel">
          <div className="theme-selector-and-editor">
            <AceEditor
              className="editor"
              id="editor"
              mode="markdown"
              theme={theme}
              onChange={(value, stat) => {
                setMarkDown(value);
                console.log("onChange", value, stat);
              }}
              highlightActiveLine={true}
              wrapEnabled={true}
              fontSize={14}
              // width={"700px"}
              // height={"600px"}
              value={markdown}
              name="UNIQUE_ID_OF_DIV"
              editorProps={{ $blockScrolling: true }}
              enableBasicAutocompletion={true}
              enableLiveAutocompletion={true}
              enableSnippets={true}
            />
          </div>
          <MarkdownView
            className="view-panel"
            markdown={markdown}
            options={{
              strikethrough: true,
              underline: true,
              tables: true,
              emoji: true,
            }}
          />
        </div>
        {/* <footer>
          Made with React,{" "}
          <a href="https://github.com/securingsincity/react-ace">react-ace</a>,
          and{" "}
          <a href="https://github.com/jerolimov/react-showdown">
            react-showdown
          </a>
        </footer> */}
      </div>
    </div>
  );
}

export default App;
