const contextMenuItem = {
    id: "wikit",
    title: "Search with Wikit",
    contexts: [ "selection" ]
};

chrome.contextMenus.create(contextMenuItem);

chrome.contextMenus.onClicked.addListener(data => {
    const fixedEncodeURI = str => encodeURI(str).replace(/%5B/g, "[").replace(/%5B/g, "]");

    if (data.menuItemId === "wikit" && data.selectionText) {
        const wikiUrl = `https://en.wikipedia.org/wiki/${fixedEncodeURI(data.selectionText)}`;
        const createData = {
            url: wikiUrl,
            type: "popup",
            top: 5,
            left: 5,
            width: screen.availWidth / 2,
            height: screen.availHeight / 2
        };
        chrome.windows.create(createData);
    }
});