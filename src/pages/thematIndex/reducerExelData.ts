import { ExcelDataType } from '@/utils/fileExcel';
import { URLObjectProps } from '@/utils/calcThematicityIndex';

export interface ExcelDataAction {
  type: string;
  urlObjects?: URLObjectProps[] | null;
  excelData?: ExcelDataType;
}

function reducerExelData(state: ExcelDataType | null, action: ExcelDataAction) {
  switch (action.type) {
    case 'SET':
      if (!action.excelData) return state;

      return {
        ...state,
        ...action.excelData,
      };

    case 'MODIFY':
      if (!state) return null;
      if (!action.urlObjects) return state;

      return {
        ...state,
        urlObjects: action.urlObjects,
      };

    default:
      return state;
  }
}

export default reducerExelData;
