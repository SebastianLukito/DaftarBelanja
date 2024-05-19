const products = [
    // { id: 1, name: 'Apel', price: 10000, category: 'Buah' },
    // { id: 2, name: 'Ayam', price: 30000, category: 'Daging' },
    // { id: 3, name: 'Wortel', price: 8000, category: 'Sayur' },
    // { id: 4, name: 'Susu', price: 15000, category: 'Minuman' },
    // { id: 5, name: 'Roti', price: 5000, category: 'Makanan Ringan' },
    // { id: 6, name: 'Beras', price: 20000, category: 'Bahan Pokok' },
    // { id: 7, name: 'Gula', price: 12000, category: 'Bahan Pokok' },
    // { id: 8, name: 'Kopi', price: 25000, category: 'Minuman' },
    // { id: 9, name: 'Teh', price: 20000, category: 'Minuman' },
    // { id: 10, name: 'Sambal', price: 5000, category: 'Bumbu' },
];

let nextId = products.length + 1;

document.getElementById('filterCategory').addEventListener('keyup', function(event) {
    if (event.key === 'Enter') {
        filterProduct();
    }
});

function filterProduct() {
    const filterValue = document.getElementById('filterCategory').value.trim().toLowerCase();
    const filteredProducts = filterValue ? products.filter(product => product.category.toLowerCase().includes(filterValue)) : products;
    displayProducts(filteredProducts);
}

function displayProducts(productList = products) {
    const productContainer = document.getElementById('productContainer');
    productContainer.innerHTML = productList.map(product => `
        <div class="product">
            <h2>${product.name}</h2>
            <p>Harga: Rp${product.price},-</p>
            <p>Kategori: ${product.category}</p>
            <input type="text" id="note-${product.id}" class="product-note" placeholder="Tambahkan catatan..." value="${product.note || ''}">
            <div class="product-buttons">
                <button onclick="editProduct(${product.id})">Edit</button>
                <button onclick="deleteProduct(${product.id})">Hapus</button>
            </div>
        </div>
    `).join('');
}

function resetFilter() {
    document.getElementById('filterCategory').value = '';
    displayProducts(); // Memanggil displayProducts tanpa argumen untuk menampilkan semua produk
}


function addProduct() {
    const name = document.getElementById('productName').value;
    const price = document.getElementById('productPrice').value;
    const category = document.getElementById('productCategory').value;

    if (name && price && category) {
        products.push({ id: nextId++, name, price: parseInt(price), category });
        displayProducts();
        document.getElementById('productName').value = '';
        document.getElementById('productPrice').value = '';
        document.getElementById('productCategory').value = '';
    } else {
        alert('Mohon mengisi semua kolom input!');
    }
}

function deleteProduct(id) {
    const index = products.findIndex(product => product.id === id);
    if (index > -1) {
        products.splice(index, 1);
        displayProducts();
    }
}

function editProduct(id) {
    const product = products.find(product => product.id === id);
    if (product) {
        document.getElementById('productName').value = product.name;
        document.getElementById('productPrice').value = product.price;
        document.getElementById('productCategory').value = product.category;
        const addButton = document.getElementById('addButton');
        addButton.innerText = 'Update Produk';
        addButton.onclick = function () { updateProduct(id); };
    }
}

function updateProduct(id) {
    const index = products.findIndex(product => product.id === id);
    if (index !== -1) {
        products[index].name = document.getElementById('productName').value;
        products[index].price = parseInt(document.getElementById('productPrice').value, 10);
        products[index].category = document.getElementById('productCategory').value;
        
        displayProducts();  // Menampilkan ulang semua produk termasuk perubahan yang baru
        resetForm();  // Mengosongkan form setelah produk berhasil diupdate

        document.getElementById('addButton').innerText = 'Tambah Produk';
        document.getElementById('addButton').onclick = addProduct;
        document.getElementById('productName').value = '';
        document.getElementById('productPrice').value = '';
        document.getElementById('productCategory').value = '';
    } else {
        console.error('Produk dengan ID ' + id + ' tidak ditemukan.');
    }
}

function resetForm() {
    document.getElementById('productName').value = '';
    document.getElementById('productPrice').value = '';
    document.getElementById('productCategory').value = '';
    document.getElementById('addButton').innerText = 'Tambah Produk';
    document.getElementById('addButton').onclick = addProduct;
}

function saveNote(id) {
    const noteText = document.getElementById(`note-${id}`).value;
    const product = products.find(product => product.id === id);
    if (product) {
        product.note = noteText; // Menyimpan catatan ke dalam objek produk
        displayProducts(); // Opsi untuk memperbarui tampilan, jika diperlukan
    } else {
        console.error('Produk dengan ID ' + id + ' tidak ditemukan.');
    }
}

window.onload = displayProducts;
