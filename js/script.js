calendarInit();
function calendarInit() {
	var date = new Date();
	var month = date.getMonth();
	var year = date.getFullYear(); 

	var backButton = document.querySelector("#back");
	var forwardButton = document.querySelector("#forward");

	calendar(date);
	// функция перелистывает на одни месяц назад
	backButton.addEventListener("click", function() {
		if (month == 0) {
			date.setFullYear(year -= 1);
			date.setMonth(month = 11);
		} else {
			date.setMonth(month -= 1);
		};
		calendar(date);
		resetList();
		starCheck();
	});
	// функция проверяет надо ставить звездочку или нет при прокручивании месяцев
	function starCheck() {
		var atribute = document.querySelectorAll("[data-month]");
		
		for (var i = 0; i < atribute.length; i++) {
			for (var num in obj ) {
				if (atribute[i].dataset.month == obj[num]["date"]) {
					if (atribute[i].textContent.substr(-1, 1) != "*") {
						atribute[i].innerHTML += "<sup>*</sup>";
					};
				};
			};
		};
	}
	// функция перелистывает на одни месяц вперед
	forwardButton.addEventListener("click", function() {
		if (month == 11) {
			date.setFullYear(year += 1);
			date.setMonth(month = 0);
		} else {
			date.setMonth(month += 1);
		};
		calendar(date);
		resetList();
		starCheck();
	});
};

function resetList() {
	var ul = document.querySelector("ul");
	var add = document.querySelector("#add");
	
	ul.innerHTML = "";
	add.innerHTML = "";
};

function calendar(elemDate) {
	var table = document.querySelector("table");
	var days = daysMonth(elemDate);
	var arr = createArrDay(days);
	
	var firstLengt = addDayFirstMonth(elemDate);
	var lastLengt = addDayLastMonth(elemDate);
	
	monthYear(elemDate);
	year(elemDate);
	
	addFirstArr(arr, firstLengt);
	addLastArr(arr, lastLengt);
	createTable(arr, table, elemDate);
};

function year(dateElem) {
	var year = dateElem.getFullYear();
	var span = document.querySelector(".year");
	span.innerHTML = year;
};

function monthYear(dateElem) {
	var month = dateElem.getMonth();
	var span = document.querySelector(".month");
	
	var arr = [
		"янв", "фев", "мар", "апр",
		"май", "июн", "июл", "авг",
		"сен", "окт", "ноя", "дек"
	];
	
	for (var i = 0; i < arr.length; i++) {
		if (month == i) {
			span.innerHTML = arr[i];
		};
	};
};


function createTable(arrElem, tableElem, elemDate) {
	num = 0;
	tableElem.innerHTML = "";
	createTh(tableElem);
	
	for (var i = 0; i < arrElem.length / 7; i++) {
		var tr = document.createElement("tr");
		
		for (var j = num; j < num + 7; j++) {
			var td = document.createElement("td");
			td.innerHTML = arrElem[j];
			createAtribute(td, arrElem[j], elemDate); 
			
			td.addEventListener("click", function() {
				сheckList(this);
			});
			
			td.addEventListener("dblclick", function() {
				addTask(this);
			});
			
			tr.appendChild(td);
		}
		tableElem.appendChild(tr);
		num += 7;
	};
};

function createTh(tableElem) {
	var week = ["пн","вт","ср","чт","пт","сб","вс"];
	var tr = document.createElement("tr");
	
	for(var i = 0; i < week.length; i++) { 
		var th = document.createElement("th");
		th.innerHTML = week[i];
		tr.appendChild(th);
	};
	
	tableElem.appendChild(tr);
};

function daysMonth(dateElem) {
	var newDate = new Date(dateElem.getFullYear(), dateElem.getMonth() + 1, 0);
	
	return newDate.getDate();
};

function createArrDay(num) {
	var arr = [];
	
	for (var i = 1; i <= num; i++) {
		arr.push(i);
	};
	
	return arr;
};

function addFirstArr(arrElem, elemLeng) {
	for (var i = 0; i < elemLeng; i++) {
		arrElem.unshift(" ");
	};
	
	return arrElem;
};

function addLastArr(arrElem, elemLeng) {
	for (var i = 0; i < elemLeng; i++) {
		arrElem.push(" ");
	};
	
	return arrElem;
};

// функция считает сколько дней надо добавить в начало месяца
function addDayFirstMonth(elem) {
	var newDate = new Date(elem.getFullYear(), elem.getMonth(), 1);
	if(newDate.getDay() == 0) {
		return 6;
	} else {
		return newDate.getDay() - 1;
	};
};
// функция считает сколько дней надо добавить в конец месяца
function addDayLastMonth(elem) {
	var newDate = new Date(elem.getFullYear(), elem.getMonth() + 1, 0);
	
	if(newDate.getDay() != 0) {
		return 7 - newDate.getDay();
	};
};

function createAtribute(tdElem, numElem, elemDate) {
	var month = elemDate.getMonth();
	
	if (numElem != " ") {
		tdElem.dataset.month = numElem + "." + month;
	};
};

