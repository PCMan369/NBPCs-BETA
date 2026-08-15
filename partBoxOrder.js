/*
  ================================================================
  js/render/partBoxOrder.js — Order Request Builder
  ================================================================
  Tracks quantities selected across all box cards on part-boxes.html,
  keeps the "Your Request" summary panel in sync, and submits the
  whole itemized request as one message. No payment processing, no
  real cart or checkout — this just turns several quantity pickers
  into one clean inquiry, the same way every other form on this site
  works. Fulfillment (payment, pickup) still happens in person.

  Requires: js/data/config.js (for CONTACT.email), and the box cards
  (from partBoxCard.js) already in the DOM.
  ================================================================
*/

function initPartBoxOrder() {
  var grid = document.getElementById('part-boxes-grid');
  var summary = document.getElementById('order-summary');
  if (!grid || !summary) return;
  if (!grid.querySelector('.box-card')) return; // nothing orderable — empty state only

  var itemsEl = document.getElementById('order-summary-items');
  var totalWrap = document.getElementById('order-summary-total');
  var totalAmountEl = document.getElementById('order-total-amount');
  var formWrap = document.getElementById('order-form-wrap');

  var selections = {}; // box id -> selected quantity

  function parsePrice(str) {
    var n = parseFloat(String(str).replace(/[^0-9.]/g, ''));
    return isNaN(n) ? 0 : n;
  }

  function formatMoney(n) {
    return '$' + n.toFixed(2).replace(/\.00$/, '');
  }

  function updateSummary() {
    var cards = grid.querySelectorAll('.box-card');
    var lines = [];
    var total = 0;

    cards.forEach(function (card) {
      var id = card.getAttribute('data-id');
      var qty = selections[id] || 0;
      if (qty > 0) {
        var price = parsePrice(card.getAttribute('data-price'));
        var lineTotal = price * qty;
        total += lineTotal;
        lines.push({ label: card.getAttribute('data-label'), qty: qty, lineTotal: lineTotal });
      }
    });

    if (!lines.length) {
      itemsEl.innerHTML = '<p class="order-summary-empty">No boxes selected yet.</p>';
      totalWrap.style.display = 'none';
      formWrap.style.display = 'none';
      return;
    }

    itemsEl.innerHTML = lines.map(function (l) {
      return '<div class="order-line">' +
        '<span class="order-line-label">' + l.label + ' &times; ' + l.qty + '</span>' +
        '<span class="order-line-price">' + formatMoney(l.lineTotal) + '</span>' +
      '</div>';
    }).join('');

    totalAmountEl.textContent = formatMoney(total);
    totalWrap.style.display = 'flex';
    formWrap.style.display = 'block';
  }

  function setQty(card, val) {
    var input = card.querySelector('.qty-input');
    var max = parseInt(input.getAttribute('max'), 10) || 0;
    var clamped = Math.max(0, Math.min(max, val));
    input.value = clamped;
    selections[card.getAttribute('data-id')] = clamped;
    updateSummary();
  }

  grid.addEventListener('click', function (e) {
    var btn = e.target.closest('.qty-btn');
    if (!btn) return;
    var card = btn.closest('.box-card');
    var input = card.querySelector('.qty-input');
    var current = parseInt(input.value, 10) || 0;
    setQty(card, btn.classList.contains('qty-plus') ? current + 1 : current - 1);
  });

  grid.addEventListener('input', function (e) {
    if (!e.target.classList.contains('qty-input')) return;
    var card = e.target.closest('.box-card');
    setQty(card, parseInt(e.target.value, 10) || 0);
  });

  // ---- Submit ----
  var form = document.getElementById('order-form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();

      var name = document.getElementById('order-name').value.trim();
      var email = document.getElementById('order-email').value.trim();
      var errEl = document.getElementById('order-error');
      errEl.style.display = 'none';

      if (!name || !email || !email.includes('@')) {
        errEl.textContent = 'Please fill in your name and a valid email.';
        errEl.style.display = 'block';
        return;
      }

      var cards = grid.querySelectorAll('.box-card');
      var itemLines = [];
      var total = 0;
      cards.forEach(function (card) {
        var id = card.getAttribute('data-id');
        var qty = selections[id] || 0;
        if (qty > 0) {
          total += parsePrice(card.getAttribute('data-price')) * qty;
          itemLines.push(card.getAttribute('data-label') + ' x' + qty);
        }
      });
      if (!itemLines.length) return;

      var submitBtn = form.querySelector('button[type=submit]');
      submitBtn.textContent = 'Sending\u2026';
      submitBtn.disabled = true;

      fetch('https://formsubmit.co/ajax/' + CONTACT.email, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({
          _subject: 'Part box order request \u2014 North Bridge PCs',
          name: name,
          email: email,
          items_requested: itemLines.join(', '),
          estimated_total: formatMoney(total)
        })
      })
        .then(function (res) { return res.json(); })
        .then(function (data) {
          if (data.success === 'true' || data.success === true) {
            summary.innerHTML =
              '<div class="notify-success">' +
                '<span class="success-icon">&#9989;</span>' +
                '<h3>Request Sent</h3>' +
                '<p>I\'ll follow up by email to arrange pickup and payment.</p>' +
              '</div>';
          } else {
            throw new Error('Submission failed');
          }
        })
        .catch(function () {
          submitBtn.textContent = 'Send Request \u2192';
          submitBtn.disabled = false;
          errEl.textContent = 'Something went wrong \u2014 try again or use the contact page instead.';
          errEl.style.display = 'block';
        });
    });
  }

  updateSummary();
}

document.addEventListener('DOMContentLoaded', initPartBoxOrder);
