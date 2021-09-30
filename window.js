
const fetch = require('node-fetch')
const fs = require('fs-extra')
const path = require('path')
const { dialog } = require('electron').remote

$(() => {
    $('.btn-test').on('click', async function() {
      let directory = $('#directory').val()
      let cookie = $('#cookie').val()
      let json = $('#json').val()

      if (!directory || !cookie || !json) {
        return alert('Cookie/json required or not choose directory, please check')
      }

      let data
      try {
        data = JSON.parse(json)
      } catch (e) {
        return alert('Json parse error')
      }

      let attachments = data.actions.map(a => {
        if (a.data && a.data.attachment) {
          if (a.data.attachment.url) return a.data.attachment
        }
      }).filter(Boolean)

      if (!attachments || !attachments.length) return alert('Not found any attachments')

      for (let a of attachments) {
        $("#statistics").focus().val($("#statistics").val() + `\n -- Downloading file ${a.name} ...`)
        let filePath = path.join(directory, a.name)
        let buffer = await fetch(a.url, {
          headers: {
            cookie: cookie
          }
        }).then(res => res.buffer())
        .catch(console.log)

        fs.writeFileSync(filePath, buffer)

        $("#statistics").focus().val($("#statistics").val() + `\n -- File ${a.name} downloaded`)
      }

      $("#statistics").focus().val($("#statistics").val() + `\n -- Finished --`)
    })

    $('#directory').on('click', async function() {
      let directory
      
      dialog.showOpenDialog({properties: ['openDirectory']})
        .then(results => {

          if (results && !results.canceled) {
            directory = results.filePaths.shift()
          }

          fs.ensureDirSync(directory)

          $('#directory').val(directory)
        })
    })
})
