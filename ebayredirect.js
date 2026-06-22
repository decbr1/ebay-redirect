const url = window.location.href

if (confirm("from ebayredirect extension\n\nyou are on ebay.com!\nclick 'okay' to redirect to ebay.co.uk\nclick 'cancel' to stay on ebay.com")) {
    window.location.replace("https://ebay.co.uk/" + url.split("ebay.com/")[1]);
} else {
    // pass
}

// todo remember for this session.