var js = document.createElement("script");
js.src="http://code.jquery.com/jquery-3.2.1.slim.min.js";
document.body.appendChild(js);

js.onload = function(){
	var tr = $("body").children("table").children("tbody").children("tr");

	var data = [];

	tr.each(function(){
		var td = $(this).children("td");
		data.push({
			name:td.eq(0).text(),
			sex:td.eq(1).text(),
			dw:td.eq(2).text(),
			zc:td.eq(3).text(),
			ks:td.eq(4).text(),
			icon:td.eq(5).find("img").attr("src"),
			info:td.eq(6).text(),
			tc:td.eq(7).text(),
			no:td.eq(8).text(),
			idNo:td.eq(9).text(),
			phone:td.eq(10).text()
		})
	});
	var str = JSON.stringify(data);
	str = '<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"></head><body>'+str+"</body></html>"

	var blob = new Blob([str],{type:"text/html"});
	var src= window.URL.createObjectURL(blob);
	window.open(src);
}