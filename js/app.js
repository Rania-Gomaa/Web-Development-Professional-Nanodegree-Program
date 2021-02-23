/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/**
 * Define Global Variables
 * 
*/
const allSections = document.querySelectorAll("section");
const unorderedList = document.getElementById("navbar__list");
// build the whole thing in a document fragment for the sake of performance
const fragment = document.createDocumentFragment(); 
// timer for the hide/show navbar
let timer = null;

const toTopBtn = document.getElementById("scrollBtn");
const headerCheck = document.querySelector(".main__hero");

/**
 * End Global Variables
 * Start Helper Functions
 * 
*/



/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

// build the nav

//loop over all sections whatever their number - dynamic -
allSections.forEach(section => {
    const listItem = document.createElement("li");
    //create a link 
    const anchor = document.createElement("a");
    anchor.textContent = section.getAttribute("data-nav");
    anchor.setAttribute("href", '#'+ section.getAttribute("id"));
    listItem.appendChild(anchor);
    fragment.appendChild(listItem);

});

unorderedList.appendChild(fragment);

// get all links to be used in activeSection function
const anchors = document.querySelectorAll('ul a');



// Add class 'active' to section when near top of viewport
// Add class 'active' to the anchor related to the active section
function activeSection(){

    allSections.forEach(section => {
        
        if(section.classList.contains('active')){
            section.classList.remove('active');
        };

        const boundaries = section.getBoundingClientRect();
        //condition to distingush the section in viewport based on trial&error and 
        //element.scrollHeight which is a measurement of the height of an element's content
        //to avoid overlapping between activated sections
        //if(boundaries.top > -30 && boundaries.top <= 550){}
        //or using the following condition for a more generic solution
        if(boundaries.top >=0 && boundaries.bottom <= (window.innerHeight || document.documentElement.clientHeight)){    
            section.classList.add('active');
            anchors.forEach(function(anch){
                
                if(anch.classList.contains('active')){
                    anch.classList.remove("active");
                };

                if(anch.textContent === section.getAttribute("data-nav")){
                    anch.classList.add("active");
                };
        
            });
            
        };
    });    
};    



// Scroll to anchor href

function jumbToSection(evt){
    // make sure the user clicked on the anchor element not the navigation bar at general
    if(evt.target.nodeName === 'A'){
        evt.preventDefault();
        // detect the desired section 
        let toSection = evt.target.getAttribute("href");
        // get rid of the #
        toSection = toSection.substring(1);
        const selectedSection = document.getElementById(toSection)
        selectedSection.scrollIntoView({behavior:'smooth', block: 'center'});
    };
   
};

// As scroll occurs this function is invoked
//the navbar get hidden and a timer is set to show it after 100ms
//in case the user is still scrolling the timer get cleared and the navbar won't appear

function showHideNavBar(){

    showHideScrollBtn();
    unorderedList.style.display = "none"
    if(timer !== null) {
        clearTimeout(timer);        
    };
    timer = setTimeout(function() {
        unorderedList.style.display = "flex"
        

    }, 100);

};

//to top button appears only when scrolling down for example 100 px from the top
function showHideScrollBtn(){
    if(document.body.scrollTop > 100 || document.documentElement.scrollTop > 100){
        toTopBtn.style.display = "block";
    } else{
        toTopBtn.style.display = "none";

    }
};

function clickToTop(){

    window.scrollTo({top:0, behavior: "smooth"});
};




/**
 * End Main Functions
 * Begin Events
 * 
*/
document.addEventListener("scroll", activeSection);
unorderedList.addEventListener('click', jumbToSection);
window.addEventListener('scroll', showHideNavBar);
toTopBtn.addEventListener('click', clickToTop);

