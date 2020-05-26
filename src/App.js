import React, { useState } from 'react';
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

function onChange(newValue) {
  console.log("change", newValue);
}

function App() {
  let [markdown, setMarkDown] = useState(`### :wave: Hello fellow Markdown lover!\n\nThanks for visiting **Nimble Markdown** 🐰🎉
  \n\nEdit me and get a live preview of the markdown output thanks to the power of React! 🤯
  \n\nTry changing the theme of the editor too! 🎨`);
  let [theme, setTheme] = useState('monokai');

  const themeOptions = themes.map((theme, i) => (
    <option className="theme-option" key={theme}>
      {theme}
    </option>
  ));

  function updateEditorTheme(selectedTheme) {
    setTheme(selectedTheme);
  }

  return (
    <div className="App">
      {/* <div className="navBar">
        <h1 className="app-title">Markdown Editor</h1>
      </div> */}
      <nav className='navbar navbar-expand-lg navbar-light fixed-top'>
        {/* <span className="navbar-text">Nimble Markdown</span> */}
        <div className="navbar-brand">
          <img src="../public/nimble-logo.png" width="30" height="30" className="d-inline-block align-top" alt="" />
          Nimble Markdown 🐰
        </div>
      </nav>
      <div className="editor-and-panel">
        <div className="theme-selector-and-editor">
          <div className="theme-selector">
            <label>Theme&nbsp;</label>
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
          <AceEditor
            className="editor"
            mode="markdown"
            theme={theme}
            onChange={(value, stat) => {
              setMarkDown(value);
              console.log("onChange", value, stat);
            }}
            highlightActiveLine={true}
            wrapEnabled={true}
            fontSize={14}
            width={"700px"}
            height={"600px"}
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
  );
}

export default App;
