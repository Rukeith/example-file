const contextMenuItem = {
    id: "speakIt",
    title: "SpeakIt",
    contexts: [ "selection" ]
};

chrome.contextMenus.create(contextMenuItem);

chrome.contextMenus.onClicked.addListener(data => {
    if (data.menuItemId === "speakIt" && data.selectionText) {
        chrome.tts.speak(data.selectionText, { rate: 0.7 });
    }
});