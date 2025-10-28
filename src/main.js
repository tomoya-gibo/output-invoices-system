const { totalmem } = require('os');
const invoices = require('../input/invoices.json');		//受注1
const invoices2 = require('../input/invoices2.json');	//受注2
const plays = require('../input/plays.json');
const fs = require("fs");

function main() {
	const performances = invoices[0].performances;		//受注1
	const performances2	= invoices2[0].performances;	//受注2
	let point = 0;				//ポイント
	let amount = 0;				//金額
	let totalAmount = 0;		//合計金額
	let resultData = "請求書\n\n株式会社ビッグカンパニー\n\n";		//出力用(txt)
	let resultHtml = "<h3>請求書</h3><h4>株式会社ビッグカンパニー</h4><ul>";	//出力用(html)
	const args = process.argv.slice(2);
	const arg = args[0];
	let diffAmount = 0;			//前回との金額の差
	let diffPoint = 0;			//前回とのポイントの差
	let exTotalAmount = 0;		//前回の合計金額
	let exPoint = 0;			//前回の獲得ポイント

	//前回分の金額計算
	for (const performance of performances) {
		amount = 0;
		if (plays[performance.playID].type === "tragedy") {			//悲劇の場合
			amount += 30000;
			if (performance.audience > 20) {
				let chouka = performance.audience - 20;	// 超過人数
				let shou = Math.floor(chouka / 5);
				let amari = chouka % 5;
				
				if (chouka <= 5) {
					amount += 10000 * chouka;
				} else {
					for (let i = 0; i < shou; i++) {
						amount += Math.floor(10000 * (0.9 ** i)) * 5;
					}
					amount += Math.floor(10000 * (0.9 ** shou)) * amari;
				}
			}
		} else if (plays[performance.playID].type === "comedy") {	//喜劇の場合
			amount += 30000;
			amount += performance.audience * 300;
			if (performance.audience > 20) {
				amount += 10000;
				amount += (performance.audience - 20) * 500;
			}
		} else if (plays[performance.playID].type === "tragic-comedy") {	//悲喜劇の場合
			amount += 30000;
			amount += performance.audience * 500;
		}
		exTotalAmount += amount;
	}	

	//前回分のポイント計算
	for (const performance of performances2) {
		if(plays[performance.playID].type === "tragic-comedy") {	//悲喜劇の場合
			exPoint += Math.max((performance.audience - 20), 0);
		} else if (performance.audience > 30) {						//悲劇・喜劇の両方
			exPoint += performance.audience - 30;
			if (plays[performance.playID].type === "comedy") {		//喜劇の場合加点あり
			exPoint += Math.floor(performance.audience / 5);
			}
		}
	}

	//今回分の金額計算
	for (const performance of performances2) {
		amount = 0;
		if (plays[performance.playID].type === "tragedy") {			//悲劇の場合
			amount += 30000;
			if (performance.audience > 20) {
				let chouka = performance.audience - 20;	// 超過人数
				let shou = Math.floor(chouka / 5);
				let amari = chouka % 5;
				
				if (chouka <= 5) {
					amount += 10000 * chouka;
				} else {
					for (let i = 0; i < shou; i++) {
						amount += Math.floor(10000 * (0.9 ** i)) * 5;
					}
					amount += Math.floor(10000 * (0.9 ** shou)) * amari;
				}
			}
		} else if (plays[performance.playID].type === "comedy") {	//喜劇の場合
			amount += 30000;
			amount += performance.audience * 300;
			if (performance.audience > 20) {
				amount += 10000;
				amount += (performance.audience - 20) * 500;
			}
		} else if (plays[performance.playID].type === "tragic-comedy") {	//悲喜劇の場合
			amount += 30000;
			amount += performance.audience * 500;
		}
		totalAmount += amount;
		resultData += `・${plays[performance.playID].name} (観客数:${performance.audience}人、金額:$${amount})\n`;
		resultHtml += `<li>${plays[performance.playID].name} (観客数:${performance.audience}人、金額:$${amount})</li><br>`;
	}	

	//今回分のポイント計算
	for (const performance of performances) {
		if(plays[performance.playID].type === "tragic-comedy") {	//悲喜劇の場合
			point += Math.max((performance.audience - 20), 0);
		} else if (performance.audience > 30) {						//悲劇・喜劇の両方
			point += performance.audience - 30;
			if (plays[performance.playID].type === "comedy") {		//喜劇の場合加点あり
			point += Math.floor(performance.audience / 5);
			}
		}
	}

	diffAmount = totalAmount - exTotalAmount;	//差額
	diffPoint = point - exPoint;				//ポイント差

	resultData += `\n合計金額：$${totalAmount}（前回比：$${diffAmount}）\n\n`;
    resultData += `獲得ポイント：${point}p（前回比：${diffPoint}pt）\n`;
	resultHtml += `</ul><p>合計金額：$${totalAmount}（前回比：$${diffAmount}）</p><p>獲得ポイント：${point}pt（前回比：${diffPoint}pt）</p>`;

	// ファイルへ書き込む
	console.log("arg:" + arg);
	if (arg === "txt") {
		fs.writeFileSync("../output/invoice.txt", resultData);
	} else if (arg === "html") {
		fs.writeFileSync("../output/invoice.html", resultHtml);
	} else {
		console.log("想定外の引数");
	}
}

main();