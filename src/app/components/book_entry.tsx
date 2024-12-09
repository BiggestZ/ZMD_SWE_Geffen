import connectToDb from "./connectToDB";
import mysql from "mysql2/promise";

// Book interface
interface Book {
    title: string;
    author: string;
    isbn: string;
    Description: string;
  }



// async function searchBookByTitle(title: string):  Promise<any[]> {
//     const connection = await connectToDb();
//     if (!connection) {
//         console.error("Failed to connect to the database.");
//         return [];
//     }
//     try {
//         // Fetch books matching the title
//         const [bookResults] = await connection.execute(
//             "SELECT * FROM Books WHERE Title LIKE ?",
//             [`%${title}%`]
//         );

//         const books = bookResults as any[];

//         if (books.length === 0) {
//             console.log("No books found with that title.");
//             return { books: [] };
//         }

//         const booksWithLanguages: { title: string; author: string; isbn: string; description: string; languages: string[] }[] = [];

//         for (const book of books) {
//             // Fetch languages for each book
//             const [languageResults] = await connection.execute(
//                 `
//                 SELECT l.LanguageName
//                 FROM Book_Language bl
//                 JOIN Language l ON bl.LanguageID = l.LanguageID
//                 WHERE bl.ISBN = ?
//                 `,
//                 [book.ISBN]
//             );

//             const languages = (languageResults as any[]).map((lang) => lang.LanguageName);

//             booksWithLanguages.push({
//                 title: book.Title,
//                 author: book.Author,
//                 isbn: book.ISBN,
//                 description: book.Description || "No Description Available",
//                 languages,
//             });
//         }

//         // Return all books and their associated languages
//         return { books: booksWithLanguages };
//     } catch (error) {
//         console.error(`Error searching for book: ${(error as Error).message}`);
//         return null;
//     } finally {
//         await connection.end();
//     }
// }
async function searchBookByTitle(title: string): Promise<any[]> {
    const connection = await connectToDb();
    if (!connection) {
        console.error("Failed to connect to the database.");
        return [];
    }
    try {
        // Fetch books matching the title
        const [bookResults] = await connection.execute(
            "SELECT * FROM Books WHERE Title LIKE ?",
            [`%${title}%`]
        );

        const books = bookResults as any[];

        if (books.length === 0) {
            console.log("No books found with that title.");
            return [];
        }

        const booksWithLanguages: { title: string; author: string; isbn: string; description: string; languages: string[] }[] = [];

        for (const book of books) {
            // Fetch languages for each book
            const [languageResults] = await connection.execute(
                `
                SELECT l.LanguageName
                FROM Book_Language bl
                JOIN Language l ON bl.LanguageID = l.LanguageID
                WHERE bl.ISBN = ?
                `,
                [book.ISBN]
            );

            const languages = (languageResults as any[]).map((lang) => lang.LanguageName);

            booksWithLanguages.push({
                title: book.Title,
                author: book.Author,
                isbn: book.ISBN,
                description: book.Description || "No Description Available",
                languages,
            });
        }

        // Return all books and their associated languages
        return booksWithLanguages;
    } catch (error) {
        console.error(`Error searching for book: ${(error as Error).message}`);
        return [];
    } finally {
        await connection.end();
    }
}

//=======================================================
// Function to validate author's name
function isValidAuthorName(author: string): boolean {
    return /^[A-Za-z\s]+$/.test(author);
}

// Function to get subtopic ID
async function getSubtopicId(subtopicName: string, topicName: string, connection: mysql.Connection): Promise<number | null> {
    if (!connection) return null;
    const [topicResult] = await connection.execute(
        "SELECT TopicID FROM Topics WHERE TopicName = ?",
        [topicName]
    );
    const topic = (topicResult as any[])[0];

    if (!topic) {
        console.log(`Topic '${topicName}' does not exist in the database.`);
        return null;
    }

    const [subtopicResult] = await connection.execute(
        "SELECT SubtopicID FROM Subtopics WHERE SubtopicName = ? AND TopicID = ?",
        [subtopicName, topic.TopicID]
    );
    const subtopic = (subtopicResult as any[])[0];

    if (!subtopic) {
        console.log(`Subtopic '${subtopicName}' under topic '${topicName}' does not exist in the database.`);
        return null;
    }

    return subtopic.SubtopicID;
}

