export  type DataSet = {
    id: string;
    dataSetName: string,
    dataSetType: string,
    schemaName: string,
    tableName: string,
    directoryFileLocation:string;
};

export type AllTransData = {
    id:string
    transDataSetName:string;
    transSourceNames:string;
    transOutputName:string;
    query:string;
  }

  export type AllDataInput = {
    id:string
    inputDataSetName:string;
    inputSchemaName:string;
    inputType:string;
    inputTableName:string;
    inputFileLocation:string;
  }

  export type SparkSqlInputData = {
    //inputDatasetId:string;
    selectedInputNames: string[];
    outputDataset: string;
    format: string;
    tableName: string;
    schemaName: string;
  }
