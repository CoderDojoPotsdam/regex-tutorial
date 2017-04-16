
if (!HTMLElement.prototype.prepend) {
  HTMLElement.prototype.prepend = function (child) {
    // Internet Exporer compatibility
    // https://developer.mozilla.org/de/docs/Web/API/Node/insertBefore
    if (this.hasChildNodes()) {
      this.insertBefore(child, this.firstChild);
    } else {
      this.appendChild(child);
    }
  }
}

// startsWith
if (!String.prototype.startsWith) {
  String.prototype.startsWith = function(other) {
    return this.substring(0, other.length) == other;
  }
}
