(function () {
  function loadBundleUI() {
    const root = document.getElementById('bundle-ui-root');
    if (!root) {
      console.warn("⚠️ Bundle UI root not found");
      return;
    }

    const productId = root.getAttribute('data-product-id');
    const variantId = root.getAttribute('data-variant-id');

    if (!productId) {
      root.innerHTML = '<p style="color:red;">❌ Product ID missing</p>';
      return;
    }

    fetch('https://bundle-products.codecorners.in/api/bundles?productId=' + productId)
      .then(res => { console.log(res, 'resresres'); return res.json()})
      .then(data => {
        console.log(data, 'dataatatatata')
        root.innerHTML = `
          <div style="padding: 16px; border: 2px dashed #ccc; background: #f9f9f9;">
            <h3>📦 Bundles for Product ID: ${productId}</h3>
            <pre style="font-size: 12px;">${JSON.stringify(data, null, 2)}</pre>
          </div>
        `;
      })
      .catch(err => {
        root.innerHTML = '<p style="color:red;">Error loading bundle data</p>';
        console.error('Bundle UI error:', err);
      });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadBundleUI);
  } else {
    loadBundleUI();
  }
})();
