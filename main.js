import './style.css'
// import { encode, decode } from 'js-base64'
import * as monaco from 'monaco-editor'
import HtmlWorker from 'monaco-editor/esm/vs/language/html/html.worker?worker'
import CssWorker from 'monaco-editor/esm/vs/language/css/css.worker?worker'
import JsWorker from 'monaco-editor/esm/vs/language/typescript/ts.worker?worker'

window.MonacoEnvironment = {
  getWorker (_, label) {
    if (label === 'html') return new HtmlWorker()
    if (label === 'css') return new CssWorker()
    if (label === 'typesctipt' || label === 'javascript') return new JsWorker()
  }
}

const $ = selector => document.querySelector(selector)

const $html = $('#html')
const $css = $('#css')
const $js = $('#js')

// const { pathname } = window.location
//
// const [rawHtml, rawCss, rawJs] = pathname.slice(1).split('%7C')
//
// const html = decode(rawHtml)
// const css = decode(rawCss)
// const js = decode(rawJs)

const html = $html.value
const css = $css.value
const js = $js.value

const htmlEditor = monaco.editor.create($html, {
  value: html,
  language: 'html',
  theme: 'vs-dark',
  minimap: {
    enabled: false
  },
  fontSize: 18,
  fontFamily: 'Cascadia Code',
  fontLigatures: true,
  wordWrap: 'on',
  useTabStops: true,
  tabCompletion: true,
  tabSize: 2
})

const cssEditor = monaco.editor.create($css, {
  value: css,
  language: 'css',
  theme: 'vs-dark',
  minimap: {
    enabled: false
  },
  fontSize: 18,
  fontFamily: 'Cascadia Code',
  fontLigatures: true,
  wordWrap: 'on',
  useTabStops: true,
  tabCompletion: true,
  tabSize: 2
})

const jsEditor = monaco.editor.create($js, {
  value: js,
  language: 'javascript',
  theme: 'vs-dark',
  minimap: {
    enabled: false
  },
  fontSize: 18,
  fontFamily: 'Cascadia Code',
  fontLigatures: true,
  wordWrap: 'on',
  useTabStops: true,
  tabCompletion: true,
  tabSize: 2
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
