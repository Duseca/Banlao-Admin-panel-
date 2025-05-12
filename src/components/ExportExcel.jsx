import React from 'react';
import { RxDownload } from 'react-icons/rx';
import FileSaver from 'file-saver';
import * as XLSX from 'xlsx';

// export const timeStampToDate = (timestamp) => {
//   const milliseconds =
//     timestamp.seconds * 1000 + timestamp.nanoseconds / 1000000;
//   const date = new Date(milliseconds);
//   return date.toLocaleString();
// };

const flattenData = (data) => {
  return data.map((item) => {
    const flattenedItem = {};

    // Recursive function to handle nested objects
    const flattenObject = (obj, prefix = '') => {
      for (const [key, value] of Object.entries(obj)) {
        const newKey = prefix ? `${prefix}.${key}` : key;
        if (value && typeof value === 'object' && !Array.isArray(value)) {
          // if (value.seconds && value.nanoseconds) {
          //   // Convert Firebase timestamp to formatted date and time
          //   flattenedItem[newKey] = timeStampToDate(value);
          // } else {
          flattenObject(value, newKey); // Recursively flatten other objects
          // }
        } else if (Array.isArray(value)) {
          flattenedItem[newKey] = value.join(', '); // Join array elements into a single string
        } else {
          flattenedItem[newKey] = value;
        }
      }
    };

    flattenObject(item);
    return flattenedItem;
  });
};

export default function ExportExcel({ apiData, fileName }) {
  const fileType =
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
  const fileExtension = '.xlsx';

  const exportToCSV = (data, fileName) => {
    const flattenedData = flattenData(data);
    const ws = XLSX.utils.json_to_sheet(flattenedData);
    const wb = { Sheets: { data: ws }, SheetNames: ['data'] };
    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const excelData = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(excelData, fileName + fileExtension);
  };

  return (
    <div>
      <button
        onClick={(e) => exportToCSV(apiData, fileName)}
        className='px-5 py-2 border text-xs rounded-md flex items-center gap-1 outline-none focus:ring-2 hover:border-blue-500'
      >
        <RxDownload />
        Download.csv
      </button>
    </div>
  );
}