interface SubtopicInput {
    topicName: string;
    subtopicName?: string;
}
//Works!
async function addBook2(
    title: string,
    author: string,
    isbn: string,
    description: string,
    language: string,
    subtopics: string[]
): Promise<void> {
    const connection = await connectToDb();
    if (!connection) return;

    try {
        // Validate ISBN length
        if (isbn.length !== 13 || !/^\d+$/.test(isbn)) {
            console.log("Error: ISBN must be exactly 13 characters long and contain only numbers.");
            return;
        }

        // Validate author's name
        if (!isValidAuthorName(author)) {
            console.log("Error: Author name can only contain letters and spaces.");
            return;
        }

        // Insert the book
        await connection.execute(
            "INSERT INTO Books (Title, Author, ISBN, Description) VALUES (?, ?, ?, ?)",
            [title, author, isbn, description]
        );

        // Check if the language exists in the database
        const [languageResult]: any[] = await connection.execute(
            "SELECT LanguageID FROM Language WHERE LOWER(LanguageName) = LOWER(?)",
            [language]
        );

        // If exists, link the book to the language
        if (languageResult.length > 0) {
            const languageId = languageResult[0].LanguageID;
            await connection.execute(
                "INSERT INTO Book_Language (ISBN, LanguageID) VALUES (?, ?)",
                [isbn, languageId]
            );
        } else {
            // If does not exist, log a message
            console.log(`Language '${language}' not found in the database. Skipping.`);
        }

        console.log(`Book '${title}' added successfully.`);

        // Process subtopics
        for (const subtopic of subtopics) {
            const [subtopicResult]: any[] = await connection.execute(
                "SELECT SubtopicID FROM Subtopics WHERE SubtopicName = ?",
                [subtopic]
            );

            if (subtopicResult.length > 0) {
                const subtopicId = subtopicResult[0].SubtopicID;
                await connection.execute(
                    "INSERT INTO Book_SubTopics (ISBN, SubtopicID) VALUES (?, ?)",
                    [isbn, subtopicId]
                );
                console.log(`Linked '${title}' to subtopic '${subtopic}'.`);
            } else {
                console.log(`Subtopic '${subtopic}' not found. Skipping.`);
            }
        }

        await connection.commit();
        console.log("All valid subtopics processed successfully.");
    } catch (error) {
        console.error(`Error adding subtopics: ${subtopics}`);
        console.error(`Error adding book with subtopics: ${(error as Error).message}`);
    } finally {
        await connection.end();
    }
}

// Add a language to the database
async function addLanguage(languageName: string): Promise<void> {
    const connection = await connectToDb();
    if (!connection) {
        console.log("Failed to connect to the database.");
        return;
    }

    try {
        // Check if the language already exists
        const [result] = await connection.execute(
            "SELECT LanguageID FROM Language WHERE LanguageName = ?",
            [languageName]
        );

        if ((result as any[]).length > 0) {
            console.log(`Language '${languageName}' already exists in the database.`);
        } else {
            // Insert the new language
            await connection.execute(
                "INSERT INTO Language (LanguageName) VALUES (?)",
                [languageName]
            );
            console.log(`Language '${languageName}' added successfully.`);
        }
    } catch (error) {
        console.error("Error adding language:", error);
    } finally {
        await connection.end();
    }
}

// Delete a language from the database
async function deleteLanguage(languageName: string): Promise<void> {
    const connection = await connectToDb();
    if (!connection) {
        console.log("Failed to connect to the database.");
        return;
    }

    try {
        // Check if the language exists
        const [result] = await connection.execute(
            "SELECT LanguageID FROM Language WHERE LanguageName = ?",
            [languageName]
        );

        if ((result as any[]).length === 0) {
            console.log(`Language '${languageName}' does not exist in the database.`);
        } else {
            // Delete the language
            await connection.execute(
                "DELETE FROM Language WHERE LanguageName = ?",
                [languageName]
            );
            console.log(`Language '${languageName}' deleted successfully.`);
        }
    } catch (error) {
        console.error("Error deleting language:", error);
    } finally {
        await connection.end();
    }
}

// Add a topic to the database
async function addTopic(topicName: string): Promise<void> {
    const connection = await connectToDb();
    if (!connection) {
        console.error("Failed to connect to the database.");
        return;
    }

    try {
        // Check if the topic already exists
        const [result]: any[] = await connection.execute(
            "SELECT TopicID FROM Topics WHERE TopicName = ?",
            [topicName]
        );

        if (result.length > 0) {
            console.log(`Topic '${topicName}' already exists in the database.`);
        } else {
            // Insert the new topic
            await connection.execute(
                "INSERT INTO Topics (TopicName) VALUES (?)",
                [topicName]
            );
            await connection.commit();
            console.log(`Topic '${topicName}' added successfully.`);
        }
    } catch (error) {
        console.error(`Error adding topic: ${(error as Error).message}`);
    } finally {
        await connection.end();
    }
}

// Delete a topic from the database
async function deleteTopic(topicName: string): Promise<void> {
    const connection = await connectToDb();
    if (!connection) {
        console.error("Failed to connect to the database.");
        return;
    }

    try {
        // Check if the topic exists
        const [result]: any[] = await connection.execute(
            "SELECT TopicID FROM Topics WHERE TopicName = ?",
            [topicName]
        );

        if (result.length === 0) {
            console.log(`Topic '${topicName}' does not exist in the database.`);
            return;
        }

        const topicID = result[0].TopicID;

        // Remove related subtopics or dependencies (optional)
        await connection.execute(
            "DELETE FROM Subtopics WHERE TopicID = ?",
            [topicID]
        );
        console.log(`Deleted all subtopics related to topic '${topicName}'.`);

        // Delete the topic
        await connection.execute(
            "DELETE FROM Topics WHERE TopicID = ?",
            [topicID]
        );
        await connection.commit();
        console.log(`Topic '${topicName}' deleted successfully.`);
    } catch (error) {
        console.error(`Error deleting topic: ${(error as Error).message}`);
    } finally {
        await connection.end();
    }
}

