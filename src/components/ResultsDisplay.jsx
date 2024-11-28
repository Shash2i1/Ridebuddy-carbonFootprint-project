import React, { useState } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import fileDownload from "js-file-download";
import "jspdf-autotable";


const ResultsDisplay = ({ results, cumulativeData }) => {
  const [showShareModal, setShowShareModal] = useState(false);

  if (!results) return null;

  // Generate PDF with chart and results
  const generatePDF = async () => {
    const pdf = new jsPDF();

  // Gradient Text for "RideBuddy"
  pdf.setFontSize(20);
  pdf.setFont("helvetica", "bold"); // Make the font bold

  // Split "RideBuddy" into parts for gradient-like effect
  const gradientText = ["Ride", "Buddy"];
  const colors = ["#7F40F3", "#964DDF", "#B55EC6", "#DC74A7"]; // Gradient colors
  let xPosition = 10;

  gradientText.forEach((part, index) => {
    pdf.setTextColor(colors[index % colors.length]);
    pdf.text(part, xPosition, 10);
    xPosition += pdf.getTextWidth(part) + 2; // Adjust spacing
  });

  // Centering "Carbon Footprint Results"
  const title = "Carbon Footprint Results";
  const pageWidth = pdf.internal.pageSize.width;
  const titleWidth = pdf.getTextWidth(title);
  const titleX = (pageWidth - titleWidth) / 2; // Center the title horizontally
  pdf.setFontSize(16);
  pdf.setTextColor(0, 0, 0); // Set black color for the result title
  pdf.text(title, titleX, 25); // Set the title at the calculated X position

  // Display results in a table format
  const resultsTable = [
    ["Metric", "Value"],
    ["Carbon Savings", `${results.savings.toFixed(2)} g`],
    ["Total Emissions", `${results.totalEmissions.toFixed(2)} g`],
  ];

  pdf.autoTable({
    startY: 30, // Starting position for the table
    head: [resultsTable[0]], // The header row
    body: resultsTable.slice(1), // The body rows
    theme: 'grid',
    styles: {
      fontSize: 12,
      cellPadding: 5,
      halign: 'center', // Horizontally align cells to center
    },
    columnStyles: {
      0: { halign: 'left' }, // Align first column (Metric) to the left
      1: { halign: 'right' }, // Align second column (Value) to the right
    },
  });

  // Capture the chart as an image and add it to the PDF
  const chartElement = document.querySelector(".charts-section");
  const canvas = await html2canvas(chartElement);
  const chartImage = canvas.toDataURL("image/png");

  pdf.addImage(chartImage, "PNG", 10, pdf.lastAutoTable.finalY + 10, 150, 130);

  // Add the environmental quote at the bottom
  const quote = "“We do not inherit the earth from our ancestors, we borrow it from our children.";
  pdf.setTextColor(0, 128, 0); // Green color for the quote
  pdf.setFontSize(10);
  pdf.text(quote, 10, pdf.internal.pageSize.height - 40);

  // Add "Thank You" message with custom color
  const thankYouMessage = "Thank you for using RideBuddy!";
  pdf.setTextColor("#7A3DF7"); // Set text color for "Thank You" message
  pdf.setFontSize(12);
  pdf.text(thankYouMessage, 10, pdf.internal.pageSize.height - 20);
  pdf.text("created by shashank", 5, pdf.internal.pageSize.height - 10);

  // Save the PDF
  pdf.save("carbon_results.pdf");
  };

  const handleShare = (platform) => {
    generatePDF().then(() => {
      
      if (platform === "WhatsApp") {
        window.open("https://wa.me/?text=Check%20out%20my%20RideBuddy%20Carbon%20Tracker%20results:%20carbon_results.pdf", "_blank");
      } else if (platform === "Facebook") {
        window.open("https://www.facebook.com/sharer/sharer.php?u=YOUR_URL", "_blank");
      } else if (platform === "Instagram") {
        alert("Instagram does not support direct file sharing. Please share manually.");
      }
    });
  };

  const handleDownload = () => {
    generatePDF();
  };

  return (
    <div className="p-4 bg-green-100 shadow-md rounded-md mt-4 dark:bg-gray-800">
      <h2 className="text-lg font-bold dark:text-white">Results</h2>
      <p className="dark:text-white"><strong>Carbon Savings:</strong> {results.savings.toFixed(2)} g</p>
      <p className="dark:text-white"><strong>Total Emissions:</strong> {results.totalEmissions.toFixed(2)} g</p>
      <div className="flex justify-between mt-4">
        <button onClick={handleDownload} className="bg-gradient-to-r from-[#7F40F3] via-[#964DDF] to-[#DC74A7] text-white px-4 py-2 rounded">
          Download PDF
        </button>
        <button
          onClick={() => setShowShareModal(true)}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Share
        </button>
      </div>

      {showShareModal && (
        <div className="modal fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="modal-content bg-white p-6 rounded-lg shadow-lg dark:bg-gray-800">
            <h3 className="text-lg font-bold mb-4 dark:text-white">Share Your Results</h3>
            <div className="flex flex-wrap justify-start gap-4">
              <button
                onClick={() => handleShare("WhatsApp")}
                className="bg-green-500 text-white px-4 py-2 rounded md:w-32"
              >
                WhatsApp
              </button>
              <button
                onClick={() => handleShare("Facebook")}
                className="bg-blue-500 text-white px-4 py-2 rounded md:w-32"
              >
                Facebook
              </button>
              <button
                onClick={() => handleShare("Instagram")}
                className="bg-pink-500 text-white px-4 py-2 rounded md:w-32"
              >
                Instagram
              </button>
            </div>
            <button
              onClick={() => setShowShareModal(false)}
              className="mt-4 text-red-500 underline"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResultsDisplay;
