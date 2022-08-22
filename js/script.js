let data;
// getting the section we need to change
const section = document.querySelector(".explain_");
const courses = ["Python", "AWS", "Data Science", "Excel", "Web Development", "JavaScript", "Drawing"]
let cur_course = "Python", n = 4;

//getting data from api and storing it data variable
function fetchdata(){
    const response = fetch("https://api.jsonbin.io/v3/b/62fa4cbfe13e6063dc7c1810")
    .then(response => response.json())
    .then(res =>{
        data = res;
        //build the courses of the defult topic "python"
        build_description(cur_course);
    });
}

//build the description and the button above the courses
function build_description(course){
    section.innerHTML = "";
    const description = `
        <h3>${data.record[course].header}</h3>
        <p>${data.record[course].description}</p>
        <a href=""><b>Explore ${course}</b></a>
    `
    section.innerHTML += description;
    //build courses cards
    build_cards(course);
}

// building courses
function build_cards(course = "", search = undefined){
    //container of cards
    let cards_container = document.createElement("section");
    //carousel attributes
    cards_container.className = "container_ carousel slide";
    cards_container.id = "carouselHeader";
    cards_container.setAttribute("data-ride", "carousel");
    cards_container.setAttribute("data-interval", "false");
    let car_inner = document.createElement("div");
    car_inner.className = "carousel-inner";
    let f = true;
    let carouselitem = document.createElement("div");
    carouselitem.className = "carousel-item active";
    let carddds = document.createElement("div")
    carddds.className = "cards_"
    let counter = 0;
    // building cards
    for(const item of courses){
        //check if we build cards for search or not
        if(search != undefined) course = item;
        if(item == course){
            for(const item in data.record[course].courses){
                // check if search word is included
                if(search != undefined){
                    let title = data.record[course].courses[item].title;
                    title = title.toLowerCase()
                    search = search.toLowerCase()
                    if(!title.includes(search)) continue;
                }
                // build an carousel item depending on the number of cards that should be on screen
                if(counter == n){
                    carouselitem.appendChild(carddds);
                    car_inner.appendChild(carouselitem);
                    carouselitem = document.createElement("div");
                    carouselitem.className = "carousel-item";
                    carddds = document.createElement("div");
                    carddds.className = "cards_";
                    counter = 0;
                }
                counter++;
                let cardlink = build_card(course, item);
                carddds.appendChild(cardlink);
            }
        }
    }
    if(counter != 0){
        carouselitem.appendChild(carddds);
        car_inner.appendChild(carouselitem);
    }

    //build carousel buttons
    cards_container.appendChild(car_inner);
    let button = document.createElement("button");
    button.className = "carousel-control-prev";
    button.type = "button";
    button.setAttribute("data-bs-target", "#carouselHeader");
    button.setAttribute("data-bs-slide", "prev");
    let span1 = document.createElement("span");
    span1.className = "carousel-control-prev-icon";
    span1.setAttribute("aria-hidden","true")
    let span2 = document.createElement("span");
    span2.className = "visually-hidden";
    let spantxt = document.createTextNode("Previous");
    span2.appendChild(spantxt);
    button.appendChild(span1);
    button.appendChild(span2);
    cards_container.appendChild(button);
    button = document.createElement("button");
    button.className = "carousel-control-next";
    button.type = "button";
    button.setAttribute("data-bs-target", "#carouselHeader");
    button.setAttribute("data-bs-slide", "next");
    span1 = document.createElement("span");
    span1.className = "carousel-control-next-icon";
    span1.setAttribute("aria-hidden","true")
    span2 = document.createElement("span");
    span2.className = "visually-hidden";
    spantxt = document.createTextNode("Next");
    span2.appendChild(spantxt);
    button.appendChild(span1);
    button.appendChild(span2);
    cards_container.appendChild(button);
    section.appendChild(cards_container);
}

