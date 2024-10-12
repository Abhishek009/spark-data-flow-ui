

import { DataSet, AllDataInput,SparkSqlInputData,FlowMapping } from './DataModels'
import axios, { AxiosResponse, AxiosRequestConfig, RawAxiosRequestHeaders } from 'axios';

const client = axios.create({
    baseURL: 'http://localhost:8080/api',
  });

const config: AxiosRequestConfig = {
    headers: {
      'Accept': 'application/json',
    } as RawAxiosRequestHeaders,
  };


export const saveInputData =  async(inputDataSetName:String,inputSourceType:String,inputSchemaName:String,inputTableName:String,inputFileLocation:String,datasetType:String,code:String ): Promise<DataSet> => {

    try{
        const data = {
            "dataSetName": inputDataSetName,
            "sourceType": inputSourceType,
            "schemaName": inputSchemaName,
            "tableName": inputTableName,
            "directoryFileLocation": inputFileLocation,
            "datasetType": datasetType,
            "code":code
        };
        const response = await client.put("/addinputdataset",data,config)
        return response.data;
    }catch(error) {
        console.error('Error in saving interface',error);
        throw error;
    }
};

export const saveTransData =  async(transDataSetName:String,transSourceNames:String,transOutputName:String,query:String ): Promise<void> => {

    const config: AxiosRequestConfig = {
        headers: {
          'Accept': 'application/json',
        } as RawAxiosRequestHeaders,
      };

    try{
        const data = {
            "transDataSetName": transDataSetName,
            "transSourceNames": transSourceNames,
            "transOutputName": transOutputName,
            "query": query
        
        };
        const response = await client.put("/addTransform",data,config)
    }catch(error) {
        console.error('Error in saving interface',error);
        throw error;
    }
};

export const saveSparkSqlInputData =  async(sparkSqlInputData:SparkSqlInputData ): Promise<SparkSqlInputData> => {
    try{
        const response = await client.post("/saveinputoutput",sparkSqlInputData,config)
        console.log("Save Spark Sql InputData==> "+response.data)
        return response.data
        
    }catch(error) {
        console.error('Error in saving interface',error);
        throw error;
    }
};

export const fetchInputData =  async(): Promise<FlowMapping[]> => {
    try{
        const response = await client.get("/allinputdataset")
        console.log("In Api Call",response.data)
        return response.data
        
    }catch(error) {
        console.error('Error in saving interface',error);
        throw error;
    }
};

export const saveCodeForNode =  async(code:String,nodeid:String): Promise<string> => {
    try{

        const data = {
            "code": code,
            "nodeid": nodeid,
        
        };
        console.log("Data send "+data.code+"->"+data.nodeid)
        const response = await client.post("/savecode",data,config)
        console.log("Code Saved succesfully "+response.statusText)
        return response.statusText
        
    }catch(error) {
        console.error('Error in saving interface',error);
        throw error;
    }
};


export const getCodeForNode =  async(nodeid:String): Promise<string> => {
    try{

        const data = {
            "nodeid": nodeid,
        };
        console.log("GetCodeForNode -> "+data.nodeid)
        const response = await client.post("/getcode",data,config)
        console.log("Code got "+response.data)
        return response.data
        
    }catch(error) {
        console.error('Error in saving interface',error);
        throw error;
    }
};