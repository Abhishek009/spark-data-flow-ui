import axios from 'axios';
import { AllDataInput,RawBlogPost } from '../components/InputForm/InputForm';

export const saveInputData =  async(inputDataSetName:String,inputSchemaName:String,inputTableName:String,inputFileLocation:String ):
Promise<void> => {
    try{
console.log("In Api Call")
    }catch(error) {
        console.error('Error in saving interface',error);
        throw error;
    }
};

export const fetchInputData =  async():
Promise<RawBlogPost[]> => {
    try{
        const response = await axios.get("https://jsonplaceholder.typicode.com/posts")
        return response.data
        console.log("In Api Call")
    }catch(error) {
        console.error('Error in saving interface',error);
        throw error;
    }
};


