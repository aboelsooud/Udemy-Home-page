let data;

// getting the section we need to change
let section = document.querySelector(".explain");


let courses = ["Python", "AWS", "Data Science", "Excel", "Web Development", "JavaScript", "Drawing"]

let cur_course = "Python";

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
    cards_container = document.createElement("section");
    cards_container.className = "container";
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
                
                let instructor = "";
                for(const instr in data.record[course].courses[item].instructors){
                    instructor += data.record[course].courses[item].instructors[instr].name + ', ';
                }
                instructor = instructor.slice(0, -2);

                cardlink = document.createElement("a");
                cardlink.href = "";
                cards_container.className = "container";
                datacontainer = document.createElement("div");
                datacontainer.className = "course";

                image = document.createElement("img");
                image.src = data.record[course].courses[item].image;
                image.alt = "course thumbnail";
                image.className = "thumb";
                
                heading = document.createElement("h4");
                headingtxt = document.createTextNode(data.record[course].courses[item].title);
                heading.appendChild(headingtxt);
                
                names = document.createElement("p")
                namestxt = document.createTextNode(instructor);
                names.appendChild(namestxt);

                ratingcontainer = document.createElement("div");
                ratingcontainer.className = "rating";
                
                rate = document.createElement("span");     
                ratetxt = document.createTextNode(data.record[course].courses[item].rating.toFixed(2) + " "); 
                rate.appendChild(ratetxt);

                star1 = document.createElement("span");
                star1.className = "fa fa-star";
                star2 = document.createElement("span");
                star2.className = "fa fa-star";
                star3 = document.createElement("span");
                star3.className = "fa fa-star";
                star4 = document.createElement("span");
                star4.className = "fa fa-star";
                star5 = document.createElement("span");
                star5.className = "fa fa-star-half-stroke";
                ratingcontainer.appendChild(rate);
                ratingcontainer.appendChild(star1);
                ratingcontainer.appendChild(star2);
                ratingcontainer.appendChild(star3);
                ratingcontainer.appendChild(star4);
                ratingcontainer.appendChild(star5);

                price = document.createElement("span")
                pricetxt = document.createTextNode('$' + data.record[course].courses[item].price)
                price.appendChild(pricetxt);

                datacontainer.appendChild(image);
                datacontainer.appendChild(heading);
                datacontainer.appendChild(names);
                datacontainer.appendChild(ratingcontainer);
                datacontainer.appendChild(price);

                cardlink.appendChild(datacontainer);


                cards_container.appendChild(cardlink);
            }
        }
    }
    section.appendChild(cards_container);
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
    <h2>Your search results for "${searchvalue}" are: </h2>
    <br><br>
    `
    section.innerHTML += description;
    build_cards("", searchvalue);
}

// search on submit in search bar
document.forms[0].onsubmit = function(e){
    e.preventDefault();
    let searchvalue = document.querySelector("[class = 'search-field']").value;
    build_search(searchvalue);
}   

// featch the data on loading 
fetchdata();