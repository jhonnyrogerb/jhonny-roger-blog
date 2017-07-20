var lunr = require('lunr')
var fs = require('fs')
var removeDiacritics = require('diacritics').remove;

fs.readFile('public/index.json', 'utf-8' , function (err, data) {

  var documents = JSON.parse(data)

  var idx = lunr(function () {
    this.ref('ref')
    this.field("title", {boost:15})
    this.field("tags")

    this.pipeline.remove(lunr.stemmer)

    documents.forEach(function (doc, index) {
      doc.ref = index
      doc.title = removeDiacritics(doc.title.toLowerCase())
      console.log(doc)
      this.add(doc)
    }, this)
  })

  console.log("acabou")
  fs.writeFile('public/search-index.json', JSON.stringify(idx));
})