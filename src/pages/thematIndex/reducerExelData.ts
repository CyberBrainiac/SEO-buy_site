import { ExcelDataType } from '@/utils/fileExcel';
import { URLObjectProps } from '@/utils/calcThematicityIndex';

interface ExcelDataAction {
  type: string;
  urlObjects?: URLObjectProps[] | null;
  excelData?: ExcelDataType;
}

function reducerExelData(state: ExcelDataType, action: ExcelDataAction) {
  console.log("process1");
  switch (action.type) {
    case 'SET':
      if (!action.excelData) return state;
      return {
        ...state,
        ...action.excelData,
      };

    case 'MODIFY':
      if (!action.urlObjects) return state;
      console.log("process2");
      
      return {
        ...state,
        urlObjects: action.urlObjects,
      };
    default:
      return state;
  }
}

export default reducerExelData;
