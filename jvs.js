let stockData = [
    { name: "Espresso Çekirdeği", qty: 12, category: "İçecek" },
    { name: "Süt", qty: 3, category: "Gıda" }
];

function updateTable() {
    const tableBody = document.getElementById('table-body');
    const totalItemsText = document.getElementById('total-items');
    const lowStockText = document.getElementById('low-stock-count');
    
    tableBody.innerHTML = "";
    let lowStockCount = 0;

    stockData.forEach((item, index) => {
        const isLow = item.qty < 5;
        if(isLow) lowStockCount++;

        const row = `
            <tr>
                <td>${item.name}</td>
                <td>${item.category}</td>
                <td>${item.qty}</td>
                <td class="${isLow ? 'status-low' : 'status-ok'}">
                    ${isLow ? '⚠️ Düşük Stok' : '✅ Yeterli'}
                </td>
                <td><button class="delete-btn" onclick="deleteItem(${index})">Sil</button></td>
            </tr>
        `;
        tableBody.innerHTML += row;
    });

    totalItemsText.innerText = stockData.length;
    lowStockText.innerText = lowStockCount;
}

function addItem() {
    const name = document.getElementById('item-name').value;
    const qty = parseInt(document.getElementById('item-qty').value);
    const category = document.getElementById('item-category').value;

    if(name && qty >= 0) {
        stockData.push({ name, qty, category });
        updateTable();
        // Formu temizle
        document.getElementById('item-name').value = "";
        document.getElementById('item-qty').value = "";
    } else {
        alert("Lütfen geçerli bir isim ve miktar girin!");
    }
}

function deleteItem(index) {
    stockData.splice(index, 1);
    updateTable();
}

// İlk açılışta tabloyu yükle
updateTable();