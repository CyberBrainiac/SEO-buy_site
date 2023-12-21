/*
materials:
  https://codesandbox.io/s/exceljs-export-react-forked-gnogg?file=/App.js:2887-2893
  https://zetcode.com/javascript/exceljs/
  https://www.codeproject.com/Tips/1251189/Excel-Export-from-Angular-2plus
  https://github.com/exceljs/exceljs
*/

import Excel from 'exceljs';
import saveAs from 'file-saver';
import { InputData, UrlArr } from '@/containers/reducers/inputDataSlice';
import { ExcelColumnInfoType } from '@/containers/reducers/toolsSlice';
import isURL from '@/utils/isURL';

interface InputExcelData {
  inputData: InputData[];
  excelColumnInfo: ExcelColumnInfoType | undefined;
}

interface WriteExtendExcelProps {
  inputData: InputData[];
  query?: string;
  excelColumnInfo: ExcelColumnInfoType;
  file: ArrayBuffer;
}

/**Used Static method to set object as value*/
class Data {
  static create(props: InputData) {
    return { id: props.id, url: props.url, totalPage: props.totalPage };
  }
}

/** READ Functions */

async function read(buffer: ArrayBuffer): Promise<UrlArr | undefined> {
  const workbook = new Excel.Workbook();
  await workbook.xlsx.load(buffer);
  const worksheet = workbook.getWorksheet(1);
  const urls: UrlArr = [];

  const urlColumn = worksheet.getColumn(1);
  const columnValues = urlColumn.values;

  if (!columnValues.length) {
    alert('Provide urls in first column, check Example.xlsx');
    return undefined;
  }

  for (const value of columnValues) {
    if (value === null) {
      continue;
    }

    //case for url object
    if (typeof value === 'object' && 'hyperlink' in value) {
      urls.push(value.hyperlink);
    } else {
      const url = String(value);

      if (!isURL(url)) continue;
      urls.push(url);
    }
  }

  if (!urls.length) {
    alert(
      'Provided data isn`t url, check that your url in first column and every url store in different cell'
    );
  }
  return urls;
}

//can read default url and determine index of columns from ExcelColumnInfoType
async function readWithExcelColumnInfo(buffer: ArrayBuffer): Promise<InputExcelData | undefined> {
  const workbook = new Excel.Workbook();
  await workbook.xlsx.load(buffer);
  const worksheet = workbook.getWorksheet('Site Data');

  if (!worksheet) {
    alert(
      "In extend use of Index Thematicity, you must provide Excel Tab with name: 'Site Data'\n\rCheck Extend Example.xlsx"
    );
    return undefined;
  }

  const inputData = [];
  let urlColumnIndex = 0; //need
  let thematicityColumnIndex = 0; //need
  let totalPageColumnIndex: number | undefined;

  const headerRow = worksheet.getRow(1);

  if (!headerRow.values.length) {
    alert(
      `In extend use of Index Thematicity, First worksheet row must contain column headers\n\rCheck Extend Example.xlsx`
    );
    return undefined;
  }
  headerRow.eachCell((cell, colNumber) => {
    const value = cell.value?.toString().toLowerCase();
    if (value === 'site url') urlColumnIndex = colNumber;
    else if (value === 'thematicity index') thematicityColumnIndex = colNumber;
    else if (value === 'total page') totalPageColumnIndex = colNumber;
  });

  if (urlColumnIndex === 0) {
    //check initial value, Excell has'nt 0 row or colomn
    alert(`Check Extend Example.xlsx\n\rProvide column with name: \n\rSite URL`);
    return undefined;
  }
  if (thematicityColumnIndex === 0) {
    //check initial value, Excell has'nt 0 row or colomn
    alert(`Check Extend Example.xlsx\n\rProvide column with name: \n\rThematicity Index`);
    return undefined;
  }

  const urlColumn = worksheet.getColumn(urlColumnIndex);
  const rowsCount = urlColumn.values.slice(2).length; //in Excel 0 row is undefind, 1 is header with capture
  const rowsWithValues = worksheet.getRows(2, rowsCount);

  if (!rowsWithValues) {
    alert('You provide an empty file, provide urls as in example');
    return undefined;
  }

  for (let i = 0; i < rowsWithValues.length; i++) {
    const row = rowsWithValues[i];
    const urlCell = row.getCell(urlColumnIndex);
    const id: number = inputData.length;
    let url = '';
    let totalPage: number | undefined;

    if (urlCell.value === null) {
      continue;
    }

    if (typeof urlCell.value === 'object' && 'hyperlink' in urlCell.value) {
      url = urlCell.hyperlink;
    } else {
      const mabyURL = String(urlCell.value);

      if (!isURL(mabyURL)) continue;
      url = mabyURL;
    }

    if (!totalPageColumnIndex) {
      inputData.push(Data.create({ id, url }));
      continue;
    }
    const totalPageCell = row.getCell(totalPageColumnIndex);
    let totalPageValue = totalPageCell.value;

    if (typeof totalPageValue !== 'number' || typeof totalPageValue !== 'string') {
      totalPageValue = ''; //assign empty string because on next step: parseInt('') returns NaN
    }
    const parsedTotalPage = parseInt(totalPageValue);

    if (!isNaN(parsedTotalPage)) {
      totalPage = parsedTotalPage;
    }
    inputData.push(Data.create({ id, url, totalPage }));
  }

  const excelColumnInfo = {
    urlColumnIndex,
    thematicityColumnIndex,
    totalPageColumnIndex,
  };

  const inputExcelData = {
    excelColumnInfo,
    inputData,
  };

  return inputExcelData;
}

