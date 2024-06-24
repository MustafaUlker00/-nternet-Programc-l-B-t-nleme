// Sayfa yüklendiğinde yorumları yüklemek için olay dinleyici ekliyoruz.
document.addEventListener('DOMContentLoaded', function () {
    loadComments(); // localStorage'dan yorumları yüklüyoruz
    updateCommentCount(); // Sayfa yüklendiğinde yorum sayısını güncelliyoruz
});

// localStorage'dan yorumları yükleyip ekrana yazdıran fonksiyon.
function loadComments() {
    // localStorage'dan yorumları JSON formatında alıyoruz. Boşsa, boş bir dizi oluşturuyoruz.
    var comments = JSON.parse(localStorage.getItem('comments')) || [];
    var commentsContainer = document.getElementById('comments');

    // Her bir yorum için HTML oluşturup commentsContainer'a ekliyoruz.
    comments.forEach(function (comment, index) {
        var commentDiv = document.createElement('div');
        commentDiv.className = 'comment';

        // Yorum metni ve sil butonunu içeren HTML oluşturuyoruz.
        commentDiv.innerHTML = `
            <span><i class="fas fa-user-secret"></i> ${comment}</span>
            <button class="delete-btn" data-index="${index}">Sil</button>
        `;

        // Sil butonuna tıklanma olayını ekliyoruz.
        var deleteButton = commentDiv.querySelector('.delete-btn');
        deleteButton.addEventListener('click', function () {
            deleteComment(index); // Silme işlemini başlatıyoruz
        });

        // Yorumları gösteren bölüme yeni yorumu ekliyoruz.
        commentsContainer.appendChild(commentDiv);
    });
}

// Yorum eklemek için kullanılan fonksiyon.
document.getElementById('commentForm').addEventListener('submit', function (event) {
    event.preventDefault(); // Formun normal gönderimini engelle

    var commentInput = document.getElementById('comment');
    var commentText = commentInput.value.trim();

    // Yorumun boş olup olmadığını kontrol ediyoruz.
    if (commentText === '') {
        alert('Lütfen bir yorum yazın.');
        return;
    }

    // Yeni yorumu ekrana ekleyip localStorage'a kaydediyoruz.
    saveComment(commentText);

    // Yorumu göstermek için yeni bir div oluşturuyoruz.
    var newCommentDiv = document.createElement('div');
    newCommentDiv.className = 'comment';

    // Yorum metni ve sil butonunu içeren HTML oluşturuyoruz.
    newCommentDiv.innerHTML = `
        <span><i class="fas fa-user-secret"></i> ${commentText}</span>
        <button class="delete-btn" data-index="${comments.length - 1}">Sil</button>
    `;

    // Sil butonuna tıklanma olayını ekliyoruz.
    var deleteButton = newCommentDiv.querySelector('.delete-btn');
    deleteButton.addEventListener('click', function () {
        var index = parseInt(deleteButton.getAttribute('data-index'));
        deleteComment(index); // Silme işlemini başlatıyoruz
    });

    // Yorumları gösteren bölüme yeni yorumu ekliyoruz.
    var commentsContainer = document.getElementById('comments');
    commentsContainer.appendChild(newCommentDiv);

    // Yorum giriş alanını temizliyoruz.
    commentInput.value = '';

    // Yorum sayısını güncelliyoruz.
    updateCommentCount();
});

// Yeni yorumu localStorage'a kaydeden fonksiyon.
function saveComment(comment) {
    // Mevcut yorumları alıyoruz, boşsa yeni bir dizi oluşturuyoruz.
    var comments = JSON.parse(localStorage.getItem('comments')) || [];
    // Yeni yorumu diziye ekliyoruz.
    comments.push(comment);
    // Yorumlar dizisini JSON formatına çevirip localStorage'a kaydediyoruz.
    localStorage.setItem('comments', JSON.stringify(comments));
}

// Yorumu localStorage'dan silen fonksiyon.
function deleteComment(index) {
    // Mevcut yorumları alıyoruz.
    var comments = JSON.parse(localStorage.getItem('comments')) || [];
    // Belirtilen index'teki yorumu diziden siliyoruz.
    comments.splice(index, 1);
    // Yorumlar dizisini güncel JSON formatına çevirip localStorage'a tekrar kaydediyoruz.
    localStorage.setItem('comments', JSON.stringify(comments));

    // Arayüzdeki yorumları güncelliyoruz.
    var commentsContainer = document.getElementById('comments');
    commentsContainer.innerHTML = ''; // Önce tüm yorumları temizliyoruz
    loadComments(); // Sonra güncel yorumları yeniden yüklüyoruz

    // Yorum sayısını güncelliyoruz.
    updateCommentCount();
}

// Yorum sayısını güncelleyen fonksiyon.
function updateCommentCount() {
    // Mevcut yorumları alıyoruz, boşsa yeni bir dizi oluşturuyoruz.
    var comments = JSON.parse(localStorage.getItem('comments')) || [];
    var commentCount = comments.length;
    // Yorum sayısını HTML'de göstermek için ilgili elementi güncelliyoruz.
    document.getElementById('commentCount').innerText = 'Toplam Yorum: ' + commentCount;
}
