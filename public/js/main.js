const deleteBtn = document.querySelectorAll('.del')
const postItem = document.querySelectorAll('span.not')
const searchBooks = document.getElementById('searchBooks')

// const todoComplete = document.querySelectorAll('span.completed')

Array.from(deleteBtn).forEach((el)=>{
    el.addEventListener('click', deletePost)
})

const submit = document.getElementById('submit')
const results = document.getElementById('results')
const moreResults = document.getElementById('moreResults')
const newSearch = document.getElementById('newSearch')
let numBooks = 0
let searchResults = []
let start = 0;
let finish = start + 3;

function countBooks() {

}

function showData(start, finish) {
  for (let i=start; i<finish; i++) {
    console.log(searchResults[i])
    let bookDetails = {
      title: searchResults[i].volumeInfo.title,
      authors: searchResults[i].volumeInfo.authors,
      thumbnail: searchResults[i].volumeInfo.imageLinks.thumbnail,
      pageCount: searchResults[i].volumeInfo.pageCount,
    }
    let thumb = document.createElement('img')
      thumb.src = bookDetails.thumbnail
      thumb.alt = bookDetails.title
    let input = document.createElement('input')
      input.type = 'radio'
      input.id = 'rd'+i
      input.name = 'foundBook'
      input.value = JSON.stringify(bookDetails)
    let label = document.createElement('label')
      label.for = bookDetails.title
      label.innerText = bookDetails.title
    let divRadio = document.createElement('div')
    divRadio.appendChild(input)
    divRadio.appendChild(label)
    let divCardBody = document.createElement('div')
    divCardBody.classList.add("card-body")
    divCardBody.appendChild(thumb)
    divCardBody.appendChild(divRadio)
    let divCard = document.createElement('div')
    divCard.classList.add("card")
    divCard.style.width = "18rem"
    divCard.appendChild(divCardBody)
    let divCol = document.createElement('div')
    divCol.classList.add("col-md-4")
    divCol.classList.add("d-flex")
    divCol.classList.add("justify-content-center")
    divCol.appendChild(divCard)
    results.appendChild(divCol)
  }
}

if (submit) {
  submit.addEventListener('click', searchGoogle)
}
if (moreResults) {
  moreResults.addEventListener('click', viewMoreResults)
}
if (newSearch) {
  newSearch.addEventListener('click', resetSearch)
}
/*
let showAccountDetails = false;
if (accountInfoMore) {
  accountInfoMore.addEventListener('click', toggleAccountDetails)
  accountInfoLess.addEventListener('click', toggleAccountDetails)
}
function toggleAccountDetails() {
  showAccountDetails = !showAccountDetails
  if (showAccountDetails) {
    document.getElementById('#accountInfoLess').classList.remove = 'hide'
    document.getElementById('#accountDetails').classList.remove = 'hide'
    document.getElementById('#accountInfoMore').classList.append = 'hide'
  } else {
    document.getElementById('#accountInfoLess').classList.append = 'hide'
    document.getElementById('#accountDetails').classList.append = 'hide'
    document.getElementById('#accountInfoMore').classList.append = 'hide'
  }
}
*/

function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

function viewMoreResults() {
  start += 3
  finish = start + 3
  showData(start,finish)
}

function searchGoogle() {
  const title = document.getElementById('title')
  const author = document.getElementById('author')
  const url = "https://www.googleapis.com/books/v1/volumes?q="
  console.log('here')

  fetch (url+title.value+author.value)
    .then(res => res.json())
    .then(data => {
      searchResults = data.items;
      document.getElementById('searchGoogle').style.display = 'none'
      document.getElementById('post').style.display = 'block'
      showData(start,finish)
    })
    .catch(err => {
      console.log('no results')
      console.log(`error ${err}`)
    })
}

function resetSearch() {
  removeAllChildNodes(results)
  title.innerText = ''
  author.innerText = ''
  document.getElementById('searchGoogle').style.display = 'block'
  document.getElementById('post').style.display = 'none'
}

  /* const xhr = new XMLHttpRequest
  xhr.onload = function() {
      // Process our return data
      if (xhr.status >= 200 && xhr.status < 300) {
        // This will run when the request is successful
        console.log('success!', xhr);
      } else {
        // This will run when it's not
        console.log('The request failed!');
      }
      // This will run either way
      // All three of these are optional, depending on what you're trying to do
      console.log('This always runs...');
    }
    xhr.open('GET', 'https://jsonplaceholder.typicode.com/posts');
    xhr.send(); */


// function deleteIndividualPost(){
//     console.log('OJB')
// }

async function deletePost(){
    const postId = this.parentNode.dataset.id
    console.log(postId)
    try{
        const response = await fetch('post/deletePost', {
            method: 'delete',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                'postIdFromJSFile': postId
            })
        })
        const data = await response.json()
        console.log(data)
        location.reload()
    }catch(err){
        console.log(err)
    }
}

const seeAllMyPosts = document.getElementById('seeAllPosts')
if (seeAllMyPosts) {
  seeAllMyPosts.addEventListener('click', seeAllPosts);
}


function seeAllPosts() {
  document.getElementById('recentPosts').style.display = "none";
  document.getElementById('allPosts').style.display = "flex";
  document.getElementById('allPosts').style.flexWrap = "wrap";
}

const seeLessMyPosts = document.getElementById('seeLessPosts')
if (seeLessMyPosts) {
  seeLessMyPosts.addEventListener('click', seeLessPosts);
}


function seeLessPosts() {
  document.getElementById('recentPosts').style.display = "flex";
  document.getElementById('allPosts').style.display = "none";
  document.getElementById('allPosts').style.flexWrap = "wrap";
}

// async function markComplete(){
//     const todoId = this.parentNode.dataset.id
//     try{
//         const response = await fetch('todos/markComplete', {
//             method: 'put',
//             headers: {'Content-type': 'application/json'},
//             body: JSON.stringify({
//                 'todoIdFromJSFile': todoId
//             })
//         })
//         const data = await response.json()
//         console.log(data)
//         location.reload()
//     }catch(err){
//         console.log(err)
//     }
// }

// async function markIncomplete(){
//     const todoId = this.parentNode.dataset.id
//     try{
//         const response = await fetch('todos/markIncomplete', {
//             method: 'put',
//             headers: {'Content-type': 'application/json'},
//             body: JSON.stringify({
//                 'todoIdFromJSFile': todoId
//             })
//         })
//         const data = await response.json()
//         console.log(data)
//         location.reload()
//     }catch(err){
//         console.log(err)
//     }
// }