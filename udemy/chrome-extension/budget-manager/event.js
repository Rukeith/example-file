const contextMenuItem = {
    id: "spendMoney",
    title: "SpendMoney",
    contexts: [ "selection" ]
};

chrome.contextMenus.create(contextMenuItem);

chrome.contextMenus.onClicked.addListener(data => {
    const isInt = value => !isNaN(value) && parseInt(Number(value)) == value && !isNaN(parseInt(value, 10));

    if (data.menuItemId === "spendMoney" && data.selectionText) {
        if (isInt(data.selectionText)) {
            chrome.storage.sync.get([ "total", "limit" ], budget => {
                let newTotal = (budget.total) ? parseInt(budget.total) : 0;
                newTotal += parseInt(data.selectionText);
                chrome.storage.sync.set({ total: newTotal }, () => {
                    if (newTotal >= budget.limit) {
                        const notifyOptions = {
                            type: "basic",
                            iconUrl: "icon48.png",
                            title: "Limit reached!",
                            message: "Uh oh! Reached limit!"
                        };
                        chrome.notifications.create('limitNotify', notifyOptions);
                    }
                });
            });
        }
    }
});

chrome.storage.onChanged.addListener((changes, storageName) => chrome.browserAction.setBadgeText({ text: changes.total.newValue.toString() }));