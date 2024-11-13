"use client"
import TagTable from "../components/tagTable";
import axios from 'axios';


export default function Home() {
    // Function to handle form submission
    //FIXME: make api that adds informatin from the form to DB
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault(); // Prevents the default form submission
    console.log('TESTING SUBMIT')
    console.log('Form submitted successfully')
    // try {
    //   // Using axios to send a POST request
    //   const response = await axios.post('/api/getTopic', {
    //     //FIXME
    //     // Send the form data in the request body
    //   });

    //   if (response.status === 200) {
    //     // Handle success
    //     console.log('Form submitted successfully');
    //   } else {
    //     // Handle error response
    //     console.log('Error submitting form:', response.statusText);
    //   }
    // } catch (error) {
    //   console.error('Error submitting form:', error);
    // }
  };
    return (
        <form onSubmit = {handleSubmit}>
            <h1>add new test </h1>
            <>
        <label>
          isbn:
          <input type = "number" id = "isbn" />
          </label>
       
        <label>
          Title:
          <input title= "title" />
          
        <label>
          Author:
          <input name= "name" />
        </label>
        </label>
        
        <hr />

        {/* FIXME - TagTable View doesn't clear when reset button is pressed */}
        <TagTable></TagTable>
        
        <hr />
        
       <button type="reset">Reset form</button>
       <button type="submit">Submit form</button>
        

        
        </>
      
        

        </form>  

         
    );
  }
  