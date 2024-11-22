(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push(["static/chunks/src_app_d35dec._.js", {

"[project]/src/app/components/tagTableSearch.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, k: __turbopack_refresh__, m: module, z: require } = __turbopack_context__;
{
__turbopack_esm__({
    "default": (()=>TagTable)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_refresh__.signature();
"use client";
;
function TagTable() {
    _s();
    // State to hold the list of sub-tags to display as checkboxes
    const [subTags, setSubTags] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    // State to track selected tags across categories
    const [selectedTags, setSelectedTags] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [topics, setTopics] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    // Function to handle the subTag_View logic and update the displayed sub-tags
    const subTag_View = (selectedValue)=>{
        const tagOptions = {
            "1": [
                "Art",
                "Language",
                "Music"
            ],
            "2": [
                "Community",
                "Events",
                "Networking"
            ],
            "3": [
                "Parenting",
                "Education",
                "Health"
            ]
        };
        const newSubTags = tagOptions[selectedValue] || [];
        setSubTags(newSubTags);
    };
    // Handle change event on the <select> element
    const handleSelectChange = (e)=>{
        const selectedValue = e.target.value;
        subTag_View(selectedValue);
    };
    // Handle checkbox change for each sub-tag
    const handleCheckboxChange = (tag)=>{
        setSelectedTags((prevSelectedTags)=>{
            // Add the tag if it’s not already selected, otherwise remove it
            if (prevSelectedTags.includes(tag)) {
                return prevSelectedTags.filter((t)=>t !== tag);
            } else {
                return [
                    ...prevSelectedTags,
                    tag
                ];
            }
        });
    };
    //=====
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const fetchTopics = async ()=>{
            try {
                // Call the API endpoint to get the list of topics
                const response = await fetch('/api/getTopics');
                if (response.ok) {
                    const data = await response.json(); // Parse the JSON response
                    setTopics(data); // Store topics in the state
                } else {
                    console.error('Error fetching topics');
                }
            } catch (error) {
                console.error('Error fetching topics:', error);
            }
        };
        fetchTopics();
    }, []);
    //=====
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                className: "form-select",
                "aria-label": "Default select example",
                onChange: handleSelectChange,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                        value: "0",
                        children: "Select a tag"
                    }, void 0, false, {
                        fileName: "[project]/src/app/components/tagTableSearch.tsx",
                        lineNumber: 73,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                        value: "1",
                        children: "culture"
                    }, void 0, false, {
                        fileName: "[project]/src/app/components/tagTableSearch.tsx",
                        lineNumber: 74,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                        value: "2",
                        children: "social"
                    }, void 0, false, {
                        fileName: "[project]/src/app/components/tagTableSearch.tsx",
                        lineNumber: 75,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                        value: "3",
                        children: "family"
                    }, void 0, false, {
                        fileName: "[project]/src/app/components/tagTableSearch.tsx",
                        lineNumber: 76,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/components/tagTableSearch.tsx",
                lineNumber: 68,
                columnNumber: 7
            }, this),
            subTags.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                children: subTags.map((tag, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                type: "checkbox",
                                id: tag,
                                name: tag,
                                value: tag,
                                checked: selectedTags.includes(tag),
                                onChange: ()=>handleCheckboxChange(tag)
                            }, void 0, false, {
                                fileName: "[project]/src/app/components/tagTableSearch.tsx",
                                lineNumber: 84,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                htmlFor: tag,
                                children: tag
                            }, void 0, false, {
                                fileName: "[project]/src/app/components/tagTableSearch.tsx",
                                lineNumber: 92,
                                columnNumber: 15
                            }, this)
                        ]
                    }, index, true, {
                        fileName: "[project]/src/app/components/tagTableSearch.tsx",
                        lineNumber: 83,
                        columnNumber: 13
                    }, this))
            }, void 0, false, {
                fileName: "[project]/src/app/components/tagTableSearch.tsx",
                lineNumber: 81,
                columnNumber: 9
            }, this),
            selectedTags.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                        children: "Selected Tags:"
                    }, void 0, false, {
                        fileName: "[project]/src/app/components/tagTableSearch.tsx",
                        lineNumber: 101,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                        children: selectedTags.map((tag, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                children: tag
                            }, index, false, {
                                fileName: "[project]/src/app/components/tagTableSearch.tsx",
                                lineNumber: 104,
                                columnNumber: 15
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/src/app/components/tagTableSearch.tsx",
                        lineNumber: 102,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/components/tagTableSearch.tsx",
                lineNumber: 100,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/components/tagTableSearch.tsx",
        lineNumber: 66,
        columnNumber: 5
    }, this);
}
_s(TagTable, "SjR+SPsnZwUZwxIlgrwRrV1C4gA=");
_c = TagTable;
var _c;
__turbopack_refresh__.register(_c, "TagTable");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_refresh__.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/app/components/connectToDB.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, k: __turbopack_refresh__, m: module, z: require } = __turbopack_context__;
{
// Function to connect to the database
__turbopack_esm__({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$mysql2$2f$promise$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/mysql2/promise.js [app-client] (ecmascript)");
;
// Database connection function
async function connectToDb() {
    // Connection parameters
    const connectionParameters = {
        host: 'sql.cianci.io',
        user: 'acheng2',
        password: 'cl6g*t5URndDuZxe',
        database: '2024fall_comp367_geffen'
    };
    try {
        const connection = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$mysql2$2f$promise$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].createConnection(connectionParameters);
        console.log("Connected to the database successfully.");
        return connection;
    } catch (error) {
        console.error("Error connecting to the database:", error);
        return null;
    }
}
const __TURBOPACK__default__export__ = connectToDb;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_refresh__.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/app/components/book_entry.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, k: __turbopack_refresh__, m: module, z: require } = __turbopack_context__;
{
__turbopack_esm__({
    "addBook": (()=>addBook),
    "dropBook": (()=>dropBook),
    "editBook": (()=>editBook),
    "getSubtopicsForBook": (()=>getSubtopicsForBook),
    "searchBookByTitle": (()=>searchBookByTitle),
    "searchBooksBySubtopic": (()=>searchBooksBySubtopic),
    "searchBooksByTopic": (()=>searchBooksByTopic)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$components$2f$connectToDB$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/app/components/connectToDB.tsx [app-client] (ecmascript)");
;
// Function to search for books by title
async function searchBookByTitle(title) {
    const connection = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$components$2f$connectToDB$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])();
    if (!connection) return;
    try {
        const [result] = await connection.execute("SELECT * FROM Books WHERE Title LIKE ?", [
            `%${title}%`
        ]);
        const books = result;
        if (books.length > 0) {
            console.log("Search Results:");
            for (const book of books){
                console.log(`Title: ${book.Title}`);
                console.log(`Author: ${book.Author}`);
                console.log(`ISBN: ${book.ISBN}`);
                console.log(`Description: ${book.BookDesc}`);
                console.log("-".repeat(40));
            }
        } else {
            console.log("No books found with that title.");
        }
    } catch (error) {
        console.error(`Error searching for book: ${error.message}`);
    } finally{
        await connection.end();
    }
}
// Function to validate author's name
function isValidAuthorName(author) {
    return /^[A-Za-z\s]+$/.test(author);
}
// Function to get subtopic ID
async function getSubtopicId(subtopicName, topicName, connection) {
    if (!connection) return null;
    const [topicResult] = await connection.execute("SELECT TopicID FROM Topics WHERE TopicName = ?", [
        topicName
    ]);
    const topic = topicResult[0];
    if (!topic) {
        console.log(`Topic '${topicName}' does not exist in the database.`);
        return null;
    }
    const [subtopicResult] = await connection.execute("SELECT SubtopicID FROM Subtopics WHERE SubtopicName = ? AND TopicID = ?", [
        subtopicName,
        topic.TopicID
    ]);
    const subtopic = subtopicResult[0];
    if (!subtopic) {
        console.log(`Subtopic '${subtopicName}' under topic '${topicName}' does not exist in the database.`);
        return null;
    }
    return subtopic.SubtopicID;
}
// Function to add a book with multiple topics and subtopics
async function addBook(title, author, isbn, description) {
    const connection = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$components$2f$connectToDB$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])();
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
        await connection.execute("INSERT INTO Books (Title, Author, ISBN, BookDesc) VALUES (?, ?, ?, ?)", [
            title,
            author,
            isbn,
            description
        ]);
        await connection.commit();
        console.log(`Book '${title}' added successfully.`);
        // Prompt for topics and subtopics
        while(true){
            const topicName = prompt("Enter topic name (or 'done' to finish): ");
            if (topicName && topicName.toLowerCase() === 'done') break;
            const subtopicName = prompt("Enter subtopic name (optional, press Enter to skip): ") || topicName;
            // Check if the topic and subtopic exist in the database
            const subtopicId = await getSubtopicId(subtopicName, topicName, connection);
            // Only link the book if the subtopic exists
            if (subtopicId) {
                await connection.execute("INSERT INTO Book_SubTopics (ISBN, SubtopicID) VALUES (?, ?)", [
                    isbn,
                    subtopicId
                ]);
                await connection.commit();
                console.log(`Linked '${title}' to topic '${topicName}' and subtopic '${subtopicName}'.`);
            } else {
                console.log(`Cannot link '${title}' to topic '${topicName}' and subtopic '${subtopicName}' as they are not found in the database.`);
            }
        }
    } catch (error) {
        console.error(`Error adding book: ${error.message}`);
    } finally{
        await connection.end();
    }
}
// Function to drop a book by title or ISBN
async function dropBook(titleOrIsbn) {
    const connection = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$components$2f$connectToDB$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])();
    if (!connection) return;
    try {
        const [bookResult] = await connection.execute("SELECT ISBN FROM Books WHERE Title = ?", [
            titleOrIsbn
        ]);
        const book = bookResult[0];
        if (!book) {
            console.log(`No book found with title: '${titleOrIsbn}'.`);
            return;
        }
        const isbn = book.ISBN;
        // Delete all related entries in Book_SubTopics
        await connection.execute("DELETE FROM Book_SubTopics WHERE ISBN = ?", [
            isbn
        ]);
        console.log(`Deleted all subtopic links for book with ISBN ${isbn}.`);
        // Delete the book itself
        await connection.execute("DELETE FROM Books WHERE ISBN = ?", [
            isbn
        ]);
        await connection.commit();
        console.log(`Book with ISBN ${isbn} deleted successfully.`);
    } catch (error) {
        console.error(`Error dropping book: ${error.message}`);
    } finally{
        await connection.end();
    }
}
async function editBook(searchTerm) {
    const connection = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$components$2f$connectToDB$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])();
    if (!connection) return;
    try {
        const [bookResult] = await connection.execute("SELECT * FROM Books WHERE Title = ?", [
            searchTerm
        ]);
        const book = bookResult[0];
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
        await connection.query("UPDATE Books SET title = ?, author = ?, isbn = ?, bookDesc = ? WHERE isbn = ?", [
            newTitle,
            newAuthor,
            newIsbn,
            newDescription,
            book.isbn
        ]);
        if (isIsbnChanging) {
            await connection.query("UPDATE Book_SubTopics SET ISBN = ? WHERE ISBN = ?", [
                newIsbn,
                book.isbn
            ]);
            await connection.query("UPDATE Book_Language SET ISBN = ? WHERE ISBN = ?", [
                newIsbn,
                book.isbn
            ]);
            console.log(`ISBN updated from '${book.isbn}' to '${newIsbn}' across all related tables.`);
        }
        await connection.query("SET FOREIGN_KEY_CHECKS=1");
        console.log("Book details updated successfully.");
        // Update subtopics (optional)
        const updateSubtopics = prompt("Would you like to update the subtopics associated with this book? (yes/no): ")?.toLowerCase();
        if (updateSubtopics === "yes") {
            const action = prompt("Choose an option:\n1) Delete all existing subtopics and add new ones\n2) Add new subtopics to existing ones\n3) Leave existing subtopics as is\nEnter 1, 2, or 3: ");
            if (action === '1') {
                await connection.query("DELETE FROM Book_SubTopics WHERE ISBN = ?", [
                    newIsbn
                ]);
                console.log("Existing subtopics cleared. Please add new subtopics.");
                while(true){
                    const topicName = prompt("Enter topic name (or 'done' to finish): ");
                    if (!topicName || topicName.toLowerCase() === 'done') break;
                    const subtopicName = prompt("Enter subtopic name (optional, press Enter to skip): ") || topicName;
                    const subtopicId = await getSubtopicId(subtopicName, topicName, connection);
                    if (subtopicId) {
                        await connection.query("INSERT INTO Book_SubTopics (ISBN, SubtopicID) VALUES (?, ?)", [
                            newIsbn,
                            subtopicId
                        ]);
                        console.log(`Linked '${newTitle}' to topic '${topicName}' and subtopic '${subtopicName}'.`);
                    } else {
                        console.log(`Cannot link '${newTitle}' to topic '${topicName}' and subtopic '${subtopicName}' as they are not found in the database.`);
                    }
                }
            } else if (action === '2') {
                console.log("Adding additional subtopics without deleting existing ones.");
                while(true){
                    const topicName = prompt("Enter topic name (or 'done' to finish): ");
                    if (!topicName || topicName.toLowerCase() === 'done') break;
                    const subtopicName = prompt("Enter subtopic name (optional, press Enter to skip): ") || topicName;
                    const subtopicId = await getSubtopicId(subtopicName, topicName, connection);
                    if (subtopicId) {
                        await connection.query("INSERT INTO Book_SubTopics (ISBN, SubtopicID) VALUES (?, ?)", [
                            newIsbn,
                            subtopicId
                        ]);
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
    } finally{
        connection.end();
    }
}
// Find all books related to a given topic
async function searchBooksByTopic(topicName) {
    const connection = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$components$2f$connectToDB$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])();
    if (!connection) {
        console.error("Failed to connect to the database.");
        return;
    }
    try {
        // Find the topic ID
        const [topicRows] = await connection.execute("SELECT TopicID FROM Topics WHERE TopicName = ?", [
            topicName
        ]);
        if (Array.isArray(topicRows) && topicRows.length === 0) {
            console.log(`No topic found with name '${topicName}'.`);
            return;
        }
        const topicId = topicRows[0].TopicID;
        // Find all books linked to the topic through subtopics
        const [bookRows] = await connection.execute(`
          SELECT b.Title, b.Author, b.ISBN, b.BookDesc
          FROM Books b
          JOIN Book_SubTopics bs ON b.ISBN = bs.ISBN
          JOIN Subtopics s ON bs.SubtopicID = s.SubtopicID
          WHERE s.TopicID = ?
          `, [
            topicId
        ]);
        // Display results
        if (Array.isArray(bookRows) && bookRows.length > 0) {
            console.log(`Books related to topic '${topicName}':`);
            bookRows.forEach((book)=>{
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
    } finally{
        await connection.end();
    }
}
async function getSubtopicsForBook(bookTitle) {
    const connection = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$components$2f$connectToDB$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])();
    if (!connection) {
        console.error("Failed to connect to the database.");
        return "";
    }
    try {
        const [bookResults] = await connection.execute("SELECT ISBN FROM Books WHERE Title = ?", [
            bookTitle
        ]);
        if (Array.isArray(bookResults) && bookResults.length === 0) {
            console.log(`No book found with title '${bookTitle}'.`);
            return "";
        }
        const book = bookResults[0];
        const ISBN = book.ISBN;
        const [subtopicResults] = await connection.execute(`
            SELECT s.SubtopicName
            FROM Subtopics s
            JOIN Book_SubTopics bs ON s.SubtopicID = bs.SubtopicID
            WHERE bs.ISBN = ?
            `, [
            ISBN
        ]);
        if (Array.isArray(subtopicResults) && subtopicResults.length > 0) {
            return JSON.stringify(subtopicResults);
        } else {
            return "";
        }
    } catch (error) {
        console.error(`Database error: ${error}`);
        return "";
    } finally{
        await connection.end();
    }
}
// Find all books related to a given subtopic
async function searchBooksBySubtopic(subtopicName) {
    const connection = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$components$2f$connectToDB$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])();
    if (!connection) {
        console.error("Failed to connect to the database.");
        return "";
    }
    try {
        // Find the subtopic ID
        const [subtopicRows] = await connection.execute("SELECT SubtopicID FROM Subtopics WHERE SubtopicName = ?", [
            subtopicName
        ]);
        if (Array.isArray(subtopicRows) && subtopicRows.length === 0) {
            console.log(`No subtopic found with name '${subtopicName}'.`);
            return "";
        }
        const subtopicId = subtopicRows[0].SubtopicID;
        // Find all books linked to the subtopic
        const [bookRows] = await connection.execute(`
          SELECT b.Title, b.Author, b.ISBN, b.BookDesc
          FROM Books b
          JOIN Book_SubTopics bs ON b.ISBN = bs.ISBN
          WHERE bs.SubtopicID = ?
          `, [
            subtopicId
        ]);
        if (Array.isArray(bookRows) && bookRows.length > 0) {
            return JSON.stringify(bookRows);
        } else {
            return "";
        }
    // Display results
    } catch (error) {
        console.error("Error searching for books:", error);
        return "";
    } finally{
        await connection.end();
    }
}
async function getTopicsForBook(bookTitle) {
    const connection = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$components$2f$connectToDB$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])();
    if (!connection) {
        console.error("Failed to connect to the database.");
        return [];
    }
    try {
        // Get the ISBN for the given book title
        const [bookResults] = await connection.execute("SELECT ISBN FROM Books WHERE Title = ?", [
            bookTitle
        ]);
        if (Array.isArray(bookResults) && bookResults.length === 0) {
            console.log(`No book found with title '${bookTitle}'.`);
            return [];
        }
        const book = bookResults[0];
        const ISBN = book.ISBN;
        // Get topics linked to this ISBN through subtopics
        const [topicResults] = await connection.execute(`
            SELECT DISTINCT t.TopicName
            FROM Topics t
            JOIN Subtopics s ON t.TopicID = s.TopicID
            JOIN Book_SubTopics bs ON s.SubtopicID = bs.SubtopicID
            WHERE bs.ISBN = ?
            `, [
            ISBN
        ]);
        if (Array.isArray(topicResults) && topicResults.length > 0) {
            return topicResults.map((row)=>row.TopicName);
        } else {
            return [];
        }
    } catch (error) {
        console.error(`Database error: ${error}`);
        return [];
    } finally{
        await connection.end();
    }
}
;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_refresh__.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/app/components/filters/search.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, k: __turbopack_refresh__, m: module, z: require } = __turbopack_context__;
{
__turbopack_esm__({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$components$2f$tagTableSearch$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/app/components/tagTableSearch.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_refresh__.signature();
"use client";
;
;
const SearchBlock = ()=>{
    _s();
    const [selectedTags, setSelectedTags] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    let test = selectedTags[0];
    const searchSubmit = async (event)=>{
        return test;
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex fixed left-0 h-full bg-slate-200 overscroll-contain w-48 grid grid-cols-1 justify-top",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
            onSubmit: searchSubmit,
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                    className: "grow-0",
                    children: "Search"
                }, void 0, false, {
                    fileName: "[project]/src/app/components/filters/search.tsx",
                    lineNumber: 22,
                    columnNumber: 17
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    children: "Search by Tags"
                }, void 0, false, {
                    fileName: "[project]/src/app/components/filters/search.tsx",
                    lineNumber: 24,
                    columnNumber: 17
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$components$2f$tagTableSearch$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                    fileName: "[project]/src/app/components/filters/search.tsx",
                    lineNumber: 25,
                    columnNumber: 17
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    type: "submit",
                    children: "Submit"
                }, void 0, false, {
                    fileName: "[project]/src/app/components/filters/search.tsx",
                    lineNumber: 26,
                    columnNumber: 17
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/components/filters/search.tsx",
            lineNumber: 21,
            columnNumber: 13
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/app/components/filters/search.tsx",
        lineNumber: 20,
        columnNumber: 9
    }, this);
};
_s(SearchBlock, "WjClRnNbCfzwDQXQDzhy1xyjpDE=");
_c = SearchBlock;
const __TURBOPACK__default__export__ = SearchBlock;
var _c;
__turbopack_refresh__.register(_c, "SearchBlock");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_refresh__.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/app/search/page.tsx [app-rsc] (ecmascript, Next.js server component, client modules)": ((__turbopack_context__) => {

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, t: require } = __turbopack_context__;
{
}}),
}]);

//# sourceMappingURL=src_app_d35dec._.js.map