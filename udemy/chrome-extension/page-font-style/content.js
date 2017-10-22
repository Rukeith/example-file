chrome.runtime.sendMessage({ todo: "showPageAction" });

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.todo == "changeColor") {
        const fontColor = "#" + request.clickedColor;
        $(".api").css("color", fontColor);
    }
});