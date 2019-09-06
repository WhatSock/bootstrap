(function() {
  var u = location.href;
  var id = u.slice(u.indexOf("#"));

  if (id && document.querySelector(id)) {
    var t = document.querySelector(id);
    var o = document.querySelector(
      'ul[role="tablist"].contextual-menu *[role="tab"][data-defaultopen]'
    );
    if (o && t) {
      o.removeAttribute("data-defaultopen");
      t.setAttribute("data-defaultopen", "true");
    }
  }
})();
