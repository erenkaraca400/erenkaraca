

function renderInventory(data = inventory) {
    const list = document.getElementById('stock-list');
    const totalMsg = document.getElementById('total-count');
    const lowMsg = document.getElementById('low-stock-count');
    
    list.innerHTML = "";
    let lowCount = 0;

    data.forEach((item, index) => {
        if(item.qty < 5) lowCount++;
        
        list.innerHTML += `
            <tr>
                <td><img src="${item.img}" class="product-img"></td>
                <td>${item.name}</td>
                <td>${item.qty} adet</td>
                <td class="${item.qty < 5 ? 'low-alert' : ''}">
                    ${item.qty < 5 ? '⚠️ Kritik' : '✅ Tamam'}
                </td>
                <td><button onclick="removeItem(${index})" style="background:#ff4d4d">Sil</button></td>
            </tr>
        `;
    });

    totalMsg.innerText = inventory.length;
    lowMsg.innerText = lowCount;
}

// Yeni Ürün Ekleme
function addNewItem() {
    const name = document.getElementById('p-name').value;
    const qty = document.getElementById('p-qty').value;
    const img = document.getElementById('p-img').value || "https://via.placeholder.com/50";

    if(name && qty) {
        inventory.push({ name, qty: parseInt(qty), img });
        renderInventory();
        document.getElementById('p-name').value = "";
        document.getElementById('p-qty').value = "";
        document.getElementById('p-img').value = "";
    }
}

// Arama Fonksiyonu
function filterItems() {
    const term = document.getElementById('search-input').value.toLowerCase();
    const filtered = inventory.filter(item => 
        item.name.toLowerCase().includes(term)
    );
    renderInventory(filtered);
}

function removeItem(index) {
    inventory.splice(index, 1);
    renderInventory();
}

// Sayfa yüklendiğinde çalıştır
renderInventory();