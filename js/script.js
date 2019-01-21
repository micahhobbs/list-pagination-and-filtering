/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/
   
// Study guide for this project - https://drive.google.com/file/d/1OD1diUsTMdpfMDv677TfL1xO2CEkykSz/view?usp=sharing

const page = document.querySelector('.page');
const studentList = document.querySelectorAll('.student-list');
const students = document.querySelectorAll('.student-item');
const studentsPerPage = 10;

const showPage = (list, page) => {
   const firstItemToShow = page * 10 - 10;
   const lastItemToShow = firstItemToShow + studentsPerPage - 1;

   for (let i = 0; i < list.length; i++) {
      if ((i >= firstItemToShow) && (i <= lastItemToShow)) {
         list[i].style.visibility = 'visible';
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
  
  // Dynamically create pagination links qs
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

showPage(students, 1);
appendPageLinks(students);