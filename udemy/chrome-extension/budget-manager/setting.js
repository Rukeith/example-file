$(() => {
    chrome.storage.sync.get("limit", budget => {
        const limit = (budget.limit) ? parseInt(budget.limit) : "";
        $("#limit").val(limit);
    });

    $("#saveLimit").on("click", () => {
        let limit = $("#limit").val();
        if (limit) {
            chrome.storage.sync.set({ limit }, () => close());
        }
    });

    $("#resetTotal").on("click", () => {
        chrome.storage.sync.set({ total: 0 }, () => {
            const notifyOptions = {
                type: "basic",
                iconUrl: "icon48.png",
                title: "Total reset!",
                message: "Total has been reset to 0"
            };
            chrome.notifications.create("totalResetNotify", notifyOptions);
        });
    });
});