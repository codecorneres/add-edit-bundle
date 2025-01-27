import { Page, Card, Button, TextField } from "@shopify/polaris";
import { TitleBar } from "@shopify/app-bridge-react";
import { authenticate } from "../shopify.server";

export const loader = async ({ request }) => {
  await authenticate.admin(request);

  return null;
};

export const action = async ({ request }) => {
  const { admin } = await authenticate.admin(request);

  return null;
};

export default function Bundle() {
  return (
    <Page>
      <TitleBar title="Bundle"></TitleBar>
      <Card>
        <TextField label="Bundle Name" onChange={() => {}} />

        <Button primary>Create Bundle</Button>
      </Card>
    </Page>
  );
}
