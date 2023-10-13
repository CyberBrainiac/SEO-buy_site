//materials: https://codesandbox.io/s/exceljs-export-react-forked-gnogg?file=/App.js:2887-2893
//https://www.codeproject.com/Tips/1251189/Excel-Export-from-Angular-2plus
import Excel from 'exceljs';
import saveAs from 'file-saver';

function read(fileName: string): string {
  const workbook = new Excel.Workbook();
  const worksheet = workbook.addWorksheet('My Sheet');

  worksheet.addRows([
    [1, 2, 3, 4, 5],
    [6, 7, 8, 9, 10],
    [11, 12, 13, 14, 15],
    [16, 17, 18, 19, 20],
  ]);

  const v0 = worksheet.getCell('A1').value;
  console.log(v0);

  const v1 = worksheet.getCell(3, 5).value; //getCell cant get 0 value, first value is 1
  console.log(v1);

  const v2 = worksheet.getRow(2).getCell(2).value;
  console.log(v2);

  return fileName;
}

function createExample() {
  const fileName = 'example.xlsx';
  const workbook = new Excel.Workbook();
  const worksheet = workbook.addWorksheet('Example sheet');

  workbook.creator = 'ThematicityIndex';
  workbook.lastModifiedBy = 'ThematicityIndex';
  workbook.created = new Date();

  worksheet.getCell('A1').value = 'John Doe';
  worksheet.getCell(1, 2).value = 'gardener';
  worksheet.getCell(1, 3).value = new Date().toLocaleString();

  const r3 = worksheet.getRow(3);
  r3.values = [1, 2, 3, 4, 5, 6];
  const col2 = worksheet.getColumn(2);
  col2.values = ['rewrite header', 'url1', 'url2', 'url3'];

  workbook.xlsx
    .writeBuffer()
    .then(buffer => {
      saveAs(new Blob([buffer], { type: 'application/octet-stream' }), fileName);
      console.log('file created');
    })
    .catch(err => {
      console.log(err.message);
    });
}

const fileExcel = {
  read,
  createExample,
};

export default fileExcel;