// // Function to add a book with multiple topics and subtopics
// async function addBook(title: string, author: string, isbn: string, description: string): Promise<void> {
//     const connection = await connectToDb();
//     if (!connection) return;
//     try {
//         // Validate ISBN length
//         if (isbn.length !== 13 || !/^\d+$/.test(isbn)) {
//             console.log("Error: ISBN must be exactly 13 characters long and contain only numbers.");
//             return;
//         }

//         // Validate author's name
//         if (!isValidAuthorName(author)) {
//             console.log("Error: Author name can only contain letters and spaces.");
//             return;
//         }

//         // Insert the book
//         await connection.execute(
//             "INSERT INTO Books (Title, Author, ISBN, Description) VALUES (?, ?, ?, ?)",
//             [title, author, isbn, description]
//         );
//         await connection.commit();
//         console.log(`Book '${title}' added successfully.`);

//         // Prompt for topics and subtopics
//         while (true) {
//             const topicName = prompt("Enter topic name (or 'done' to finish): ");
//             if (topicName && topicName.toLowerCase() === 'done') break;

//             const subtopicName = prompt("Enter subtopic name (optional, press Enter to skip): ") || topicName;

//             // Check if the topic and subtopic exist in the database
//             const subtopicId = await getSubtopicId(subtopicName!, topicName!, connection);

//             // Only link the book if the subtopic exists
//             if (subtopicId) {
//                 await connection.execute(
//                     "INSERT INTO Book_SubTopics (ISBN, SubtopicID) VALUES (?, ?)",
//                     [isbn, subtopicId]
//                 );
//                 await connection.commit();
//                 console.log(`Linked '${title}' to topic '${topicName}' and subtopic '${subtopicName}'.`);
//             } else {
//                 console.log(`Cannot link '${title}' to topic '${topicName}' and subtopic '${subtopicName}' as they are not found in the database.`);
//             }
//         }
//     } catch (error) {
//         console.error(`Error adding book: ${(error as Error).message}`);
//     } finally {
//         await connection.end();
//     }
// }

// Function to drop a book by title or ISBN
async function dropBook(titleOrIsbn: string): Promise<void> {
    const connection = await connectToDb();
    if (!connection) return;
    try {
        // Fetch the ISBN of the book using the title or directly use ISBN
        const [bookResult] = await connection.execute(
            "SELECT ISBN FROM Books WHERE Title = ? OR ISBN = ?",
            [titleOrIsbn, titleOrIsbn]
        );
        const book = (bookResult as any[])[0];

        if (!book) {
            console.log(`No book found with title or ISBN: '${titleOrIsbn}'.`);
            return;
        }

        const isbn = book.ISBN;

        // Delete all related entries in Book_SubTopics
        await connection.execute("DELETE FROM Book_SubTopics WHERE ISBN = ?", [isbn]);
        console.log(`Deleted all subtopic links for book with ISBN ${isbn}.`);

        // Delete all related entries in Book_Language
        await connection.execute("DELETE FROM Book_Language WHERE ISBN = ?", [isbn]);
        console.log(`Deleted all language links for book with ISBN ${isbn}.`);

        // Delete the book itself
        await connection.execute("DELETE FROM Books WHERE ISBN = ?", [isbn]);
        await connection.commit();
        console.log(`Book with ISBN ${isbn} deleted successfully.`);

    } catch (error) {
        console.error(`Error dropping book: ${(error as Error).message}`);
    } finally {
        await connection.end();
    }
}
// async function dropBook(titleOrIsbn: string): Promise<void> {
//     const connection = await connectToDb();
//     if (!connection) return;
//     try {
//         const [bookResult] = await connection.execute("SELECT ISBN FROM Books WHERE Title = ?", [titleOrIsbn]);
//         const book = (bookResult as any[])[0];

//         if (!book) {
//             console.log(`No book found with title: '${titleOrIsbn}'.`);
//             return;
//         }

//         const isbn = book.ISBN;

//         // Delete all related entries in Book_SubTopics
//         await connection.execute("DELETE FROM Book_SubTopics WHERE ISBN = ?", [isbn]);
//         console.log(`Deleted all subtopic links for book with ISBN ${isbn}.`);

//         // Delete the book itself
//         await connection.execute("DELETE FROM Books WHERE ISBN = ?", [isbn]);
//         await connection.commit();
//         console.log(`Book with ISBN ${isbn} deleted successfully.`);

//     } catch (error) {
//         console.error(`Error dropping book: ${(error as Error).message}`);
//     } finally {
//         await connection.end();
//     }
// }

