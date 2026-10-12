
// CampusFind - JavaScript

// 1. Sample items
let sampleItems = [
    { name: "Blue Water Bottle", status: "Lost", location: "Library" },
    { name: "Wireless Earbuds", status: "Found", location: "Computer Lab" },
    { name: "Data Structures Book", status: "Lost", location: "Classroom" }
];

// 2. Load items from LocalStorage
let savedItems = localStorage.getItem("campusItems");
let items;

if (savedItems === null) {
    items = sampleItems;
    localStorage.setItem("campusItems", JSON.stringify(items));
} else {
    items = JSON.parse(savedItems);
}

// 3. Display items on the webpage
function displayItems(list) {
    let itemArea = document.getElementById("items");
    itemArea.innerHTML = "";

    if (list.length === 0) {
        itemArea.textContent = "No items found!";
        return;
    }

    for (let i = 0; i < list.length; i++) {
        let paragraph = document.createElement("p");

        paragraph.textContent =
            list[i].name + " - " +
            list[i].status + " - " +
            list[i].location;

        itemArea.appendChild(paragraph);
    }
}

// 4. Search items by name, status or location
function searchItems() {
    let searchText = document
        .getElementById("search")
        .value.toLowerCase();

    let results = [];

    for (let i = 0; i < items.length; i++) {
        let itemText =
            items[i].name + " " +
            items[i].status + " " +
            items[i].location;

        if (itemText.toLowerCase().includes(searchText)) {
            results.push(items[i]);
        }
    }

    displayItems(results);
}

// 5. Handle the report form
document.getElementById("itemForm").addEventListener("submit", function(event) {
    event.preventDefault();

    let name = document.getElementById("itemName").value.trim();
    let status = document.getElementById("status").value;
    let location = document.getElementById("location").value.trim();

    if (name === "" || location === "") {
        alert("Please fill in all fields.");
        return;
    }

    let newItem = {
        name: name,
        status: status,
        location: location
    };

    items.push(newItem);

    // Save the updated list
    localStorage.setItem("campusItems", JSON.stringify(items));

    // Show all items and clear the form
    displayItems(items);
    document.getElementById("itemForm").reset();

    alert("Item reported successfully!");
});

// 6. Display items when the page opens
displayItems(items);
