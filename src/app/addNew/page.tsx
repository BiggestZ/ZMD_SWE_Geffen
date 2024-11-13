import TagTable from "../components/tagTable";

export default function Home() {
    
    return (
        <div>
            <h1>add new test </h1>
            <>
        <label>
          isbn:
          <input type = "number" id = "isbn" />
        </label>
        <hr />
        <label>
          Title:
          <input title= "title" />
        </label>
        <hr />
        <label>
          Author:
          <input name= "name" />
        </label>
        <hr />

        <TagTable></TagTable>
        <hr />
        <button>Search</button>
        <hr />
        
       <button type="reset">Reset form</button>
       <button type="submit">Submit form</button>
        

        {/* <label htmlFor={ageInputId}>Your age:</label>
        <input id={ageInputId} name="age" type="number" /> */}
        </>

        </div>  

         
    );
  }
  