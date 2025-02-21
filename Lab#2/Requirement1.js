// Inventory arrays
var items = [], transactions = [], categories = [], customFields = {};

// Function to perform various inventory operations
function doStuff(action, data) {
    switch (action) {
        case "addItem":
            addItem(data);
            break;
        case "editItem":
            editItem(data);
            break;
        case "removeItem":
            removeItem(data);
            break;
        case "sellItem":
            sellItem(data);
            break;
        case "restockItem":
            restockItem(data);
            break;
        case "searchItems":
            searchItems(data);
            break;
        case "viewInventory":
            viewInventory();
            break;
        case "exportAllItems":
            exportAllItems();
            break;
        case "viewAllTransactions":
            viewAllTransactions();
            break;
        case "viewItemAges":
            viewItemAges();
            break;
        case "importItems":
            importItems(data);
            break;
        case "addCustomField":
            addCustomField(data);
            break;
        case "updateCustomField":
            updateCustomField(data);
            break;
        default:
            console.log("Invalid action");
    }
}

// Add a new item to the inventory
function addItem(data) {
    var item = { name: data[0], category: data[1], quantity: data[2], price: data[3], unit: data[4], added: new Date(), customFields: data[5] || {} };
    items.push(item);
    if (!categories.includes(data[1])) categories.push(data[1]);
    transactions.push({ type: "add", item });
    printDashboard();
}

// Edit an existing item in the inventory
function editItem(data) {
    if (items[data[0]]) {
        transactions.push({ type: "edit", old: items[data[0]], new: data.slice(1) });
        items[data[0]] = { ...items[data[0]], name: data[1], category: data[2], quantity: data[3], price: data[4], unit: data[5], customFields: data[6] || {} };
        printDashboard();
    }
}

// Remove an item from the inventory
function removeItem(data) {
    if (items[data[0]]) {
        transactions.push({ type: "delete", item: items[data[0]] });
        items.splice(data[0], 1);
        printDashboard();
    }
}

// Process a sale of an item
function sellItem(data) {
    for (let item of items) {
        if (item.name === data[0]) {
            if (item.quantity >= data[1]) {
                item.quantity -= data[1];
                transactions.push({ type: "sale", item, quantitySold: data[1], date: new Date() });
                console.log(`Sold ${data[1]} ${item.unit} of ${item.name}`);
                printDashboard();
            }
            break;
        }
    }
}

// Restock an item
function restockItem(data) {
    for (let item of items) {
        if (item.name === data[0]) {
            item.quantity += data[1];
            transactions.push({ type: "restock", item, quantityRestocked: data[1], date: new Date() });
            console.log(`Restocked ${data[1]} ${item.unit} of ${item.name}`);
            printDashboard();
            break;
        }
    }
}

// Search for items in the inventory
function searchItems(data) {
    console.log(items.filter(x => [x.name, x.category, x.price].some(v => v.toString().toLowerCase().includes(data[0].toLowerCase()))).map(x => `${x.name} (${x.category}) - ${x.quantity} ${x.unit} @ $${x.price}`).join('\n'));
}

// View the entire inventory
function viewInventory() {
    console.log("=== Inventory ===", items.map(x => `${x.name} (${x.category}) - ${x.quantity} ${x.unit} @ $${x.price}`).join('\n'));
}

// Export all items as CSV
function exportAllItems() {
    console.log("CSV:\n" + ["Name,Category,Quantity,Price,Unit,AddedAt"].concat(items.map(x => Object.values(x).join(','))).join('\n'));
}

// View all transactions
function viewAllTransactions() {
    console.log("Transactions:\n", transactions.map(x => `${x.type} - ${x.item.name}`).join('\n'));
}

// View the age of items in the inventory
function viewItemAges() {
    console.log(items.map(x => `${x.name}: ${Math.floor((new Date() - new Date(x.added)) / (1000 * 60 * 60 * 24))}d`).join('\n'));
}

// Import multiple items into the inventory
function importItems(data) {
    data.forEach(x => doStuff("addItem", [x.name, x.category, x.quantity, x.price, x.unit]));
}

// Add a custom field to the inventory
function addCustomField(data) {
    if (!customFields[data[0]]) customFields[data[0]] = null;
}

// Update a custom field for an item
function updateCustomField(data) {
    items.find(x => x.name === data[0]).customFields[data[1]] = data[2];
}

// Print the dashboard with inventory summary
function printDashboard() {
    console.log("=== Dashboard ===");
    console.log(`Items: ${items.length}`);
    console.log(`Total: $${items.reduce((total, x) => total + x.quantity * x.price, 0).toFixed(2)}`);
    console.log(`Categories: ${categories.join(', ')}`);
}

// Main function to run inventory tests
function main() {
    console.log("Running inventory tests...");

    doStuff("addItem", ["Apple", "Fruit", 10, 1.5, "kg"]);
    doStuff("addItem", ["Banana", "Fruit", 5, 1, "kg"]);
    doStuff("addItem", ["Orange", "Fruit", 3, 2, "kg"]);
    doStuff("addItem", ["Milk", "Dairy", 5, 3, "litre"]);

    doStuff("sellItem", ["Apple", 2]);
    doStuff("restockItem", ["Milk", 2]);

    doStuff("searchItems", ["mil"]);
    doStuff("viewInventory");
    doStuff("viewItemAges");

    doStuff("exportAllItems");
    doStuff("viewAllTransactions");

    doStuff("importItems", [{ name: "Pineapple", category: "Fruit", quantity: 5, price: 3, unit: "kg" }]);

    doStuff("addCustomField", ["Origin"]);
    doStuff("updateCustomField", ["Apple", "Origin", "India"]);
}

main();