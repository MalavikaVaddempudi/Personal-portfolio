'use strict';

document.addEventListener('DOMContentLoaded', () => {

  const elementToggleFunc = (elem) => { if (elem) elem.classList.toggle('active'); };

  // ---- Sidebar ----
  const sidebar = document.querySelector('[data-sidebar]');
  const sidebarBtn = document.querySelector('[data-sidebar-btn]');
  if (sidebarBtn && sidebar) sidebarBtn.addEventListener('click', () => elementToggleFunc(sidebar));

  // optional sidebar extra area
  const sidebarMore = document.querySelector('.sidebar-info_more');
  if (sidebarBtn && sidebarMore) sidebarBtn.addEventListener('click', () => sidebarMore.classList.toggle('open'));

  // ---- Testimonials modal (guarded) ----
  const testimonialsItem = document.querySelectorAll('[data-testimonials-item]');
  const modalContainer = document.querySelector('[data-modal-container]');
  const modalCloseBtn = document.querySelector('[data-modal-close-btn]');
  const overlay = document.querySelector('[data-overlay]');
  const modalImg = document.querySelector('[data-modal-img]');
  const modalTitle = document.querySelector('[data-modal-title]');
  const modalText = document.querySelector('[data-modal-text]');

  if (modalContainer && modalCloseBtn && overlay) {
    const testimonialsModalFunc = () => {
      modalContainer.classList.toggle('active');
      overlay.classList.toggle('active');
    };

    if (testimonialsItem.length > 0 && modalImg && modalTitle && modalText) {
      testimonialsItem.forEach(item => {
        item.addEventListener('click', () => {
          const avatar = item.querySelector('[data-testimonials-avatar]');
          modalImg.src = avatar?.src || '';
          modalImg.alt = avatar?.alt || '';
          modalTitle.innerHTML = item.querySelector('[data-testimonials-title]')?.innerHTML || '';
          modalText.innerHTML = item.querySelector('[data-testimonials-text]')?.innerHTML || '';
          testimonialsModalFunc();
        });
      });
    }

    modalCloseBtn.addEventListener('click', testimonialsModalFunc);
    overlay.addEventListener('click', testimonialsModalFunc);
  }

  // ---- Filter / select (guarded) ----
  const select = document.querySelector('[data-select]');
  const selectItems = document.querySelectorAll('[data-select-item]');
  const selectValue = document.querySelector('[data-selecct-value]') || document.querySelector('[data-select-value]');
  const filterBtn = document.querySelectorAll('[data-filter-btn]');
  const filterItems = document.querySelectorAll('[data-filter-item]');

  const filterFunc = (selectedValue) => {
    filterItems.forEach(fi => {
      if (!fi) return;
      if (selectedValue === 'all' || fi.dataset.category === selectedValue) {
        fi.classList.add('active');
      } else {
        fi.classList.remove('active');
      }
    });
  };

  if (select) {
    select.addEventListener('click', () => elementToggleFunc(select));
    selectItems.forEach(item => {
      item.addEventListener('click', () => {
        const selectedValue = item.innerText.toLowerCase();
        if (selectValue) selectValue.innerText = item.innerText;
        select.classList.remove('active');
        filterFunc(selectedValue);
      });
    });
  }

  if (filterBtn.length > 0) {
    let lastClickedBtn = document.querySelector('[data-filter-btn].active') || filterBtn[0];
    filterBtn.forEach(btn => {
      btn.addEventListener('click', () => {
        const selectedValue = btn.innerText.toLowerCase();
        if (selectValue) selectValue.innerText = btn.innerText;
        filterFunc(selectedValue);
        if (lastClickedBtn) lastClickedBtn.classList.remove('active');
        btn.classList.add('active');
        lastClickedBtn = btn;
      });
    });
  }

  // ---- Contact form (guarded) ----
  const form = document.querySelector('[data-form]');
  if (form) {
    const formInputs = document.querySelectorAll('[data-form-input]');
    const formBtn = document.querySelector('[data-form-btn]');
    formInputs.forEach(inp => {
      inp.addEventListener('input', () => {
        if (form.checkValidity()) formBtn?.removeAttribute('disabled');
        else formBtn?.setAttribute('disabled', '');
      });
    });
  }

  // ---- Page navigation (robust) ----
  const navLinks = document.querySelectorAll('[data-nav-link]');
  const pages = document.querySelectorAll('.article'); // articles have data-page

  function showPage(page) {
    if (!page) return;
    pages.forEach(p => p.classList.toggle('active', p.dataset.page === page));
    navLinks.forEach(b => b.classList.toggle('active', b.dataset.page === page));
    window.scrollTo(0, 0);
  }

  const initialPage = document.querySelector('[data-nav-link].active')?.dataset.page
    || document.querySelector('.article.active')?.dataset.page
    || 'about';

  showPage(initialPage);

  navLinks.forEach(btn => {
    btn.addEventListener('click', () => {
      const page = btn.dataset.page;
      if (page) showPage(page);
    });
  });

});