async function editBook(searchTerm: string): Promise<void> {
    const connection = await connectToDb();
    if (!connection) return;
    try {
        const [bookResult] = await connection.execute("SELECT * FROM Books WHERE Title = ?", [searchTerm]);
        const book = (bookResult as any[])[0];
        if (!book) {
            console.log(`No book found with title '${searchTerm}'.`);
            return;
        }
      console.log(`Editing book: ${book.title} by ${book.author}`);
      // Prompt for updates on book details
      const newTitle = prompt("Enter new title (or leave blank to keep current): ") || book.title;
      const newAuthor = prompt("Enter new author (or leave blank to keep current): ") || book.author;
      const newIsbn = prompt("Enter new ISBN (or leave blank to keep current): ") || book.isbn;
      const newDescription = prompt("Enter new description (or leave blank to keep current): ") || book.bookDesc;
      // Check if the ISBN is changing
      const isIsbnChanging = newIsbn !== book.isbn;
      // Disable foreign key checks
      await connection.query("SET FOREIGN_KEY_CHECKS=0");
      // Update the book in the database
      await connection.query(
        "UPDATE Books SET title = ?, author = ?, isbn = ?, bookDesc = ? WHERE isbn = ?",
        [newTitle, newAuthor, newIsbn, newDescription, book.isbn]
      );
      if (isIsbnChanging) {
        await connection.query("UPDATE Book_SubTopics SET ISBN = ? WHERE ISBN = ?", [newIsbn, book.isbn]);
        await connection.query("UPDATE Book_Language SET ISBN = ? WHERE ISBN = ?", [newIsbn, book.isbn]);
        console.log(`ISBN updated from '${book.isbn}' to '${newIsbn}' across all related tables.`);
      }
  
      await connection.query("SET FOREIGN_KEY_CHECKS=1");
      console.log("Book details updated successfully.");
  
      // Update subtopics (optional)
      const updateSubtopics = prompt("Would you like to update the subtopics associated with this book? (yes/no): ")?.toLowerCase();
  
      if (updateSubtopics === "yes") {
        const action = prompt("Choose an option:\n1) Delete all existing subtopics and add new ones\n2) Add new subtopics to existing ones\n3) Leave existing subtopics as is\nEnter 1, 2, or 3: ");
        if (action === '1') {
          await connection.query("DELETE FROM Book_SubTopics WHERE ISBN = ?", [newIsbn]);
          console.log("Existing subtopics cleared. Please add new subtopics.");
  
          while (true) {
            const topicName = prompt("Enter topic name (or 'done' to finish): ");
            if (!topicName || topicName.toLowerCase() === 'done') break;
  
            const subtopicName = prompt("Enter subtopic name (optional, press Enter to skip): ") || topicName;
            const subtopicId = await getSubtopicId(subtopicName, topicName, connection);
  
            if (subtopicId) {
              await connection.query("INSERT INTO Book_SubTopics (ISBN, SubtopicID) VALUES (?, ?)", [newIsbn, subtopicId]);
              console.log(`Linked '${newTitle}' to topic '${topicName}' and subtopic '${subtopicName}'.`);
            } else {
              console.log(`Cannot link '${newTitle}' to topic '${topicName}' and subtopic '${subtopicName}' as they are not found in the database.`);
            }
          }
        } else if (action === '2') {
          console.log("Adding additional subtopics without deleting existing ones.");
          while (true) {
            const topicName = prompt("Enter topic name (or 'done' to finish): ");
            if (!topicName || topicName.toLowerCase() === 'done') break;
  
            const subtopicName = prompt("Enter subtopic name (optional, press Enter to skip): ") || topicName;
            const subtopicId = await getSubtopicId(subtopicName, topicName, connection);
  
            if (subtopicId) {
              await connection.query("INSERT INTO Book_SubTopics (ISBN, SubtopicID) VALUES (?, ?)", [newIsbn, subtopicId]);
              console.log(`Linked '${newTitle}' to topic '${topicName}' and subtopic '${subtopicName}'.`);
            } else {
              console.log(`Cannot link '${newTitle}' to topic '${topicName}' and subtopic '${subtopicName}' as they are not found in the database.`);
            }
          }
        } else if (action === '3') {
          console.log("No changes made to subtopics; existing subtopics are retained.");
        } else {
          console.log("Invalid choice. No changes made to subtopics.");
        }
      }
    } catch (error) {
      console.error(`Error updating book: ${error}`);
    } finally {
      connection.end();
    }
}

// Find all books related to a given topic
async function searchBooksByTopic(topicName: string): Promise<void> {
  const connection = await connectToDb();
  if (!connection) {
      console.error("Failed to connect to the database.");
      return;
  }

  try {
      // Find the topic ID
      const [topicRows] = await connection.execute(
          "SELECT TopicID FROM Topics WHERE TopicName = ?",
          [topicName]
      );

      if (Array.isArray(topicRows) && topicRows.length === 0) {
          console.log(`No topic found with name '${topicName}'.`);
          return;
      }

      const topicId = (topicRows as any[])[0].TopicID;

      // Find all books linked to the topic through subtopics
      const [bookRows] = await connection.execute(
          `
          SELECT b.Title, b.Author, b.ISBN, b.BookDesc
          FROM Books b
          JOIN Book_SubTopics bs ON b.ISBN = bs.ISBN
          JOIN Subtopics s ON bs.SubtopicID = s.SubtopicID
          WHERE s.TopicID = ?
          `,
          [topicId]
      );

      // Display results
      if (Array.isArray(bookRows) && bookRows.length > 0) {
          console.log(`Books related to topic '${topicName}':`);
          bookRows.forEach((book: any) => {
              console.log(`Title: ${book.Title}`);
              console.log(`Author: ${book.Author}`);
              console.log(`ISBN: ${book.ISBN}`);
              console.log(`Description: ${book.BookDesc}`);
              console.log("-".repeat(40));
          });
      } else {
          console.log(`No books found related to topic '${topicName}'.`);
      }
  } catch (error) {
      console.error("Error searching for books:", error);
  } finally {
      await connection.end();
  }
}