/** WRITE Functions */

async function write(inputData: InputData[], query: string): Promise<boolean> {
  inputData;
  query;
  return false;
}

//can write default url and fill columns from ExcelColumnInfoType
async function writeWithExcelColumnInfo({
  file,
  inputData,
  query = '',
  excelColumnInfo,
}: WriteExtendExcelProps) {
  const workbook = new Excel.Workbook();
  const { urlColumnIndex, thematicityColumnIndex, totalPageColumnIndex } = excelColumnInfo;
  const date = new Date();
  const fileName = `thematicity_${query}_${date.getDate()}-${
    date.getMonth() + 1
  }-${date.getFullYear()}_${date.getHours()}-${date.getMinutes()}.xlsx`;

  try {
    await workbook.xlsx.load(file);
  } catch (error) {
    console.error(error);
  }

  const worksheet = workbook.getWorksheet('Site Data');
  if (!worksheet) {
    alert(
      `In extend use of Index Thematicity, you must provide Excel Tab with name: 'Site Data'\n\rCheck Extend Example.xlsx`
    );
    return null;
  }

  //clear previous value
  worksheet.getColumn(urlColumnIndex).eachCell((cell, rowNumber) => {
    if (rowNumber === 1) return cell.value;
    return (cell.value = '');
  });

  worksheet.getColumn(thematicityColumnIndex).eachCell((cell, rowNumber) => {
    if (rowNumber === 1) return cell.value;
    return (cell.value = '');
  });

  if (totalPageColumnIndex) {
    worksheet.getColumn(totalPageColumnIndex).eachCell((cell, rowNumber) => {
      if (rowNumber === 1) return cell.value;
      return (cell.value = '');
    });
  }

  //set new value
  for (let tableRow = 2, urlIndex = 0; urlIndex < inputData.length; tableRow++, urlIndex++) {
    worksheet.getCell(tableRow, urlColumnIndex).value = inputData[urlIndex].url;
    worksheet.getCell(tableRow, thematicityColumnIndex).value =
      inputData[urlIndex].thematicityIndex;

    if (!totalPageColumnIndex) continue;
    worksheet.getCell(tableRow, totalPageColumnIndex).value = inputData[urlIndex].totalPage;
  }

  workbook.xlsx
    .writeBuffer()
    .then(buffer => {
      saveAs(new Blob([buffer], { type: 'application/octet-stream' }), fileName);
    })
    .catch(err => {
      console.error(err.message);
    });
}

/** CREATE EXAMPLE Functions */

//
function createExample() {
  const fileName = 'example.xlsx';
  const workbook = new Excel.Workbook();
  const worksheet = workbook.addWorksheet('Site Data');
  const data = [
    ['Some info', 'Site URL', 'Some info', 'Thematicity Index', 'Some info', 'Total Page'],
    ['data', 'washingtonpost.com', 'data', 'will be filled', 'data', 'will be filled'],
    ['data', 'www.businessinsider.com/', 'data', 'will be filled', 'data', 'will be filled'],
    ['data', 'https://www.who.int/', 'data', 'will be filled', 'data', 'will be filled'],
    ['data', 'macobserver.com', 'data', 'will be filled', 'data', 'will be filled'],
  ];

  workbook.creator = 'ThematicityIndex';
  workbook.lastModifiedBy = 'ThematicityIndex';
  workbook.created = new Date();

  worksheet.addRows(data);
  worksheet.getRow(1).font = { bold: true };

  worksheet.getColumn(1).width = 10;
  worksheet.getColumn(1).alignment = { horizontal: 'center' };
  worksheet.getColumn(2).width = 25;
  worksheet.getColumn(2).alignment = { horizontal: 'center' };
  worksheet.getColumn(2).eachCell(cell => {
    cell.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'C6E0B4' },
    };
  });
  worksheet.getColumn(3).width = 10;
  worksheet.getColumn(3).alignment = { horizontal: 'center' };
  worksheet.getColumn(4).width = 17;
  worksheet.getColumn(4).alignment = { horizontal: 'center' };
  worksheet.getColumn(4).eachCell(cell => {
    cell.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'C6E0B4' },
    };
  });
  worksheet.getColumn(5).width = 10;
  worksheet.getColumn(5).alignment = { horizontal: 'center' };
  worksheet.getColumn(6).width = 12;
  worksheet.getColumn(6).eachCell(cell => {
    cell.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'C6E0B4' },
    };
  });
  worksheet.getColumn(6).alignment = { horizontal: 'center' };

  worksheet.getCell('B1').note = {
    texts: [{ font: { bold: true, size: 12, name: 'Calibri', family: 2 }, text: 'Require column' }],
  };
  worksheet.getCell('D1').note = {
    texts: [{ font: { bold: true, size: 12, name: 'Calibri', family: 2 }, text: 'Require column' }],
  };
  worksheet.getCell('F1').note = {
    texts: [
      { font: { bold: true, size: 11, name: 'Calibri', family: 2 }, text: 'Optional column' },
      {
        font: { size: 10, color: { theme: 1 }, name: 'Calibri' },
        text: '\n\rIf there is no column, it will not be filled',
      },
    ],
  };

  workbook.xlsx
    .writeBuffer()
    .then(buffer => {
      saveAs(new Blob([buffer], { type: 'application/octet-stream' }), fileName);
    })
    .catch(err => {
      console.error(err.message);
    });
}

const fileExcel = {
  read,
  readWithExcelColumnInfo,
  write,
  writeWithExcelColumnInfo,
  createExample,
};

export default fileExcel;
