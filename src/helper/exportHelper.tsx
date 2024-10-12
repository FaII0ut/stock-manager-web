import * as XLSX from "xlsx";

export const exportToExcel = (jsonData: any[], fileName: string) => {
  // Convert the JSON data to a worksheet
  const worksheet = XLSX.utils.json_to_sheet(jsonData);

  // Create a new workbook and add the worksheet to it
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

  // Generate and download the Excel file
  XLSX.writeFile(workbook, `${fileName}.xlsx`);
};
