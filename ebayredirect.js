function setIcon(enabled) {
    browser.action.setIcon({ path: enabled !== false ? "icons/uk48.png" : "icons/usa48.png" });
}

function runPopup() {
    const toggle = document.getElementById("toggle");

    browser.storage.local.get("enabled").then(({ enabled }) => {
        toggle.checked = enabled !== false; // default on
        setIcon(toggle.checked);
    });

    toggle.addEventListener("change", () => {
        browser.storage.local.set({ enabled: toggle.checked });
        setIcon(toggle.checked);
    });
}

function runContentScript() {
    browser.storage.local.get("enabled").then(({ enabled }) => {
        if (enabled === false) return;
        if (sessionStorage.getItem("ebayredirect_declined")) return;

        if (location.hostname !== "www.ebay.com") {
            alert("youre on " + location.hostname + " right now so you're probably signing in or something.\nwont redirect to be safe.");
            return;
        }

        const path = location.href.split("ebay.com/")[1] ?? "";
        if (confirm("from ebayredirect extension\n\nyou are on ebay.com!\nclick 'okay' to redirect to ebay.co.uk\nclick 'cancel' to stay on ebay.com")) {
            window.location.replace("https://ebay.co.uk/" + path);
        } else {
            sessionStorage.setItem("ebayredirect_declined", "true");
        }
    });
}

if (document.getElementById("toggle")) {
    runPopup(); // in the popup.html context
} else {
    runContentScript(); // on ebay
}