// функция при клике проверяет если у "td" список задач, если да то выдает этот список
function сheckList(tdElem) {
	var ul = document.querySelector("ul");
	var divAdd = document.querySelector("#add");
	
	divAdd.innerHTML = "";
	ul.innerHTML = "";
	
	for (var num in obj) {
		if(tdElem.dataset.month == obj[num]["date"]) {
			
		var li = document.createElement("li");
		li.dataset.numLi = tdElem.dataset.month + "." + num;
		obj[num]["numLi"] = li.dataset.numLi;
		
		if (obj[num]["checkedDone"] == true) {
			li.innerHTML = '<label class="active"><input type="checkbox" onclick="checkboxTest(this)" checked>' + obj[num]["text"] + '</label>' + '<span onclick="deletLi(this)"> X</span>';
			
		} else if (obj[num]["checkedDone"] == false) {
			li.innerHTML = '<label><input type="checkbox" onclick="checkboxTest(this)">' + obj[num]["text"] + '</label>' + '<span onclick="deletLi(this)"> X</span>';
		}
		
		ul.appendChild(li);
		};
	};
};

function checkboxTest(elemInput) {
	var num = elemInput.parentElement.parentElement.dataset.numLi;
	var numNew = Number(num.substr(-1, 1));
	
	if (elemInput.checked == true) {
		elemInput.parentElement.classList.toggle("active");
		obj[Number(numNew)]["checkedDone"] = true;
		
	} else if (elemInput.checked == false){
		elemInput.parentElement.classList.toggle("active");
		obj[Number(numNew)]["checkedDone"] = false;
	};
};



function addTask(elemTd) {
	if (elemTd.innerHTML != " ") {
		var divAdd = document.querySelector("#add");
		divAdd.innerHTML = "";
		
		var input = document.createElement("input");
		var button = createButton();
		
		input.dataset.date = elemTd.dataset.month; // добавляет тегу "input" атрибут тега "td" 
		
		button.addEventListener("click", function() {
			addObj(input);
			addLi(input);
			addStar(elemTd);
			
			input.value = "";
		});
		
		divAdd.appendChild(input);
		divAdd.appendChild(button);	
	};
};

var obj = [
		// {
			// text: 'первая задача',
			// done: false || true,
			// date: 14.2,
			// checkedDone: false
			// numLi: 14.2.1;
		// },
	];
	
function addObj(elemInput) {
	var task = {
		text: String(elemInput.value),
		done: false,
		date: elemInput.dataset.date,
		checkedDone: false
	};
	
	obj.push(task);
	// console.log(obj);
};

function addStar(elemTd){
	if (elemTd.textContent.substr(-1, 1) != "*") {
		elemTd.innerHTML += "<sup>*</sup>";
	};
};

function createButton() {
	var button = document.createElement("button");
	button.innerHTML = "кнопка";
	
	return button;
};

function addLi(elemInput) {
	for(var num in obj) {
		if (elemInput.dataset.date == obj[num]["date"]) {
			if (obj[num]["done"] == false) {
				createLi(num, obj[num]["date"]);
				obj[num]["done"] = true;
			};
		};
	};
};

function createLi(elemNum, numDataSet) {
	var ul = document.querySelector("ul"); 
	var li = document.createElement("li");
	
	li.dataset.numLi = numDataSet + "." + elemNum;  
	obj[elemNum]["numLi"] = li.dataset.numLi;
	// console.log(obj);
	li.innerHTML = '<label><input type="checkbox" onclick="checkboxTest(this)">' + obj[elemNum]["text"] + '</label>' + '<span onclick="deletLi(this)"> X</span>';
	
	ul.appendChild(li);
};

function deletLi(elemSpan) {
	elemSpan.parentElement.parentElement.removeChild(elemSpan.parentElement);
	// console.log(elemSpan);

	for(var i = 0; i < obj.length; i++) {
		var num = elemSpan.parentElement.dataset.numLi;
		if (num == obj[i]["numLi"]) {
			obj.splice(i, 1);
		};
	};
	// console.log(obj);
	
	var ul = document.querySelector("ul");
	ul.innerHTML = ""
	var li = document.createElement("li");
	var num1 = elemSpan.parentElement.dataset.numLi.split(".")[0] +"." + elemSpan.parentElement.dataset.numLi.split(".")[1];
	// console.log(num1);
	
	for(var num in obj) { 
		if (obj[num].date == num1) {
			// console.log("!");
			if(obj[num].checkedDone == true) {
				var li = document.createElement("li");
				li.dataset.numLi = obj[num]["date"] + "." + num;
				obj[num]["numLi"] = li.dataset.numLi;
		
				li.innerHTML = '<label class="active"><input type="checkbox" onclick="checkboxTest(this)" checked>' + obj[num]["text"] + '</label>' + '<span onclick="deletLi(this)"> X</span>';
				ul.appendChild(li);
			} else {
				var li = document.createElement("li");
				li.dataset.numLi = obj[num]["date"] + "." + num;
				obj[num]["numLi"] = li.dataset.numLi;
		
				li.innerHTML = '<label><input type="checkbox" onclick="checkboxTest(this)">' + obj[num]["text"] + '</label>' + '<span onclick="deletLi(this)"> X</span>';
				ul.appendChild(li);
			};
		};
	};
	
	deleteStar(elemSpan);
};

function deleteStar(elemSpan) {
	var num = elemSpan.parentElement.dataset.numLi.split(".")[0] +"." + elemSpan.parentElement.dataset.numLi.split(".")[1];
	
	var result = obj.find(function(elem) {
		return elem.date == num;
	});
	
	if (result == undefined) {
		var atribute = document.querySelectorAll("[data-month]");
		
		for (var i = 0; i < atribute.length; i++) {
			if (atribute[i].dataset.month == num) {
				// console.log(atribute[i]);
				atribute[i].removeChild(atribute[i].lastElementChild);
			};
		};
	};
};