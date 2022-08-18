let data;

// getting the section we need to change
let section = document.querySelector(".explain_");


let courses = ["Python", "AWS", "Data Science", "Excel", "Web Development", "JavaScript", "Drawing"]

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

    build_cards(course);
}


// building courses
function build_cards(course = "", search = undefined){
    let cards_container = document.createElement("section");
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
        if(search != undefined) course = item;
        if(item == course){
            for(const item in data.record[course].courses){
                if(search != undefined){
                    let title = data.record[course].courses[item].title;
                    title = title.toLowerCase()
                    search = search.toLowerCase()
                    if(!title.includes(search)) continue;
                }

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

    let ratingcontainer = document.createElement("div");
    ratingcontainer.className = "rating_";
                
    let rate = document.createElement("span");     
    let ratetxt = document.createTextNode(data.record[course].courses[item].rating.toFixed(2) + " "); 
    rate.appendChild(ratetxt);

    let star1 = document.createElement("span");
    star1.className = "fa fa-star";
    let star2 = document.createElement("span");
    star2.className = "fa fa-star";
    let star3 = document.createElement("span");
    star3.className = "fa fa-star";
    let star4 = document.createElement("span");
    star4.className = "fa fa-star";
    let star5 = document.createElement("span");
    star5.className = "fa fa-star-half-stroke";
    ratingcontainer.appendChild(rate);
    ratingcontainer.appendChild(star1);
    ratingcontainer.appendChild(star2);
    ratingcontainer.appendChild(star3);
    ratingcontainer.appendChild(star4);
    ratingcontainer.appendChild(star5);

    let price = document.createElement("span")
    let pricetxt = document.createTextNode('$' + data.record[course].courses[item].price)
    price.appendChild(pricetxt);

    datacontainer.appendChild(image);
    datacontainer.appendChild(heading);
    datacontainer.appendChild(names);
    datacontainer.appendChild(ratingcontainer);
    datacontainer.appendChild(price);

    cardlink.appendChild(datacontainer);

    return cardlink;
}



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


// featch the data on loading 
fetchdata();





