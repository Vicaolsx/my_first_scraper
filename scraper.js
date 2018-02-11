var fs = require('fs')
var csvString = require('csv-string')
var nightmare = require('nightmare')

function scrape() {
	var location = 'https://www.whatdotheyknow.com/body/newham_borough_council'
	var results = nightmare()
	.goto(location)
	.wait('body')
	.evaluate(extract)
	.end()
return results
}

function extract() {
	var text = document.querySelectorAll('.request_listing .head')
	var result = Array.from(text).map(element => {
		return [element.innerText]
	})
	return result
}

function run() {
	scrape().then(data => {
		var output = csvString.stringify(data)
		fs.appendFileSync('newham.csv', output)
	}).catch(console.log)
}

run()