// Grabs all the subtopics in the database
async function getAllSubtopics(): Promise<Record<string, string[]>> {
    const connection = await connectToDb();
    if (!connection) {
        console.error("Failed to connect to the database.");
        return {};
    }
    try {
        // Fetch all book ISBNs with their subtopics
        const [results] = await connection.execute(
            `
            SELECT b.Title AS bookTitle, s.SubtopicName AS subtopicName
            FROM Books b
            JOIN Book_SubTopics bs ON b.ISBN = bs.ISBN
            JOIN Subtopics s ON bs.SubtopicID = s.SubtopicID
            `
        );
        // Organize subtopics by book title
        const subtopicsByBook: Record<string, string[]> = {}; // Initialize an empty object
        (results as any[]).forEach(row => { 
            const { bookTitle, subtopicName } = row; // Extract book title and subtopic name
            if (!subtopicsByBook[bookTitle]) { // Initialize subtopic list for the book
                subtopicsByBook[bookTitle] = []; 
            }
            subtopicsByBook[bookTitle].push(subtopicName); // Add subtopic to the list
        });
        return subtopicsByBook;
    } catch (error) {
        console.error(`Database error: ${error}`);
        return {};
    } finally {
        await connection.end();
    }
}

async function getAllBooks(): Promise<Record<string, string[]>> {
    const connection = await connectToDb();
    if (!connection) {
        console.error("Failed to connect to the database.");
        return {};
    }
    try {
        // Fetch all book ISBNs with their subtopics
        const [results] = await connection.execute(
            `
            SELECT b.Title AS bookTitle, s.SubtopicName AS subtopicName
            FROM Books b
            JOIN Book_SubTopics bs ON b.ISBN = bs.ISBN
            JOIN Subtopics s ON bs.SubtopicID = s.SubtopicID
            `
        );
        // Organize subtopics by book title
        const booksBySubtopic: Record<string, string[]> = {}; // Initialize an empty object
        (results as any[]).forEach(row => { 
            const { bookTitle, subtopicName } = row; // Extract book title and subtopic name
            if (!booksBySubtopic[subtopicName]) { // Initialize subtopic list for the book
                booksBySubtopic[subtopicName] = []; 
            }
            booksBySubtopic[subtopicName].push(bookTitle); // Add subtopic to the list
        });
        return booksBySubtopic;
    } catch (error) {
        console.error(`Database error: ${error}`);
        return {};
    } finally {
        await connection.end();
    }
}

async function getBooksList(): Promise<Book[]> {
    const connection = await connectToDb();
    if (!connection) {
        console.error("Failed to connect to the database.");
        return [];
    }
    try {
        const [results] = await connection.execute(
            `SELECT Title, Author, ISBN, Description 
            FROM Books`
        );

        const booksList : Array<Book> = [];

        (results as any[]).forEach(row => {
            const { Title, Author, ISBN, Description } = row;

            let newBook : Book = {
                title: Title,
                author: Author,
                isbn: ISBN,
                bookDesc: Description
            }
            booksList.push(newBook);
            })
            return booksList;
    } catch (error) {
        console.error(`Database error: ${error}`);
        return [];
    } finally {
        await connection.end();
    }
}

// Helper function to get subtopics for a specific book
async function getSubtopicsForBook(bookTitle: string): Promise<string[]> {
    const allSubtopics = await getAllSubtopics(); 
    return allSubtopics[bookTitle] || []; // Return subtopics for the book or an empty array
}

// This is the older function that caused too many query calls
// async function getSubtopicsForBook(bookTitle: string): Promise<string[]> {
//     const connection = await connectToDb();
//     if (!connection) {
//         console.error("Failed to connect to the database.");
//         return [];
//     }

//     try {
//         const [bookResults] = await connection.execute(
//             "SELECT ISBN FROM Books WHERE Title = ?",
//             [bookTitle]
//         );

//         if (Array.isArray(bookResults) && bookResults.length === 0) {
//             console.log(`No book found with title '${bookTitle}'.`);
//             return [];
//         }

//         const book = (bookResults as any[])[0];
//         const ISBN = book.ISBN;

//         const [subtopicResults] = await connection.execute(
//             `
//             SELECT s.SubtopicName
//             FROM Subtopics s
//             JOIN Book_SubTopics bs ON s.SubtopicID = bs.SubtopicID
//             WHERE bs.ISBN = ?
//             `,
//             [ISBN]
//         );

//         if (Array.isArray(subtopicResults) && subtopicResults.length > 0) {
//             return (subtopicResults as any[]).map(row => row.SubtopicName);
//         } else {
//             return [];
//         }

//     } catch (error) {
//         console.error(`Database error: ${error}`);
//         return [];
//     } finally {
//         await connection.end();
//     }
// }

