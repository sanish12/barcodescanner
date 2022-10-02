/**
 * 
 *    USE THE MEDIA API TO GET AN IMAGE AND FIND BARCODE
 * 
 */
var streamBarcode = document.getElementById('startStream');
streamBarcode.addEventListener('click', function () {
  document.getElementById('fileStream').style.display = 'none';
  Quagga.init({
    inputStream: {
      name: "Live",
      type: "LiveStream",
      // target: document.querySelector('#interactive_kings')    // Or '#yourElement' (optional)
    },
    decoder: {
      readers: ["code_128_reader", "ean_reader", "ean_8_reader", "upc_reader",
        "upc_e_reader",]
    },
    debug: {
      drawBoundingBox: false,
      showFrequency: false,
      drawScanline: false,
      showPattern: false
    },
    multiple: false,
    locate: true,
  }, function (err) {
    if (err) {
      console.log(err);
      return
    }
    console.log("Initialization finished. Ready to start");
    Quagga.start();
  });

  // Make sure, QuaggaJS draws frames an lines around possible 
	// barcodes on the live stream
	Quagga.onProcessed(function(result) {
		var drawingCtx = Quagga.canvas.ctx.overlay,
			drawingCanvas = Quagga.canvas.dom.overlay;
 
		if (result) {
			if (result.boxes) {
				drawingCtx.clearRect(0, 0, parseInt(drawingCanvas.getAttribute("width")), parseInt(drawingCanvas.getAttribute("height")));
				result.boxes.filter(function (box) {
					return box !== result.box;
				}).forEach(function (box) {
					Quagga.ImageDebug.drawPath(box, {x: 0, y: 1}, drawingCtx, {color: "green", lineWidth: 2});
				});
			}
 
			if (result.box) {
				Quagga.ImageDebug.drawPath(result.box, {x: 0, y: 1}, drawingCtx, {color: "#00F", lineWidth: 2});
			}
 
			if (result.codeResult && result.codeResult.code) {
				Quagga.ImageDebug.drawPath(result.line, {x: 'x', y: 'y'}, drawingCtx, {color: 'red', lineWidth: 3});
			}
		}
	});

  Quagga.onDetected(function (result) {
    document.getElementById('message').innerHTML = result.codeResult.code;
    console.log('barcode detected');
    console.log(result);
  })

});

document.getElementById('endStream').addEventListener('click', function(){
  Quagga.stop();
})

/**
 * 
 *   USE UPLOADED FILE TO SCAN FOR BARCODE
 * 
 */
var imageForScanning = document.getElementById('imageBarcode');
imageForScanning.addEventListener('change', function (e) {
  var image = document.getElementById('output');
  image.src = URL.createObjectURL(e.target.files[0]);
  Quagga.decodeSingle({
    decoder: {
      readers: [ "ean_reader", "ean_8_reader", "code_39_reader", "code_39_vin_reader", "codabar_reader", "upc_reader",
        "upc_e_reader",
      ] // List of active readers
    },
    locate: true, // try to locate the barcode in the image
    src: image.src // or 'data:image/jpg;base64,' + data
  }, function (result) {
    if (result) {
      console.log("result", result.codeResult);
      document.getElementById('message').textContent = result.codeResult.code;
      // document.getElementById('output').style.display = 'none';
    } else {
      console.log("not detected");
    }
  });

})