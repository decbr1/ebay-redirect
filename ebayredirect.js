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
        if (sessionStorage.getItem("ebayredirect_declined")) return;

        if (confirm("from ebayredirect extension\n\nyou are on ebay.com!\nclick 'okay' to redirect to ebay.co.uk\nclick 'cancel' to stay on ebay.com")) {
            window.location.replace("https://ebay.co.uk/" + window.location.href.split("ebay.com/")[1]);
        } else {
            sessionStorage.setItem("ebayredirect_declined", "true");
        }
    });
}

if (document.getElementById("toggle")) {
    runPopup();
} else {
    runContentScript();
}