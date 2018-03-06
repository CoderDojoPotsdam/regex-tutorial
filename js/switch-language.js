function changeLanguage() {
  var getLanguageMenu = document.getElementById('languageMenu');
  var getLanguageHref = getLanguageMenu.options[getLanguageMenu.selectedIndex].getAttribute('href');
  window.location.assign(getLanguageHref);
}

