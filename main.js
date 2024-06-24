
// Temayı değiştir
function toggleTheme() {
    const body = document.body;

    // Mevcut temayı belirle
    const currentTheme = body.classList.contains("dark-mode") ? "dark" : "light";

    // Yeni temayı belirle
    const newTheme = currentTheme === "dark" ? "light" : "dark";

    // Mevcut temayı kaldır ve yeni temayı ekle
    body.classList.remove(currentTheme + "-mode");
    body.classList.add(newTheme + "-mode");

    // Yeni temayı yerel depolamada sakla
    localStorage.setItem("theme", newTheme);

    // Tema düğmesini güncelle
    updateThemeButton(newTheme);
}

// Tema düğmesini güncelle
function updateThemeButton(theme) {
    const moonIcon = document.querySelector(".fa-moon");
    const sunIcon = document.querySelector(".fa-sun");
    const themeButton = document.getElementById("themaButton");

    // Temaya göre ikonların görünürlüğünü ayarla
    if (theme === "dark") {
        moonIcon.style.display = "inline";
        sunIcon.style.display = "none";
        themeButton.style.color = "white";
    } else {
        moonIcon.style.display = "none";
        sunIcon.style.display = "inline";
        themeButton.style.color = "black";
    }
}

// Sayfa yüklendiğinde temayı ayarla
document.addEventListener("DOMContentLoaded", () => {
    // Kayıtlı temayı al veya varsayılan olarak 'light' kullan
    const savedTheme = localStorage.getItem("theme") || "light";

    // Kayıtlı temayı uygulama
    document.body.classList.add(savedTheme + "-mode");

    // Tema düğmesini güncelle
    updateThemeButton(savedTheme);
});

const backToTop = document.getElementById('backToTop');

// Scroll olayını dinle
window.addEventListener('scroll', function () {
    // Kaydırma miktarını al
    const scrollPosition = window.scrollY;

    // Kaydırma miktarı belirli bir değeri geçtiğinde backToTop div'ini göster
    if (scrollPosition > 100) {
        backToTop.style.display = 'flex';
    } else {
        backToTop.style.display = 'none';
    }
});


// Tüm blog-box elementlerini seç
const blogBoxes = document.querySelectorAll('.blog-box');

// Her bir blog-box elementi için bir tıklama olayı ekle
blogBoxes.forEach(box => {
    box.addEventListener('click', () => {
        // box içindeki .news-link elementini bul
        const link = box.querySelector('.news-link');
        // linkin href değerine yönlendir
        window.location.href = link.href;
    });
});

