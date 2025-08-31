// ==== تعريف العناصر ====
const toggle = document.getElementById('menu-toggle');
const navMenu = document.getElementById('nav-menu');
const closeMenu = document.getElementById('close-menu');
const toggleThemeBtn = document.getElementById("toggleThemeBtn");
const filterButtons = document.querySelectorAll('.categories button');
const movies = document.querySelectorAll('.movie-card');
const noResults = document.getElementById('no-results');
const searchInput = document.getElementById('searchInput');

// Dropdown الأفلام
const dropBtn = document.querySelector('.dropbtn');
const dropContent = document.querySelector('.dropdown-content');

// Dropdown المسلسلات
const dropBtnSeries = document.querySelector('.dropbtn-series');
const dropContentSeries = document.querySelector('.dropdown-content-series');

// ==== القائمة في الموبايل ====
toggle.addEventListener('click', () => {
  navMenu.classList.toggle('active');
});

closeMenu.addEventListener('click', () => {
  navMenu.classList.remove('active');
});

// ==== زر تغيير الوضع ====
toggleThemeBtn.addEventListener("click", () => {
  document.body.classList.toggle("light-mode");
});

// ==== البحث + الفلترة ====
filterButtons.forEach(button => {
  button.addEventListener('click', () => {
    const category = button.dataset.category;
    let matchCount = 0;
    movies.forEach(movie => {
      const desc = movie.querySelector('.movie-desc').textContent;
      const match = category === 'all' || desc.includes(category);
      movie.style.display = match ? "block" : "none";
      if (match) matchCount++;
    });
    noResults.style.display = matchCount === 0 ? 'block' : 'none';
  });
});

searchInput.addEventListener('input', function () {
  const searchValue = this.value.trim().toLowerCase();
  let matchCount = 0;
  movies.forEach(movie => {
    const title = movie.querySelector('.movie-title').textContent.toLowerCase();
    const desc = movie.querySelector('.movie-desc').textContent.toLowerCase();
    const match = title.includes(searchValue) || desc.includes(searchValue);
    movie.style.display = match ? "block" : "none";
    if (match) matchCount++;
  });
  noResults.style.display = matchCount === 0 ? 'block' : 'none';
});

// ==== Dropdown الأفلام ====
dropBtn.addEventListener('click', function(e) {
  e.preventDefault();
  dropContent.classList.toggle('show');
});

// ==== Dropdown المسلسلات ====
dropBtnSeries.addEventListener('click', function(e) {
  e.preventDefault();
  dropContentSeries.classList.toggle('show');
});

// ==== إغلاق القوائم عند الضغط خارجها ====
window.addEventListener('click', function(e) {
  // القائمة في الموبايل
  if (!navMenu.contains(e.target) && !toggle.contains(e.target)) {
    navMenu.classList.remove('active');
  }

  // dropdown الأفلام
  if (!dropBtn.contains(e.target)) {
    dropContent.classList.remove('show');
  }

  // dropdown المسلسلات
  if (!dropBtnSeries.contains(e.target)) {
    dropContentSeries.classList.remove('show');
  }
});
function highlight(text, term) {
  const regex = new RegExp(`(${term})`, 'gi');
  return text.replace(regex, `<mark>$1</mark>`);
}

searchInput.addEventListener('input', function () {
  const searchValue = this.value.trim().toLowerCase();
  let matchCount = 0;

  movies.forEach(movie => {
    const titleEl = movie.querySelector('.movie-title');
    const descEl = movie.querySelector('.movie-desc');

    const title = titleEl.textContent;
    const desc = descEl.textContent;

    const match = title.toLowerCase().includes(searchValue) || desc.toLowerCase().includes(searchValue);

    if (match && searchValue !== "") {
      titleEl.innerHTML = highlight(title, searchValue);
      descEl.innerHTML = highlight(desc, searchValue);
    } else {
      titleEl.innerHTML = title;
      descEl.innerHTML = desc;
    }

    movie.style.display = match ? "block" : "none";
    if (match) matchCount++;
  });

  noResults.style.display = matchCount === 0 ? 'block' : 'none';
});
const scrollBtn = document.getElementById("scrollTopBtn");
window.addEventListener("scroll", () => {
  if (window.scrollY > 300) {
    scrollBtn.classList.add("show");
  } else {
    scrollBtn.classList.remove("show");
  }
});
scrollBtn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});
window.addEventListener("load", () => {
  const loader = document.getElementById("loader");
  setTimeout(() => {
    loader.style.opacity = "0";
    loader.style.transition = "opacity 0.5s ease";
    setTimeout(() => loader.style.display = "none", 500);
  }, 300); // يختفي بعد ثانية ونص
});

