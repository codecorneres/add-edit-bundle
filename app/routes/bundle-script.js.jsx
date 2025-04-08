export const loader = async () => {
  const js = `
    document.addEventListener('DOMContentLoaded', function () {
      const root = document.getElementById('bundle-ui-root');
      if (root) {
        const productId = root.getAttribute('data-product-id');
        const variantId = root.getAttribute('data-variant-id');

        fetch('https://bundle-products.codecorners.in/api/bundles?productId=' + productId)
          .then(res => res.json())
          .then(data => {
            root.innerHTML = '<div style="padding: 10px; border: 1px solid #ccc;">' +
              '<h3>Bundle for Product ID: ' + productId + '</h3>' +
              '<pre>' + JSON.stringify(data, null, 2) + '</pre>' +
              '</div>';
          });
      }
    });
  `;

  return new Response(js, {
    headers: {
      "Content-Type": "application/javascript",
    },
  });
};
