/*
  ================================================================
  js/render/partBoxCard.js — Part Box Card + Quantity Picker
  ================================================================
  Renders one box type as a card with a quantity picker. Used on
  part-boxes.html. This file only renders the cards — selection state
  and the order summary are handled by js/render/partBoxOrder.js.
  ================================================================
*/

function renderPartBoxCard(box) {
  var label = box.brand + ' ' + box.model;

  var image = box.media && box.media.images && box.media.images[0];
  var imageHtml = image
    ? '<img src="' + image + '" alt="' + label + '" loading="lazy" ' +
      'onload="this.classList.add(\'loaded\')" ' +
      'onerror="this.parentElement.innerHTML=\'<div class=box-img-placeholder>&#128230;</div>\'">'
    : '<div class="box-img-placeholder">&#128230;</div>';

  var categoryHtml = box.category
    ? '<span class="box-category">' + box.category + '</span>'
    : '';

  var conditionHtml = box.condition
    ? '<p class="box-condition">' + box.condition + '</p>'
    : '';

  return (
    '<div class="box-card" data-id="' + box.id + '" data-price="' + box.price + '" data-label="' + label + '">' +
      '<div class="box-image">' + imageHtml + '</div>' +
      '<div class="box-body">' +
        categoryHtml +
        '<div class="box-title">' + label + '</div>' +
        conditionHtml +
        '<div class="box-footer">' +
          '<div class="box-price-wrap">' +
            '<div class="box-price">' + box.price + '</div>' +
            '<div class="box-stock">' + box.quantity + ' available</div>' +
          '</div>' +
          '<div class="qty-picker">' +
            '<button type="button" class="qty-btn qty-minus" aria-label="Decrease quantity">&minus;</button>' +
            '<input type="number" class="qty-input" value="0" min="0" max="' + box.quantity + '" ' +
              'aria-label="Quantity for ' + label + '">' +
            '<button type="button" class="qty-btn qty-plus" aria-label="Increase quantity">+</button>' +
          '</div>' +
        '</div>' +
      '</div>' +
    '</div>'
  );
}

function renderEmptyPartBoxesState() {
  return (
    '<div class="empty-state">' +
      '<span class="empty-icon">&#128230;</span>' +
      '<h3>No Part Boxes Available Right Now</h3>' +
      '<p>Nothing listed at the moment — check back later, or reach out directly if you\'re looking for something specific.</p>' +
      '<a href="contact.html" class="btn btn-primary" style="margin-top:1.5rem;">Contact Me &rarr;</a>' +
    '</div>'
  );
}
