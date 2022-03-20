import './style.css'
import { encode, decode } from 'js-base64'

const $ = selector => document.querySelector(selector)

const $html = $('#html')
const $css = $('#css')
const $js = $('#js')

$html.addEventListener('input', update)
$css.addEventListener('input', update)
$js.addEventListener('input', update)

function init () {
  const { pathname } = window.location

  const [rawHtml, rawCss, rawJs] = pathname.slice(1).split('%7C')

  const html = decode(rawHtml)
  const css = decode(rawCss)
  const js = decode(rawJs)

  $html.value = html
  $css.value = css
  $js.value = js

  const htmlPreview = createHtml({ html, css, js })
  $('iframe').setAttribute('srcdoc', htmlPreview)
}

function update () {
  const html = $html.value
  const css = $css.value
  const js = $js.value

  const hashedCode = `${encode(html)}|${encode(css)}|${encode(js)}`

  window.history.replaceState(null, null, `/${hashedCode}`)

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

init()
