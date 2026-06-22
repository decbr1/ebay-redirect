function runPopup() {
    const toggle = document.getElementById("toggle");

    browser.storage.local.get("enabled").then(({ enabled }) => {
        toggle.checked = enabled !== false; // default on
    });

    toggle.addEventListener("change", () => {
        browser.storage.local.set({ enabled: toggle.checked });
    });
}

function runContentScript() {
    browser.storage.local.get("enabled").then(({ enabled }) => {
        if (enabled === false) return;
        window.location.replace("https://ebay.co.uk/" + window.location.href.split("ebay.com/")[1]);
    });
}

if (document.getElementById("toggle")) {
    runPopup();
} else {
    runContentScript();
}