// Find all books related to a given subtopic
async function searchBooksBySubtopic(subtopicName: string): Promise<void> {
  const connection = await connectToDb();
  if (!connection) {
      console.error("Failed to connect to the database.");
      return;
  }

  try {
      // Find the subtopic ID
      const [subtopicRows] = await connection.execute(
          "SELECT SubtopicID FROM Subtopics WHERE SubtopicName = ?",
          [subtopicName]
      );

      if (Array.isArray(subtopicRows) && subtopicRows.length === 0) {
          console.log(`No subtopic found with name '${subtopicName}'.`);
          return;
      }

      const subtopicId = (subtopicRows as any[])[0].SubtopicID;

      // Find all books linked to the subtopic
      const [bookRows] = await connection.execute(
          `
          SELECT b.Title, b.Author, b.ISBN, b.BookDesc
          FROM Books b
          JOIN Book_SubTopics bs ON b.ISBN = bs.ISBN
          WHERE bs.SubtopicID = ?
          `,
          [subtopicId]
      );

      // Display results
      if (Array.isArray(bookRows) && bookRows.length > 0) {
          console.log(`Books related to subtopic '${subtopicName}':`);
          bookRows.forEach((book: any) => {
              console.log(`Title: ${book.Title}`);
              console.log(`Author: ${book.Author}`);
              console.log(`ISBN: ${book.ISBN}`);
              console.log(`Description: ${book.BookDesc}`);
              console.log("-".repeat(40));
          });
      } else {
          console.log(`No books found related to subtopic '${subtopicName}'.`);
      }
  } catch (error) {
      console.error("Error searching for books:", error);
  } finally {
      await connection.end();
  }
}

// This is the new one for Danny to use
async function getAllTopics(): Promise<string[]> {
    const connection = await connectToDb(); // Establish a connection to the database
    if (!connection) {
        console.error("Failed to connect to the database.");
        return [];
    }

    try {
        // Execute the query to fetch all topics
        const [results]: [any[], any] = await connection.execute(
            "SELECT TopicName FROM Topics"
        );

        // Extract topic names into an array
        const topics: string[] = results.map((row: { TopicName: string }) => row.TopicName);
        //console.log("Topics:", topics);
        return topics;
    } catch (error) {
        console.error(`Database error: ${(error as Error).message}`);
        return [];
    } finally {
        await connection.end(); // Close the connection
    }
}

async function getAllTopicsOld(): Promise<Record<string, string[]>> {
    const connection = await connectToDb();
    if (!connection) {
        console.error("Failed to connect to the database.");
        return {};
    }
    try {
        // Fetch all book ISBNs with their topics
        const [results] = await connection.execute(
            `
            SELECT b.Title AS bookTitle, t.TopicName AS topicName
            FROM Books b
            JOIN Book_SubTopics bs ON b.ISBN = bs.ISBN
            JOIN Subtopics s ON bs.SubtopicID = s.SubtopicID
            JOIN Topics t ON s.TopicID = t.TopicID
            `
        );
        // Organize topics by book title
        const topicsByBook: Record<string, string[]> = {}; // Initialize an empty object
        (results as any[]).forEach(row => { 
            const { bookTitle, topicName } = row; // Extract book title and topic name
            if (!topicsByBook[bookTitle]) { // Initialize topic list for the book
                topicsByBook[bookTitle] = []; 
            }
            topicsByBook[bookTitle].push(topicName); // Add topic to the list
        });
        return topicsByBook;
    } catch (error) {
        console.error(`Database error: ${error}`);
        return {};
    } finally {
        await connection.end();
    }
}

// Helper function to get topics for a specific book
async function getTopicsForBook(bookTitle: string): Promise<string[]> {
    const allTopics = await getAllTopicsOld(); 
    return allTopics[bookTitle] || []; // Return topics for the book or an empty array
} 


    // async function getAllTopics(): Promise<Record<string, string[]>> {
    //     const connection = await connectToDb();
    //     if (!connection) {
    //         console.error("Failed to connect to the database.");
    //         return {};
    //     }
    //     try {
    //         // Fetch all book ISBNs with their topics via subtopics
    //         const [results] = await connection.execute(
    //             `
    //             SELECT DISTINCT b.Title AS bookTitle, t.TopicName AS topicName
    //             FROM Books b
    //             JOIN Book_SubTopics bs ON b.ISBN = bs.ISBN
    //             JOIN Subtopics s ON bs.SubtopicID = s.SubtopicID
    //             JOIN Topics t ON s.TopicID = t.TopicID
    //             `
    //         );
    
    //         // Organize topics by book title
    //         const topicsByBook: Record<string, string[]> = {}; // Initialize an empty object
    //         (results as any[]).forEach(row => { 
    //             const { bookTitle, topicName } = row; // Extract book title and topic name
    //             if (!topicsByBook[bookTitle]) { // Initialize topic list for the book
    //                 topicsByBook[bookTitle] = []; 
    //             }
    //             topicsByBook[bookTitle].push(topicName); // Add topic to the list
    //         });
    //         return topicsByBook;
    //     } catch (error) {
    //         console.error(`Database error: ${error}`);
    //         return {};
    //     } finally {
    //         await connection.end();
    //     }
    // }
