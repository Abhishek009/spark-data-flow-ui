export  type DataSet = {
    id: string;
    dataSetName: string,
    sourceType: string,
    schemaName: string,
    tableName: string,
    directoryFileLocation:string,
    datatsetType: String
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
    id:string;
    selectedInputNames: string[];
    outputDataset: string;
    sourceType: string;
    format: string;
    tableName: string;
    schemaName: string;
  }

  export type FlowMapping = {
    id:string;
    inputDataId: string;
    inputDatasetName: string;
    outputDatasetId: string;
    outputDatasetName: string;
    datasetType: string
  }
