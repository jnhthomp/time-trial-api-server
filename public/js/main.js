// // Select important html elements
// const deleteBtn = document.querySelectorAll('.del') // Get and store all delete buttons from the page (or elements with '.del' class)
// const todoItem = document.querySelectorAll('span.not') // Get and store all spans with the '.not' class from the page
// const todoComplete = document.querySelectorAll('span.completed') // Get and store all spans with the '.completed' class from the page

// // Add event listeners to elements
// // Delete action click event listener
// Array.from(deleteBtn).forEach((el) => { // Create an array and loop through each element
//   el.addEventListener('click', deleteTodo) // Add event listener to element
// })

// Array.from(todoItem).forEach((el)=>{ // Create an array and loop through each element
//   el.addEventListener('click', markComplete) // Add event listener to element
// })

// Array.from(todoComplete).forEach((el)=>{ // Create an array and loop through each element
//   el.addEventListener('click', markIncomplete) // Add event listener to element
// })


// // Delete clicked action
// async function deleteTodo(){
//   const todoId = this.parentNode.dataset.id // get and store the data-id of the clicked element (matches mongodb id)
//   try{
//     // Fetch request to router to trigger delete action
//     const response = await fetch('todos/deleteTodo', {
//       method: 'delete',
//       headers: {'Content-type': 'application/json'},
//       body: JSON.stringify({
//           // Include id of document to delete
//           'todoIdFromJSFile': todoId
//       })
//     })
  

//     const data = await response.json() // Convert response from fetch request to data object
//     console.log(data) // Log resonse data object to console
//     location.reload() // reload the page to trigger new '/todos' request and refresh list of tasks
//   }catch(err){ // error handling for above requests
//     console.log(err) // log error to the console
//   }
// }

// // Mark complete click action
// async function markComplete(){
//     const todoId = this.parentNode.dataset.id // get and store the data-id of the clicked element (matches mongdb id)
//     try{
//         // fetch request to router to trigger update action
//         const response = await fetch('todos/markComplete', {
//             method: 'put',
//             headers: {'Content-type': 'application/json'},
//             body: JSON.stringify({
//               // Include id of document to update
//               'todoIdFromJSFile': todoId
//             })
//         })

//         const data = await response.json() // Convert response from fetch request to data object
//         console.log(data) // log response data object to console
//         location.reload() // reload the page to trigger new '/todos' request and refresh list of tasks
//     }catch(err){ // Error handling for the above requests
//         console.log(err) // Log error to the console
//     }
// }


// // Mark incomplete click action
// async function markIncomplete(){
//     const todoId = this.parentNode.dataset.id // get and store the data-id of the clicked element (matches mongdb id)
//     try{
//         // fetch request to router to trigger update action
//         const response = await fetch('todos/markIncomplete', {
//             method: 'put',
//             headers: {'Content-type': 'application/json'},
//             body: JSON.stringify({
//                 // Include id of document to update
//                 'todoIdFromJSFile': todoId
//             })
//         })

//         const data = await response.json() // Convert response from fetch request to data object
//         console.log(data) // Log response data object to console
//         location.reload() // reload the page to trigger new 'todos request and refresh list of tasks
//     }catch(err){ // Error handling for the above requests
//         console.log(err) // Log error to the console
//     }
// }