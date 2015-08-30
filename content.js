chrome.runtime.onMessage.addListener(function(msg, sender, sendResponse) {
  if (msg.text && (msg.text == "send_results")) {
    var csv = '"Address","Beds","Baths","Sqft","Price","Sold","Built","Lot"\n';
    var x = document.getElementsByClassName("property-listing");
    var price, rooms, beds, baths, sqft, address, sold, built, lot;
    for (i = 0; i < x.length; i++) { 
        price = getText(x[i],".listing-type").split(" ");
        rooms = getText(x[i],".beds-baths-sqft").split("•");
        if (rooms.length == 3) {
          beds = rooms[0].trim().split(" ");
          baths = rooms[1].trim().split(" ");
          sqft = rooms[2].trim().split(" ");
        } else {
          beds = "-";
          baths = "-";
          sqft = rooms[1].trim().split(" ");
        }
        address = getText(x[i],".property-address > a");
        sold = getText(x[i],".sold-date").split(" ");
        built = getText(x[i],".built-year").split(" ");
        lot = getText(x[i],".lot-size").split(" ");
        csv += '"' + address + '","' + beds[0] + '","' + baths[0] + '","' + sqft[0];
        csv += '","' + price[1] + '","' + sold[2];
        csv += '","' + built[3];
        csv += '","' + lot[2];
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
