// Download Zillow Results

// Display icon when on the Zillow Results page
chrome.runtime.onInstalled.addListener(function() {
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
    chrome.declarativeContent.onPageChanged.addRules([
      {
        conditions: [
          new chrome.declarativeContent.PageStateMatcher({
            pageUrl: { urlContains: 'homes' },
//            css: [".app-view-closedDetail"]
          })
        ],
        actions: [ new chrome.declarativeContent.ShowPageAction() ]
      }
    ]);
  });
});

function downloadURI(uri, name) {
  var link = document.createElement("a");
  link.download = name;
  link.href = uri;
  link.click();
}

function downloadResults(results) {
  downloadURI(
  	'data:text/csv;charset=utf-8;base64,' + window.btoa(results),
  	"zillow-results.csv"
  );
}

chrome.pageAction.onClicked.addListener(function(tab) {
  chrome.tabs.sendMessage(tab.id, { text: "send_results" }, downloadResults);
});
