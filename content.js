chrome.runtime.onMessage.addListener(function(msg, sender, sendResponse) {
  if (msg.text && (msg.text == "send_results")) {
    var csv = '"Address","Beds","Baths","Sqft","Type","Price","Sold","Built","Lot"\n';
    var x = document.getElementsByClassName("property-listing");
    var price, rooms, beds, baths, sqft, address, sold, built, lot, type;
    for (i = 0; i < x.length; i++) { 
			type = "-";
			price = "-";
			sold = "-";
			if (x[i].querySelector(".zsg-icon-recently-sold")) { // Recently Sold
				type = "Recently Sold";  
				price = getText(x[i],".listing-type").split(" ")[1];
				sold = getText(x[i],".sold-date").split(" ")[2];
			} else if (x[i].querySelector(".zsg-icon-for-sale")) { // For Sale
				type = "For Sale";
				price = getText(x[i],".price-large");
			} else if (x[i].querySelector(".zsg-icon-for-rent")) { // For Rent
				type = "For Rent";
				price = getText(x[i],".price-large");
			} else if (x[i].querySelector(".zsg-icon-pre-market")) { // Pre-Market
				type = "Pre-Market";
				price = getText(x[i],".zestimate").split(" ")[2] + " Est.";
			}
			rooms = getText(x[i],".beds-baths-sqft").split("•");
			if (rooms.length == 3) {
				beds = rooms[0].trim().split(" ")[0];
				baths = rooms[1].trim().split(" ")[0];
				sqft = rooms[2].trim().split(" ")[0];
			} else {
				beds = "-";
				baths = "-";
				sqft = rooms[1].trim().split(" ")[0];
			}
			address = getText(x[i],".property-address > a");
			built = getText(x[i],".built-year").split(" ")[3];
			lot = getText(x[i],".lot-size").split(" ");
			csv += '"' + address + '","' + beds + '","' + baths + '","' + sqft;
			csv += '","' + type + '","' + price + '","' + sold;
			csv += '","' + built;
			csv += '","' + lot[2] + " " + lot[3];
			csv += '"\n';
		}
    sendResponse(csv);
  }
});

function getText(root, sel) {
  var elem = root.querySelector(sel);
  if (elem) return elem.innerText;
  return "- - - - - • - - - - - • - - - - - • - - - - - • ";
}
