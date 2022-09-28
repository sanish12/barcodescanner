function onScanSuccess(decodedText, decodedResult) {
    console.log(`Code scanned = ${decodedText}`, decodedResult);
    document.getElementById('message').textContent = decodedText;
}
var html5QrcodeScanner = new Html5QrcodeScanner(
	"qr-reader", { fps: 10, qrbox: 250 });
html5QrcodeScanner.render(onScanSuccess);

// check compatibility
if (!("BarcodeDetector" in window)) {
    console.log("Barcode Detector is not supported by this browser.");
    document.getElementById('message').textContent = "Not Working";
  } else {
    console.log("Barcode Detector supported!");
  
    // create new detector
    const barcodeDetector = new BarcodeDetector({
      formats: ["code_39", "codabar", "ean_13"],
    });

    BarcodeDetector.getSupportedFormats().then((supportedFormats) => {

      var supported_formats = [];
      supportedFormats.forEach((format) => supported_formats.push(format));
    });
    document.getElementById('message').textContent = supported_formats;
  }
  // check supported types
