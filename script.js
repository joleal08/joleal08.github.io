// script.js file

function domReady(fn) {
    if (
        document.readyState === "complete" ||
        document.readyState === "interactive"
    ) {
        setTimeout(fn, 1000);
    } else {
        document.addEventListener("DOMContentLoaded", fn);
    }
}

domReady(function () {

    // If found you qr code
    function onScanSuccess(decodeText, decodeResult) {
        // Show a loading indicator or a message
        console.log("Scanning QR Code...");
    
        // Build the request URL with the scanned ID
        const endpoint = "https://script.google.com/macros/s/AKfycbzhhO6MppMwia8vBcJ8LQPKtL74sWW5QEiTmuhPzPcpmXbesQgY4NkGZT4xii15R9nS/exec";
        const requestUrl = `${endpoint}?id=${encodeURIComponent(decodeText)}`;
    
        // Make the API call
        fetch(requestUrl)
            .then(response => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.text(); // Assuming the response is plain text
            })
            .then(data => {
                // Display the response to the user
                alert(data);
            })
            .catch(error => {
                console.error("There was a problem with the fetch operation:", error);
                alert("Error processing the QR Code. Please try again.");
            });
    }

    let htmlscanner = new Html5QrcodeScanner(
        "my-qr-reader",
        { fps: 10, qrbos: 250 }
    );
    htmlscanner.render(onScanSuccess);
});

