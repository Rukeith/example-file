$(() => {
    chrome.storage.sync.get([ "total", "limit" ], budget => {
        const total = (budget.total) ? parseInt(budget.total) : 0;
        const limit = (budget.limit) ? parseInt(budget.limit) : "";
        $("#total").text(total);
        $("#limit").text(limit);
        chrome.browserAction.setBadgeText({ text: total.toString() });
    });

    $("#spendAmount").on("click", () => {
        chrome.storage.sync.get([ "total", "limit" ], budget => {
            let newTotal = (budget.total) ? parseInt(budget.total) : 0;
            let amount = $("#amount").val();
            if (amount) newTotal += parseInt(amount);

            chrome.storage.sync.set({ total: newTotal }, () => {
                if (amount && newTotal >= budget.limit) {
                    const notifyOptions = {
                        type: "basic",
                        iconUrl: "icon48.png",
                        title: "Limit reached!",
                        message: "Uh oh! Reached limit!"
                    };
                    chrome.notifications.create("limitNotify", notifyOptions);
                }
            });
            $("#total").text(newTotal);
            $("#amount").val("");
        });
    });
});