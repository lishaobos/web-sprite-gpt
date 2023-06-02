import fs from 'fs/promises'
import path from 'node:path'

const join = filePath => path.join('./dist', filePath) 

async function exec () {
  const buildInfo = JSON.parse(await fs.readFile(join('manifest.vite.json'), 'utf-8'))
  const style = await fs.readFile(join(buildInfo['index.css']['file']), 'utf-8')
  await fs.writeFile(join('background.js'), `
  chrome.action.onClicked.addListener((tab) => {
    chrome.scripting.executeScript({
      target: {
        tabId: tab.id
      },
      files: ['${buildInfo['index.html']['file']}']
    }).then(() => {
      chrome.scripting.executeScript({
        target: {
          tabId: tab.id
        },
        func: () => {
          const el = document.querySelector('web-spriter-gpt')
          const style = document.createElement('style')
          style.innerHTML = \`${style}\`
          el.appendChild(style)
        }
      });
    });
  
  });
  `)
}

exec()