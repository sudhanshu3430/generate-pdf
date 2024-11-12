const fs = require('fs');
const PDFDocument = require('pdfkit');

// Function to convert an array of images to PDF
function imagesToPdf(imagePaths, outputPath) {
    const doc = new PDFDocument();

    // Pipe the output to a file
    doc.pipe(fs.createWriteStream(outputPath));

    // Loop through all the images
    imagePaths.forEach((imagePath, index) => {
        // Add a new page for each image
        if (index > 0) {
            doc.addPage();
        }

        // Add image to the current page
        doc.image(imagePath, {
            fit: [doc.page.width, doc.page.height],  // Fit image to the page size
            align: 'center',                         // Align in center
            valign: 'center'                         // Align vertically in center
        });
    });

    // Finalize the PDF document
    doc.end();
}

// Example usage: provide an array of image file paths and output PDF file path
const imagePaths = [
    'image1.jpg', // Path to first image
    'image2.jpg', // Path to second image

];
const outputPath = 'output.pdf';

// Convert images to PDF
imagesToPdf(imagePaths, outputPath);

console.log("PDF created successfully!");