/*
async function getTopicsForBook(bookTitle: string): Promise<string[]> {
    const connection = await connectToDb();
    if (!connection) {
        console.error("Failed to connect to the database.");
        return [];
    }

//     try {
//         // Get the ISBN for the given book title
//         const [bookResults] = await connection.execute(
//             "SELECT ISBN FROM Books WHERE Title = ?",
//             [bookTitle]
//         );

//         if (Array.isArray(bookResults) && bookResults.length === 0) {
//             console.log(`No book found with title '${bookTitle}'.`);
//             return [];
//         }

//         const book = (bookResults as any[])[0];
//         const ISBN = book.ISBN;

//         // Get topics linked to this ISBN through subtopics
//         const [topicResults] = await connection.execute(
//             `
//             SELECT DISTINCT t.TopicName
//             FROM Topics t
//             JOIN Subtopics s ON t.TopicID = s.TopicID
//             JOIN Book_SubTopics bs ON s.SubtopicID = bs.SubtopicID
//             WHERE bs.ISBN = ?
//             `,
//             [ISBN]
//         );

//         if (Array.isArray(topicResults) && topicResults.length > 0) {
//             return (topicResults as any[]).map(row => row.TopicName);
//         } else {
//             return [];
//         }

//     } catch (error) {
//         console.error(`Database error: ${error}`);
//         return [];
//     } finally {
//         await connection.end();
//     }
// }
*/

// Function to get all subtopics for a given topic
// async function getSubtopicsByTopic(topicName: string): Promise<string[]> {
//     const connection = await connectToDb();
//     if (!connection) {
//         console.error("Failed to connect to the database.");
//         return [];
//     }

//     try {
//         // Get the TopicID for the given topic name
//         const [topicResults] = await connection.execute(
//             "SELECT TopicID FROM Topics WHERE TopicName = ?",
//             [topicName]
//         );

//         const topic = (topicResults as any[])[0];

//         if (!topic) {
//             console.log(`No topic found with name '${topicName}'.`);
//             return [];
//         }

//         const topicId = topic.TopicID;

//         // Get all subtopics linked to this TopicID
//         const [subtopicResults] = await connection.execute(
//             "SELECT SubtopicName FROM Subtopics WHERE TopicID = ?",
//             [topicId]
//         );

//         const subtopics = subtopicResults as any[];

//         // Return a list of subtopic names
//         return subtopics.map(subtopic => subtopic.SubtopicName);
//     } catch (error) {
//         console.error(`Database error: ${(error as Error).message}`);
//         return [];
//     } finally {
//         await connection.end();
//     }
// }
// Function to get all subtopics for a given topic
import { Connection, RowDataPacket } from 'mysql2/promise';
async function getSubtopicsByTopic(topicName: string): Promise<string[]> {
    /**
     * Retrieve all subtopics related to a given topic name.
     */
    let connection: Connection;
    try {
        connection = await connectToDb();  // Replace with your actual connection function
    } catch (error) {
        console.error("Failed to connect to the database.");
        return [];
    }

    try {
        // Get the TopicID for the given topic name
        const [topics] = await connection.execute<RowDataPacket[]>(
            "SELECT TopicID FROM Topics WHERE TopicName = ?",
            [topicName]
        );

        if (topics.length === 0) {
            console.log(`No topic found with name '${topicName}'.`);
            return [];
        }

        const topicId = topics[0].TopicID;

        // Get all subtopics linked to this TopicID
        const [subtopics] = await connection.execute<RowDataPacket[]>(
            "SELECT SubtopicName FROM Subtopics WHERE TopicID = ?",
            [topicId]
        );

        // Return a list of subtopic names
        return subtopics.map(subtopic => subtopic.SubtopicName);

    } catch (error) {
        console.error(`Database error: ${error}`);
        return [];
    } finally {
        await connection.end();
    }
}




// DANNY ============================================================================ DANNY
// Function to search for books by title
async function getBookByTitle(title: string): Promise<any[]> {
    const connection = await connectToDb();

    if (!connection) {
        console.error("Connection Error in book_entry");
        return [];
    }
    try {
        const [result] = await connection.execute(
            "SELECT * FROM Books WHERE Title LIKE ?",
            [`%${title}%`]
        );
        const books = result as any[];
        if (books.length > 0) {
            console.log("Search Results:");
            for (const book of books) {
                console.log(`Title: ${book.Title}`);
                console.log(`Author: ${book.Author}`);
                console.log(`ISBN: ${book.ISBN}`);
                console.log(`Description: ${book.BookDesc}`);
                console.log("-".repeat(40));
            }
            return books;
        } else {
            console.log("No books found with that title.");
            return [];
        }
    } catch (error) {
        console.error(`Error searching for book: ${(error as Error).message}`);
        return [];
    } finally {
        await connection.end();
    }
}

