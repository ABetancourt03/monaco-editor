import './style.css'
// import { encode, decode } from 'js-base64'
import * as monaco from 'monaco-editor'
import HtmlWorker from 'monaco-editor/esm/vs/language/html/html.worker?worker'
import CssWorker from 'monaco-editor/esm/vs/language/css/css.worker?worker'
import JsWorker from 'monaco-editor/esm/vs/language/typescript/ts.worker?worker'

const $ = selector => document.querySelector(selector)

window.MonacoEnvironment = {
  getWorker (_, label) {
    if (label === 'html') return new HtmlWorker()
    if (label === 'css') return new CssWorker()
    if (label === 'typesctipt' || label === 'javascript') return new JsWorker()
  }
}

const $html = $('#html')
const $css = $('#css')
const $js = $('#js')

const initialEditorState = {
  html: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Online HTML, CSS and JS Editor</title>
  </head>

  <body>
    <div id="app">
      <h2>Edit HTML and CSS to see changes</h2>
    </div>
  </body>
</html>`,
  css: `html {
  box-sizing: border-box;
  font-family: 'Segoe UI';
  font-size: 14px;
}

body {
  box-sizing: inherit;
  background-color: #222;
  color: #fff;
  margin: 0;
  padding: 0;
  text-align: center;
}`,
  js: `const $app = document.querySelector('#app')

$app.innerHTML += '<h2>Edit JS to start hacking</h2>'`
}

// const { pathname } = window.location
//
// const [rawHtml, rawCss, rawJs] = pathname.slice(1).split('%7C')
//
// const html = decode(rawHtml)
// const css = decode(rawCss)
// const js = decode(rawJs)

const html = initialEditorState.html
const css = initialEditorState.css
const js = initialEditorState.js

const CommonEditorSettings = {
  minimap: {
    enabled: false
  },
  theme: 'vs-dark',
  fontFamily: 'Consolas',
  fontSize: 14,
  fontLigatures: true,
  tabSize: 2,
  wordWrap: 'on',
  useTabStops: true,
  tabCompletion: true
}

const htmlEditor = monaco.editor.create($html, {
  value: html,
  language: 'html',
  ...CommonEditorSettings
})

const cssEditor = monaco.editor.create($css, {
  value: css,
  language: 'css',
  ...CommonEditorSettings
})

const jsEditor = monaco.editor.create($js, {
  value: js,
  language: 'javascript',
  ...CommonEditorSettings
})

htmlEditor.onDidChangeModelContent(update)
cssEditor.onDidChangeModelContent(update)
jsEditor.onDidChangeModelContent(update)

const htmlPreview = createHtml({ html, css, js })
$('iframe').setAttribute('srcdoc', htmlPreview)

function update () {
  const html = htmlEditor.getValue()
  const css = cssEditor.getValue()
  const js = jsEditor.getValue()

  // const hashedCode = `${encode(html)}|${encode(css)}|${encode(js)}`

  // window.history.replaceState(null, null, `/${hashedCode}`)

  const htmlPreview = createHtml({ html, css, js })
  $('iframe').setAttribute('srcdoc', htmlPreview)
}

function createHtml ({ html, css, js }) {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Document</title>
    </head>
    <style>
    ${css}
    </style>
    <body>
      <div id="app">${html}</div>

      <script>${js}</script>
    </body>
    </html>
  `
}
