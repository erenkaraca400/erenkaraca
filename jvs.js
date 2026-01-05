// Ana veri dizimiz
let inventory = [];

/**
 * Ürünleri Tabloya Döken Fonksiyon
 * @param {Array} dataToRender - Listelenecek veri (varsayılan: tüm envanter)
 */
function renderInventory(dataToRender = inventory) {
    const tableBody = document.getElementById('stock-list');
    const totalCount = document.getElementById('total-count');
    const lowStockCount = document.getElementById('low-stock-count');
    
    tableBody.innerHTML = ""; // Tabloyu temizle
    let lowCount = 0;

    dataToRender.forEach((item, index) => {
        // Stok 3'in altındaysa kritik say
        const isLow = item.qty < 3;
        if (isLow) lowCount++;

        const row = `
            <tr>
                <td><img src="${item.img}" class="product-img" alt="ürün"></td>
                <td><strong>${item.name}</strong></td>
                <td>${item.qty} Adet</td>
                <td>
                    <span class="status-badge ${isLow ? 'low-alert' : 'ok-status'}">
                        ${isLow ? 'bac' : '✅ Yeterli'}
                    </span>
                </td>
                <td>
                    <button onclick="removeItem(${index})" class="delete-btn">Sil</button>
                </td>
            </tr>
        `;
        tableBody.innerHTML += row;
    });

    // İstatistikleri güncelle
    totalCount.innerText = inventory.length;
    lowStockCount.innerText = lowCount;
}

/**
 * Yeni Ürün Ekleme Fonksiyonu
 */
function addNewItem() {
    const nameInput = document.getElementById('p-name');
    const qtyInput = document.getElementById('p-qty');
    const fileInput = document.getElementById('p-img-file');

    const name = nameInput.value.trim();
    const qty = parseInt(qtyInput.value);
    const file = fileInput.files[0];

    // Temel kontrol
    if (name === "" || isNaN(qty)) {
        alert("Lütfen geçerli bir ürün adı ve miktar girin!");
        return;
    }

    // Resim işleme süreci
    if (file) {
        const reader = new FileReader();
        
        // Dosya okunduğunda bu kısım çalışır
        reader.onload = function(e) {
            const imageData = e.target.result; // Base64 formatında resim verisi
            pushToInventory(name, qty, imageData);
        };
        
        reader.readAsDataURL(file); // Okumayı başlat
    } else {
        // Resim seçilmediyse varsayılan görselle ekle
        pushToInventory(name, qty, "https://via.placeholder.com/50?text=Yok");
    }

    // Formu temizle
    nameInput.value = "";
    qtyInput.value = "";
    fileInput.value = "";
}

/**
 * Veriyi diziye ekleyen yardımcı fonksiyon
 */
function pushToInventory(name, qty, img) {
    inventory.push({ name, qty, img });
    renderInventory(); // Tabloyu güncelle
}

/**
 * Ürün Silme
 */
function removeItem(index) {
    if(confirm("Bu ürünü silmek istediğinize emin misiniz?")) {
        inventory.splice(index, 1);
        renderInventory();
    }
}

/**
 * Üstteki Arama Çubuğu Fonksiyonu
 */
function filterItems() {
    const searchTerm = document.getElementById('search-input').value.toLowerCase();
    
    // İsme göre filtrele
    const filteredResults = inventory.filter(item => 
        item.name.toLowerCase().includes(searchTerm)
    );
    
    // Sadece filtrelenmiş olanları ekrana bas
    renderInventory(filteredResults);
}

// Sayfa ilk açıldığında boş tabloyu hazırla
renderInventory();