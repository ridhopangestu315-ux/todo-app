function showPage(pageId, el) {
  const pages = document.querySelectorAll('.page');
  pages.forEach(page => page.style.display = 'none');

  document.getElementById(pageId).style.display = 'block';

  const menuItems = document.querySelectorAll('.sidebar li');
  menuItems.forEach(item => item.classList.remove('active'));

  if (el) {
    el.classList.add('active');
  }
}