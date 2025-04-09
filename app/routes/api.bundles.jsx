import { authenticate } from "../shopify.server";

export const loader = async ({ request }) => {
  await authenticate.admin(request);
  const url = new URL(request.url);
  const productId = url.searchParams.get("productId");

  if (!productId) {
    return new Response(JSON.stringify({ error: "Missing productId" }), {
      status: 400,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
    });
  }

  const bundles = [
    {
      id: "bundle1",
      productId,
      title: "Starter Bundle",
      items: [
        { id: "item1", title: "Product A", quantity: 1 },
        { id: "item2", title: "Product B", quantity: 2 },
      ],
    },
    {
      id: "bundle2",
      productId,
      title: "Premium Bundle",
      items: [
        { id: "item3", title: "Product C", quantity: 1 },
        { id: "item4", title: "Product D", quantity: 3 },
      ],
    },
  ];

  return new Response(JSON.stringify(bundles), {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
    },
  });
};
