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

// Dynamically create search HTML
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
   const firstItemToShow = page * 10 - 10;
   const lastItemToShow = firstItemToShow + studentsPerPage - 1;

   for (let i = 0; i < list.length; i++) {
      if ((i >= firstItemToShow) && (i <= lastItemToShow)) {
         list[i].style.display = '';
      } else {
         list[i].style.display = 'none';
      }
   }
}

showPage(students, 1);

/*** 
   Create the `appendPageLinks function` to generate, append, and add 
   functionality to the pagination buttons.
***/

const appendPageLinks = (list) => {
  
  const pagesLinksNeeded = Math.floor(list.length / studentsPerPage) + 1;
  
  const div = document.createElement('div');
  div.className = 'pagination';
  page.appendChild(div);
  const ul = document.createElement('ul');
  div.appendChild(ul);
  
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

appendPageLinks(students);

const filterInput = document.getElementsByTagName('input')[0];

/* Think instead of getting list items (lis) i first need to get the ul element and then the 
indivdual items under that. And use that to pass into the other functions 
That way i'll be able to append filter list items
to the a new parent ul and then pass that into the append page function */

const filterStudents = () => {
   //const filteredList;
   const filterValue = filterInput.value.toUpperCase();
   for (let i = 0; i < students.length; i++) {
      let name = students[i].getElementsByTagName('h3')[0];
      if (name.innerHTML.toUpperCase().indexOf(filterValue) > -1){
         students[i].style.display = '';
         //filteredList.appendChild(students[i])
      } else {
         students[i].style.display = 'none';
      }
   }
   //appendPageLinks(filteredList);
}

filterInput.addEventListener('keyup', filterStudents);


