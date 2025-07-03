# Korai Health Lab Report Parser

## 🚀 Features
- Upload PDF or image files
- OCR text extraction using Tesseract.js
- PDF parsing with pdfjs
- Structured parsing of health parameters, values, units, and reference ranges
- Responsive table to display extracted data

## 🛠️ Tech Stack
- React
- Tesseract.js (OCR)
- pdfjs-dist (PDF to image conversion)
- Bootstrap (styling)

## 🔨 Installation & Running Locally
1. Clone the repository:
   ```
   git clone https://github.com/[your-username]/lab-report-app.git
   cd lab-report-app
   ```
2. Install dependencies
  ```
  npm install
  ```
3. Start the development server:
  ```
  npm start
  ```
4. Open ```http://localhost:3000``` in your browser

## Current Limitations
- OCR results depend heavily on report quality and formatting.
- Edge cases (e.g., unusual report layouts) may not parse perfectly.
- No authentication or storage of user data.

