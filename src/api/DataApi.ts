
import { AllDataInput,RawBlogPost } from '../components/InputForm/InputForm';
import axios, { AxiosResponse, AxiosRequestConfig, RawAxiosRequestHeaders } from 'axios';

const client = axios.create({
    baseURL: 'http://localhost:8080/api',
  });

export const saveInputData =  async(inputDataSetName:String,inputSourceType:String,inputSchemaName:String,inputTableName:String,inputFileLocation:String ): Promise<void> => {

    const config: AxiosRequestConfig = {
        headers: {
          'Accept': 'application/json',
        } as RawAxiosRequestHeaders,
      };

    try{
        const data = {
            "dataSetName": inputDataSetName,
            "sourceType": inputSourceType,
            "schemaName": inputSchemaName,
            "tableName": inputTableName,
            "directoryFileLocation": inputFileLocation
        };
        const response = await client.put("/addUser",data,config)
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


export const fetchInputData =  async(): Promise<RawBlogPost[]> => {
    try{
        const response = await client.get("/users")
        return response.data
        console.log("In Api Call")
    }catch(error) {
        console.error('Error in saving interface',error);
        throw error;
    }
};


