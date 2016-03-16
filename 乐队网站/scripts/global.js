function insertAfter(newElement,targetElement) {
	var parent = targetElement.parentNode;
	if (parent.lastChild == targetElement){
		parent.appendChild(newElement);
	}
	else {
		parent.insertBefore(newElement, targetElement.nextSibling);
	}
}//insertAfter函数
function addClass(element, value){
	if(!element.className){
		element.className = value;
	}
	else{
		newClassName = element.className;
		newClassName+= " ";
		newClassName+= value;
		element.className = newClassName;
	}
}//添加类名
function highlight(){
	if(!document.getElementsByTagName) return false;
	if(!document.getElementById) return false;
	if(!document.getElementById("navigation")) return false;
	var nav = document.getElementById("navigation");
	var links = nav.getElementsByTagName("a");
	for(var i =0; i<links.length; i++){
		var linkurl = links[i].getAttribute("href");
		var currenturl = window.location.href;
		if (currenturl.indexOf(linkurl) != -1){
			links[i].className = "here";
			var linktext = links[i].lastChild.nodeValue.toLowerCase();
			document.body.setAttribute("id",linktext);/*为*当前*页面的Body元素建立一个
			ID属性（ID名是链接文本），用作CSS挂钩，方便布局。*/
		}
	}
}//判定当前页面URL是哪一个，并为其添加类名“here”，使其高亮。
window.onload = function(){
	highlight();
}
