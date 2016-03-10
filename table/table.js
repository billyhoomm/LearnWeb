window.onload = function(){
	scripeTables();
	displayAbbreviations();
}
function scripeTables(){
	if (!document.getElementsByTagName) return false;
	var tables = document.getElementsByTagName("table");
	for (var i=0; i<tables.length; i++){
		var odd = false;
		var rows = tables[i].getElementsByTagName("tr");
		for (var j=0; j<rows.length; j++){
			if (odd == true){
				rows[j].style.backgroundColor = "#ffc";
				odd = false;
			}else {odd = true;}
		}
	}//遍历所有的table和每个table里的tr元素，再改变每个tr的背景颜色
}
function displayAbbreviations(){
	if(!document.getElementsByTagName || !document.createElement || !document.createTextNode) 
	return false;
	var abbreviations = document.getElementsByTagName("abbr");//get所有的abbr元素
	if(abbreviations.length<1) return false;
	var defs = new Array();
	for(var i=0; i<abbreviations.length; i++){
		var current_abbr = abbreviations[i];
		if(current_abbr.childNodes.length<1) continue;
		var definition = current_abbr.getAttribute("title");
		var key = current_abbr.lastChild.nodeValue;
		defs[key] = definition;
	}//遍历abbr元素并将每一个definition存入到数组defs，数组下标均为key
		var dlist = document.createElement("dl");//建立dlist
		for(key in defs){
			var dtitle = document.createElement("dt");
			var dtitle_text = document.createTextNode(key);
			dtitle.appendChild(dtitle_text);
			var ddesc = document.createElement("dd");
			var ddesc_text = document.createTextNode(definition);
			ddesc.appendChild(ddesc_text);
			dlist.appendChild(dtitle);
			dtitle.appendChild(ddesc);
		}//遍历所有的definition并建立dt存放key，建立dd再用dt存放dd然后用dd存放definition
		if (dlist.childNodes.length<1) return false;
		var header = document.createElement("h2");//建立h2

		var header_text = document.createTextNode("abbreviations");
		header.appendChild(header_text);//为h2建立标题
		document.body.appendChild(header);//在body下建立h2
		document.body.appendChild(dlist);//在body下建立dlist
		header.style.marginLeft = "44%";
		dlist.style.marginLeft = "44%";
		
}