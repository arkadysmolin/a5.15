const dataURL = "https://api.myjson.com/bins/jcmhn";
const propuskName = [ /* нзавния переменных - пропусков*/
	"var1",
	"var2",
	"var3",
	"var4",
	"var5",
	"var6",
	"speach"
]



function getFormValues(){ /* объект со списком названий переменных и значений из полей формы*/
	let skazkaInputs={};

	propuskName.forEach(function(inputNo){
		skazkaInputs[inputNo]=$("input[name=" + inputNo + "]")[0].value
	});
	console.log(skazkaInputs);
	return skazkaInputs; /* объект со списком названий переменных и значений полей формы*/

}


function handleButton() {
	$.getJSON(dataURL,handleData); /* берем jSON по ссылке, отправляем его в функцию handleData*/
	$("form").hide(); /* скрываем форму после нажатия на кнопку*/
}
	


function handleData(skazka){ /* то, что получили из jSON сохранили в skazka*/
	let textskazki="";

	let skazkaInputs=getFormValues(); /* объект со списком названий переменных и значений полей формы*/

	skazka["text"].forEach(function(otrivok){ /* в каждом отрывке сказки */
		for (key in skazkaInputs) {
			otrivok = otrivok.replace("{"+key+"}", skazkaInputs[key]); /* в каждом отрывке заменяем названия переменных, значениями из списка полей формы */
		console.log(otrivok);
		}
		textskazki=textskazki+otrivok+ "</br>" ;
		});

	$("div#result").html(textskazki);
}


function init() {
	$("#button-fetch").click(handleButton);
}

$(document).ready(init);