//build course card
function build_card(course, item){
    let instructor = "";
    for(const instr in data.record[course].courses[item].instructors){
        instructor += data.record[course].courses[item].instructors[instr].name + ', ';
    }
    instructor = instructor.slice(0, -2);
    let cardlink = document.createElement("a");
    cardlink.href = "";
    cardlink.className = "course-cards_";
    let datacontainer = document.createElement("div");
    datacontainer.className = "course_";
    let image = document.createElement("img");
    image.src = data.record[course].courses[item].image;
    image.alt = "course thumbnail";
    image.className = "thumb_";
    let heading = document.createElement("h6");
    let headingtxt = document.createTextNode(data.record[course].courses[item].title);
    heading.appendChild(headingtxt);
    let names = document.createElement("p")
    let namestxt = document.createTextNode(instructor);
    names.appendChild(namestxt);
    let rate = document.createElement("span");  
    rate.className = "rate-num";   
    let ratetxt = document.createTextNode(data.record[course].courses[item].rating.toFixed(2) + " "); 
    rate.appendChild(ratetxt);
    let ratingcontainer = document.createElement("div");
    ratingcontainer.className = "stars-outer";
    let starsconatiner = document.createElement("div");
    starsconatiner.className = "stars-inner";
    const rate_percentage = (data.record[course].courses[item].rating.toFixed(2) / 5) * 100;
    const s = rate_percentage.toFixed(2) + '%';
    starsconatiner.setAttribute("style", "width: " + s);
    ratingcontainer.appendChild(starsconatiner);
    let price = document.createElement("div")
    let pricetxt = document.createTextNode('$' + data.record[course].courses[item].price)
    price.appendChild(pricetxt);
    datacontainer.appendChild(image);
    datacontainer.appendChild(heading);
    datacontainer.appendChild(names);
    datacontainer.appendChild(rate)
    datacontainer.appendChild(ratingcontainer);
    datacontainer.appendChild(price);
    cardlink.appendChild(datacontainer);
    return cardlink;
}

// media query for number of course cards
function changeMediaQuery(){
    function change4(four){
        if(four.matches){
            n = 4;
        }
    }

    function change3(three){
        if(three.matches){
            n = 3;
        }
    }

    function change2(two){
        if(two.matches){
            n = 2;
        }
    }

    function change1(one){
        if(one.matches){
            n = 1;
        }
    }

    let four = window.matchMedia("(min-width: 1200px)");
    let three = window.matchMedia("(min-width: 800px) and (max-width: 1199px)");
    let two = window.matchMedia("(min-width: 550px) and (max-width: 799px)");
    let one = window.matchMedia("(min-width: 100px) and (max-width: 549px)");
    change1(one);
    change2(two);
    change3(three);
    change4(four);
    one.addListener(change1);
    two.addListener(change2);
    three.addListener(change3);
    four.addListener(change4);
}

// featch the data on loading 
fetchdata();

// change the courses when change the topic
for(const item in courses){
    const course = document.getElementById(courses[item]);
    course.addEventListener("change", function(){
        cur_course = course.id;
        build_description(cur_course);
    })
}

// building searching description
function build_search(searchvalue){
    section.innerHTML = "";
    const description = `
    <h3>Your search results for "${searchvalue}" are: </h3>
    <br><br>
    `
    section.innerHTML += description;
    build_cards("", searchvalue);
}

// search on submit in search bar
document.forms[0].onsubmit = function(e){
    e.preventDefault();
    let searchvalue = document.querySelector("[class = 'search-field_']").value;
    let x = searchvalue.split(' ').length - 1;
    // prevent searching on empty or only spaces values 
    if(searchvalue !== '' &&  x !== searchvalue.length){
        build_search(searchvalue);
    }
}   

changeMediaQuery();

// changing media query depending on resizeing the window
window.addEventListener("resize", function(){
    changeMediaQuery();
    let searchvalue = document.querySelector("[class = 'search-field_']").value;
    let x = searchvalue.split(' ').length - 1;
    // check if there is a search value
    if(searchvalue !== '' &&  x !== searchvalue.length){
        build_search(searchvalue);
    }else
        build_description(cur_course);
})
