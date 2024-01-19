
const inputBtn = document.getElementById("input-btn");
const deleteBtn = document.getElementById("delete-btn");
const tabBtn = document.getElementById("tab-btn");
let myLeads = [];
const inputEl = document.getElementById("input-el");
const ulEl = document.getElementById('ul-el');

const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"));

if(leadsFromLocalStorage){
    myLeads = leadsFromLocalStorage;
    render(myLeads);
};

inputBtn.addEventListener("click", function() {
    myLeads.push(inputEl.value);

    localStorage.setItem("myLeads", JSON.stringify(myLeads));

    inputEl.value = "";
    render(myLeads);

});

deleteBtn.addEventListener("dblclick", function() {
    localStorage.clear("myLeads");
    myLeads = [];
    render(myLeads);
});

tabBtn.addEventListener("click", function() {
    chrome.tabs.query({active : true, currentWindow : true}, function(tabs) {
        myLeads.push(tabs[0].url);
        localStorage.setItem("myLeads", JSON.stringify(myLeads));
        render(myLeads); 

    });

});

function render(leads) {
    let listItems = "";

    for(let i = 0; i < leads.length; i++){
        listItems +=  `
            <li>
                <a target='_blank' href='${leads[i]}'>
                    ${leads[i]}
                </a>
            </li>
        `;
        //ulEl.innerHTML += "<li>" + myLeads[i] + "</li>";
        //const li = document.createElement("li");
        //li.textContent = myLeads[i];
        //ulEl.append(li);
    }

    ulEl.innerHTML = listItems;
}

