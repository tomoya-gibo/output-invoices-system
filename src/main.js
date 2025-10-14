const invoices = require('../input/invoices.json');
const plays = require('../input/plays.json');

function main() {	
	let company = invoices[0].customer;
	let playTitle = invoices[0].performances[1].playID;
	console.log(`${company} : ${playTitle}`);
	console.log(plays['as-like']);
}

main();