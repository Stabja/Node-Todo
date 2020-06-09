let fs = require('fs');
let path = require('path');


let jsonData = {
	Iliketorun: {
		title: "I like to run!",
		description: "Fanny pack vinyl put a bird on it. noA."
	},
	Crossfitiscool: {
		title: "Crossfit is cool",
		description: "Fanny pack vinyl put a bird on it. noB."
	},
	Swimmingisgreat: {
		title: "Swimming is great",
		description: "Fanny pack vinyl put a bird on it. noC."
  },
  Codingisfun: {
		title: "Coding is fun",
		description: "Data Structures & algoritms are fun to learn"
	}
};


let jsonContent = JSON.stringify(jsonData, null, 4);
let outputFile = path.join(__dirname, 'output.json');

fs.writeFile(outputFile, jsonContent, 'utf8', (err) => {
  if(err) {
    console.log("An error occured while writing JSON Object to File.");
    return console.log(err);
  }
  console.log("JSON file has been saved.");
});