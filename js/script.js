'use strict'
/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/
   
// Study guide for this project - https://drive.google.com/file/d/1OD1diUsTMdpfMDv677TfL1xO2CEkykSz/view?usp=sharing

// Get page elements
const page = document.querySelector('.page');
const pageHeader = document.querySelector('.page-header');
const studentList = document.querySelectorAll('.student-list');
const students = document.querySelectorAll('.student-item');
const studentsPerPage = 10;

// Create search HTML
const searchDiv = document.createElement('div');
searchDiv.setAttribute('class', 'student-search');
const searchBox = document.createElement('input');
searchBox.setAttribute('placeholder', 'Search for students...');
const searchSubmit = document.createElement('button');
searchSubmit.textContent = 'Search';
// Append search elements to DIV and Page Header
searchDiv.appendChild(searchBox);
searchDiv.appendChild(searchSubmit);
pageHeader.appendChild(searchDiv);

// Show or hide list of students depending on page
const showPage = (list, page) => {
   const listArray = Array.from(list);
   const firstItemToShow = page * 10 - 10;
   const lastItemToShow = firstItemToShow + studentsPerPage - 1;

   for (let i = 0; i < listArray.length; i++) {
      if ((i >= firstItemToShow) && (i <= lastItemToShow)) {
         listArray[i].style.display = '';
      } else {
         listArray[i].style.display = 'none';
      }
   }
}

showPage(students, 1);

/*** 
   Create the `appendPageLinks function` to generate, append, and add 
   functionality to the pagination buttons.
***/

const div = document.createElement('div');
div.className = 'pagination';
page.appendChild(div);
const ul = document.createElement('ul');
div.appendChild(ul);

// Create no filter results warning message
const noMatchDisplay = document.createElement('p');
const noMatchContent = document.createTextNode('No matches found, please try again');
noMatchDisplay.style.display ='none';
noMatchDisplay.appendChild(noMatchContent);
div.appendChild(noMatchDisplay);

const appendPageLinks = (list) => {
  const arrayList = Array.from(list);
  const pagesLinksNeeded = Math.floor(arrayList.length / studentsPerPage) + 1;
  
  // Check to see if pagination links exist and remove if they do
  if (ul.hasChildNodes) {
     while (ul.firstChild) {
        ul.removeChild(ul.firstChild);
     }
  }

  // Dynamically create pagination links and append
  for (let i = 0; i < pagesLinksNeeded; i++) {
   const li = document.createElement('li');
   const a = document.createElement('a');
   a.setAttribute('class' , '');
   a.textContent = i + 1;
   li.appendChild(a);
   ul.appendChild(li);
  }

  // Get all created a elements
  const aTags = document.getElementsByTagName('a');
  
  // Set first page link to active 
  aTags[0].classList.add('active');

  // Loops over pagination links, removes active class and sets active to clicked linked
  const updateLinkClass = (e) => {
     for (let link of aTags) {
        link.classList.remove('active');
        }
      e.target.classList.add('active');
     }

   // Add an event listener to each a tag
   for (let link of aTags) {
      link.addEventListener('click', function(e) {
         showPage(students, e.target.textContent), 
         updateLinkClass(e)
      });
    }
  }

/* Filter list of students from search input */
appendPageLinks(students);
const filterInput = document.getElementsByTagName('input')[0];
const filterStudents = () => {
   const filteredArrayList = [];
   const filterValue = filterInput.value.toUpperCase();
   for (let i = 0; i < students.length; i++) {
      let name = students[i].getElementsByTagName('h3')[0];
      if (name.innerHTML.toUpperCase().indexOf(filterValue) > -1){
         students[i].style.display = '';
         filteredArrayList.push(students[i])
      } else {
         students[i].style.display = 'none';
      }
   }
   if (filteredArrayList.length === 0) {
      if (ul.hasChildNodes) {
         while (ul.firstChild) {
            ul.removeChild(ul.firstChild);
         }
      }
   } else {
      showPage(filteredArrayList, 1);
      appendPageLinks(filteredArrayList);
   }
   noResults(filteredArrayList)
}

// display no matches heads up
const noResults = (list) => {
   if (list.length === 0) {
      noMatchDisplay.style.display = '';
   } else {
      noMatchDisplay.style.display = 'none';
   }
}

filterInput.addEventListener('keyup', filterStudents);
searchSubmit.addEventListener('click', filterStudents);