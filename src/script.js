document.addEventListener('DOMContentLoaded', function() {
    const canvas = document.getElementById('drawingCanvas');
    const ctx = canvas.getContext('2d');
    let drawing = false;

    canvas.addEventListener('mousedown', function(e) {
        drawing = true;
        ctx.beginPath();
        ctx.moveTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
    });

    canvas.addEventListener('mousemove', function(e) {
        if (drawing) {
            ctx.lineTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
            ctx.stroke();
        }
    });

    canvas.addEventListener('mouseup', function() {
        drawing = false;
        ctx.closePath();
    });

    document.getElementById('clearCanvas').addEventListener('click', function() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    });

    document.getElementById('convertToLaTeX').addEventListener('click', function() {
        // Convert the canvas to an image
        const imageData = canvas.toDataURL('image/png');
        // Use Tesseract.js to recognize text in the image
        Tesseract.recognize(
            imageData,
            'eng',
            { logger: m => console.log(m) }
        ).then(({ data: { text } }) => {
            // Convert the recognized text to LaTeX using MathLive
            const latex = MathLive.latexToMarkup(text, 'math');
            document.getElementById('latexOutput').textContent = latex;
            document.getElementById('latexCode').textContent = text;
        });
    });
});
