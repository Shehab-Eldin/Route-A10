document.getElementById('bookmark-form').addEventListener('submit', saveBookmark);

function saveBookmark(e) {
    e.preventDefault();

    const bookmarkId = document.getElementById('bookmarkId').value;
    const siteName = document.getElementById('siteName').value;
    const siteUrl = document.getElementById('siteUrl').value;

    const bookmark = {
        id: bookmarkId || Date.now().toString(),
        name: siteName,
        url: siteUrl
    };

    let bookmarks = JSON.parse(localStorage.getItem('bookmarks')) || [];

    if (bookmarkId) {
        bookmarks = bookmarks.map(b => b.id === bookmarkId ? bookmark : b);
    } else {
        bookmarks.push(bookmark);
    }

    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

    document.getElementById('bookmark-form').reset();
    document.getElementById('bookmarkId').value = '';

    displayBookmarks();
}

function displayBookmarks() {
    const bookmarks = JSON.parse(localStorage.getItem('bookmarks')) || [];
    const bookmarkList = document.getElementById('bookmark-list');
    bookmarkList.innerHTML = '';

    bookmarks.forEach((bookmark, index) => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${index + 1}</td>
            <td>${bookmark.name}</td>
            <td><a href="${bookmark.url}" target="_blank" class="visit-btn">Visit</a></td>
            <td><button onclick="editBookmark('${bookmark.id}')" class="edit-btn">Edit</button></td>
            <td><button onclick="deleteBookmark('${bookmark.id}')" class="delete-btn">Delete</button></td>
        `;
        bookmarkList.appendChild(tr);
    });
}

function editBookmark(id) {
    const bookmarks = JSON.parse(localStorage.getItem('bookmarks')) || [];
    const bookmark = bookmarks.find(b => b.id === id);

    if (bookmark) {
        document.getElementById('bookmarkId').value = bookmark.id;
        document.getElementById('siteName').value = bookmark.name;
        document.getElementById('siteUrl').value = bookmark.url;
    }
}

function deleteBookmark(id) {
    let bookmarks = JSON.parse(localStorage.getItem('bookmarks')) || [];
    bookmarks = bookmarks.filter(b => b.id !== id);
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    displayBookmarks();
}

// Display bookmarks on page load
document.addEventListener('DOMContentLoaded', displayBookmarks);