// fuction for inputing edited books into database
async function inputEditedBook(searchTerm: string): Promise<void> {
    const connection = await connectToDb();
    if (!connection) return;
    try {
        const [bookResult] = await connection.execute("SELECT * FROM Books WHERE Title = ?", [searchTerm]);
        const book = (bookResult as any[])[0];

        if (!book) {
            console.log(`No book found with title '${searchTerm}'.`);
            return;
        }
  
      console.log(`Editing book: ${book.title} by ${book.author}`);
  
      // Prompt for updates on book details
      const newTitle = prompt("Enter new title (or leave blank to keep current): ") || book.title;
      const newAuthor = prompt("Enter new author (or leave blank to keep current): ") || book.author;
      const newIsbn = prompt("Enter new ISBN (or leave blank to keep current): ") || book.isbn;
      const newDescription = prompt("Enter new description (or leave blank to keep current): ") || book.bookDesc;
  
      // Check if the ISBN is changing dont touch
      const isIsbnChanging = newIsbn !== book.isbn;
  
      // Disable foreign key checks dont touch
      await connection.query("SET FOREIGN_KEY_CHECKS=0");
  
      // Update the book in the database
      await connection.query(
        "UPDATE Books SET title = ?, author = ?, isbn = ?, bookDesc = ? WHERE isbn = ?",
        [newTitle, newAuthor, newIsbn, newDescription, book.isbn]
      );
  //====================
      if (isIsbnChanging) {
        await connection.query("UPDATE Book_SubTopics SET ISBN = ? WHERE ISBN = ?", [newIsbn, book.isbn]);
        await connection.query("UPDATE Book_Language SET ISBN = ? WHERE ISBN = ?", [newIsbn, book.isbn]);
        console.log(`ISBN updated from '${book.isbn}' to '${newIsbn}' across all related tables.`);
      }
  
      await connection.query("SET FOREIGN_KEY_CHECKS=1");
      console.log("Book details updated successfully.");
  //========================
      // Update subtopics (optional)
      const updateSubtopics = prompt("Would you like to update the subtopics associated with this book? (yes/no): ")?.toLowerCase();
  
      if (updateSubtopics === "yes") {
        const action = prompt("Choose an option:\n1) Delete all existing subtopics and add new ones\n2) Add new subtopics to existing ones\n3) Leave existing subtopics as is\nEnter 1, 2, or 3: ");
  
        if (action === '1') {
          await connection.query("DELETE FROM Book_SubTopics WHERE ISBN = ?", [newIsbn]);
          console.log("Existing subtopics cleared. Please add new subtopics.");
  
          while (true) {
            const topicName = prompt("Enter topic name (or 'done' to finish): ");
            if (!topicName || topicName.toLowerCase() === 'done') break;
  
            const subtopicName = prompt("Enter subtopic name (optional, press Enter to skip): ") || topicName;
            const subtopicId = await getSubtopicId(subtopicName, topicName, connection);
  
            if (subtopicId) {
              await connection.query("INSERT INTO Book_SubTopics (ISBN, SubtopicID) VALUES (?, ?)", [newIsbn, subtopicId]);
              console.log(`Linked '${newTitle}' to topic '${topicName}' and subtopic '${subtopicName}'.`);
            } else {
              console.log(`Cannot link '${newTitle}' to topic '${topicName}' and subtopic '${subtopicName}' as they are not found in the database.`);
            }
          }
        } else if (action === '2') {
          console.log("Adding additional subtopics without deleting existing ones.");
          while (true) {
            const topicName = prompt("Enter topic name (or 'done' to finish): ");
            if (!topicName || topicName.toLowerCase() === 'done') break;
  
            const subtopicName = prompt("Enter subtopic name (optional, press Enter to skip): ") || topicName;
            const subtopicId = await getSubtopicId(subtopicName, topicName, connection);
  
            if (subtopicId) {
              await connection.query("INSERT INTO Book_SubTopics (ISBN, SubtopicID) VALUES (?, ?)", [newIsbn, subtopicId]);
              console.log(`Linked '${newTitle}' to topic '${topicName}' and subtopic '${subtopicName}'.`);
            } else {
              console.log(`Cannot link '${newTitle}' to topic '${topicName}' and subtopic '${subtopicName}' as they are not found in the database.`);
            }
          }
        } else if (action === '3') {
          console.log("No changes made to subtopics; existing subtopics are retained.");
        } else {
          console.log("Invalid choice. No changes made to subtopics.");
        }
      }
    } catch (error) {
      console.error(`Error updating book: ${error}`);
    } finally {
      connection.end();
    }
}
interface Language {
    LanguageName: string;
}

export async function getLanguagesForBookByTitle(bookTitle: string): Promise<string[]> {
    const connection = await connectToDb();
    if (!connection) {
        console.error("Failed to connect to the database.");
        return [];
    }

    try {
        // Fetch the ISBN for the given book title
        const [bookResult] = await connection.execute(
            "SELECT ISBN FROM Books WHERE Title = ?",
            [bookTitle]
        );

        const book = (bookResult as any[])[0]; // Cast the result to any[]

        if (!book) {
            console.log(`No book found with title '${bookTitle}'.`);
            return [];
        }

        const isbn: string = book.ISBN;

        // Fetch associated languages
        const [languageResults] = await connection.execute(
            `
            SELECT l.LanguageName
            FROM Book_Language bl
            JOIN Language l ON bl.LanguageID = l.LanguageID
            WHERE bl.ISBN = ?
            `,
            [isbn]
        );

        const languages = languageResults as Language[];

        // Return language names as a list
        return languages.map((language) => language.LanguageName);
    } catch (error) {
        console.error(`Database error: ${(error as Error).message}`);
        return [];
    } finally {
        await connection.end();
    }
}

export { searchBookByTitle, addBook2, dropBook, editBook, getBookByTitle, getSubtopicsForBook,searchBooksBySubtopic, searchBooksByTopic, getAllSubtopics, getAllTopics, getBooksList, getSubtopicsByTopic, getAllBooks,getAllTopicsOld };
