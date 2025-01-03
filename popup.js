const downloadBtn = document.getElementById('downloadBtn');
const toggle = document.getElementById('highlightToggle');

toggle.checked = (localStorage.getItem("isActive") == "true") || false;

toggle.addEventListener("change", () => {
    let value = toggle.checked;
    console.log(localStorage.getItem("isActive"));
    localStorage.setItem("isActive", value);

    // api - get chrome windows
    chrome.tabs.query({}, (tabs) => {
        for (const tab of tabs) {
            chrome.tabs.sendMessage(tab.id, {action: "toggle"});
        }
    })
})

downloadBtn.addEventListener("click", () => {
    console.log("clicked");
    chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
        console.log(tabs);
        chrome.tabs.sendMessage(tabs[0].id, {action: "download"});
    })
})
