import { Box } from "@mui/material";
import NavBar from "../../components/NavBar/NavBar";
import { CodeRecipe } from "../../components/Recipe/CodeRecipe";



const coderecipe = () => {
    interface Table {
        name: string;
        columns: string[];
      }

    const tableData: Table[] = [
        { name: 'Table1', columns: ['Column1', 'Column2', 'Column3'] },
        { name: 'Table2', columns: ['ColumnA', 'ColumnB', 'ColumnC'] },
    ];
    return(
        <>
         <NavBar></NavBar> 
        

         <CodeRecipe tables={tableData} />
        </>
    )

}

export default  coderecipe;