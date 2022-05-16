
import jsPDF from "jspdf";
import "jspdf-autotable";
import { format } from "date-fns";

const generatePDF = tickets =>{

    const doc = new jsPDF()
    const tableColumn = ["Name","Category", "Location","Desc","Created" ];
    const tableRows = [];


      // for each ticket pass all its data into an array
  tickets.forEach(profile => {
    const profileData = [
      profile.companyName,
      profile.category,
      profile.location,
      profile.description,
  
      format(new Date(profile.createdAt), "yyyy-MM-dd")
    ];
    // push each tickcet's info into a row
    tableRows.push(profileData);
  });

      // startY is margin-top
  doc.autoTable(tableColumn, tableRows, { startY: 20 });
  const date = Date().split(" ");
  // we use a date string to generate our filename.s
  const dateStr = date[0] + date[1] + date[2] + date[3] + date[4];
  // ticket title. and margin-top + margin-left
  doc.text("Categories registered within the last one month.", 14, 15);
  // we define the name of our PDF file.
  doc.save(`report_${dateStr}.pdf`);

}

export default generatePDF;

