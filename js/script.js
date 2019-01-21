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
const studentNameList = document.querySelectorAll('h3');
const searchValue = document.querySelector('input').value;
const searchButton = document.querySelector('button');
const studentsPerPage = 10;

// Dynamically create search HTML
const searchDiv = document.createElement('div');
searchDiv.setAttribute('class', 'student-search');
const searchInput = document.createElement('input');
searchInput.setAttribute('placeholder', 'Search for students...');
const searchButtonCreate = document.createElement('button');
searchButtonCreate.textContent = 'Search';
// Append search elements to DIV and Page Header
searchDiv.appendChild(searchInput);
searchDiv.appendChild(searchButtonCreate);
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
      link.addEventListener('click', function (e) {
         showPage(students, e.target.textContent), 
         updateLinkClass(e)
      });
    }
  }

// Button click event listener search
searchButton.addEventListener('click', function() {
   searchStudents(studentNameList, searchValue)
  });

// Keyup event listener search


const searchStudents = (list, searchInput) => {

}

showPage(students, 1);
appendPageLinks(students);
