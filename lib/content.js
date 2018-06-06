// XXX: THIS
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
 if(sender.id == chrome.runtime.id && request.message == "AHNMO_DETECTED") {
   console.log("IS511-DETECTED");
 }
});
