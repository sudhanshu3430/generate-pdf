const fs = require('fs');
const { PDFDocument } = require('pdf-lib');

async function fillPdfTemplate(templatePath, outputPath, formData) {
  // Load the existing PDF template
  const templateBytes = fs.readFileSync(templatePath);
  const pdfDoc = await PDFDocument.load(templateBytes);

  // Get the form from the template PDF
  const form = pdfDoc.getForm();

  // Fill the form fields with data
  for (const [fieldName, value] of Object.entries(formData)) {
    const field = form.getTextField(fieldName);
    field.setText(value);  // Set the text for each form field
  }

  // Serialize the PDF to bytes
  const pdfBytes = await pdfDoc.save();

  // Save the filled PDF to the file system
  fs.writeFileSync(outputPath, pdfBytes);

  console.log('PDF created successfully!');
}

// Example usage
const templatePath = 'template1.pdf';  // Path to the PDF template
const outputPath = 'filled_output.pdf'; // Path to save the filled PDF
const formData = {
    'Business Name 02': 'John Doe',
    "Due Date": "12/11/2024",
    "Date of issue": "13/11/2024",
    "Invoice No":"1234"
    

};

// Fill the template with data
fillPdfTemplate(templatePath, outputPath, formData);
