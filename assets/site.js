// Red Dot Fire Safety Experts — shared behaviour
document.addEventListener('DOMContentLoaded', function () {
  // Small interactions that keep the static site feeling active.
  document.body.classList.add('js-ready');
  var header = document.querySelector('header');
  if (header) {
    var onScroll = function () {
      header.classList.toggle('scrolled', window.scrollY > 18);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  var panel = document.getElementById('mobilePanel');
  var toggle = document.getElementById('navToggle');
  var close = document.getElementById('navClose');
  if (toggle && panel) toggle.addEventListener('click', function () { panel.classList.add('open'); });
  if (close && panel) close.addEventListener('click', function () { panel.classList.remove('open'); });
  if (panel) {
    panel.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () { panel.classList.remove('open'); });
    });
  }

  var revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('in'); });
  }

  // Contact form -> mailto (static site, no backend)
  var form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var name = form.querySelector('#f-name').value.trim();
      var phone = form.querySelector('#f-phone').value.trim();
      var premises = form.querySelector('#f-premises').value;
      var message = form.querySelector('#f-message').value.trim();
      var subject = encodeURIComponent('Free fire-readiness assessment — ' + (name || 'New enquiry'));
      var bodyLines = [
        'Name: ' + name,
        'Phone: ' + phone,
        'Premises type: ' + premises,
        '',
        message
      ];
      var body = encodeURIComponent(bodyLines.join('\n'));
      window.location.href = 'mailto:tseliso@live.co.za?subject=' + subject + '&body=' + body;
    });
  }
});
