import {
  Page,
  TextField,
  LegacyCard,
  Grid,
  Tabs,
  FormLayout,
  Form,
  Select,
  ChoiceList,
  LegacyTabs,
  Text,
  ColorPicker,
  Button,
  InlineStack,
  RadioButton,
  hsbToHex,
} from "@shopify/polaris";
import { useEffect, useState } from "react";
import { useFetcher, useLoaderData } from "@remix-run/react";
import actions from "./action/actions";
import getBundleSettings from "./server/getBundleSettings";

export const loader = async ({ request }) => {
  const data = await getBundleSettings(request);

  return { data };
};

export const action = async ({ request }) => {
  const data = await actions(request);

  return data;
};

const BlockLayout = ({ data, handleChange }) => {
  const optionsAlignment = [
    { label: "Left", value: "left" },
    { label: "Center", value: "center" },
    { label: "Right", value: "right" },
  ];
  const choices = [
    {
      label: "Royal",
      value: "royal",
      image: "https://app.rapibundle.com/images/templates/original.webp",
    },
    // {
    //   label: "Block",
    //   value: "block",
    //   image: "https://app.rapibundle.com/images/templates/heavy.webp",
    // },
    // {
    //   label: "Light",
    //   value: "light",
    //   image: "https://app.rapibundle.com/images/templates/light.webp",
    // },
    // {
    //   label: "Prestige",
    //   value: "prestige",
    //   image: "https://app.rapibundle.com/images/templates/prestige.webp",
    // },
  ];
  return (
    <FormLayout>
      <TextField
        label="Bundle Name"
        name="title"
        value={data.title}
        onChange={(e) => handleChange(e, "title")}
        autoComplete="off"
      />
      <FormLayout.Group condensed>
        <TextField
          name="text"
          label="Header Text"
          value={data.text}
          onChange={(e) => handleChange(e, "text")}
          autoComplete="off"
        />
        <Select
          name="alignment"
          label="Alignment"
          options={optionsAlignment}
          onChange={(e) => handleChange(e, "alignment")}
          value={data.alignment}
        />
      </FormLayout.Group>
      <FormLayout.Group title="Template">
        <Grid>
          {choices.map((choice, index) => (
            <Grid.Cell
              key={index}
              columnSpan={{ xs: 6, sm: 3, md: 3, lg: 6, xl: 6 }}
            >
              <LegacyCard sectioned>
                <img
                  src={choice.image}
                  alt={choice.label}
                  style={{
                    width: "100%",
                  }}
                />
                <ChoiceList
                  name="template"
                  choices={[choice]}
                  selected={data.template}
                  onChange={(e) => handleChange(e, "template")}
                />
              </LegacyCard>
            </Grid.Cell>
          ))}
        </Grid>
      </FormLayout.Group>
    </FormLayout>
  );
};

const OffersLayout = ({ data, handleChange }) => {
  const optionsOffersTabs = [
    {
      id: "all-customers-1",
      content: "Offer 1",
      accessibilityLabel: "All customers",
      panelID: "all-customers-content-1",
    },
    {
      id: "accepts-marketing-1",
      content: "Offer 2",
      panelID: "accepts-marketing-content-1",
    },
    {
      id: "repeat-customers-1",
      content: "Offer 3",
      panelID: "repeat-customers-content-1",
    },
  ];
  return (
    <FormLayout>
      <LegacyTabs
        tabs={optionsOffersTabs}
        selected={data.offerTab}
        onSelect={(e) => handleChange(e, "offerTab")}
      >
        {data.offerTab == "0" && (
          <FormLayout.Group title={`Offer #${data.offerTab + 1}`}>
            <TextField
              label="Title"
              name="offerOneTitle"
              value={data.offerOneTitle}
              onChange={(e) => handleChange(e, "offerOneTitle")}
              autoComplete="off"
            />
            <TextField
              label="Subtitle"
              name="offerOneSubtitle"
              value={data.offerOneSubtitle}
              onChange={(e) => handleChange(e, "offerOneSubtitle")}
              autoComplete="off"
            />
            <TextField
              label="Quantity"
              type="number"
              value={data.offerOneQty}
              onChange={(e) => handleChange(e, "offerOneQty")}
              autoComplete="off"
              min={1}
            />
          </FormLayout.Group>
        )}
        {data.offerTab == "1" && (
          <FormLayout.Group title={`Offer #${data.offerTab + 1}`}>
            <TextField
              label="Title"
              name="offerTwoTitle"
              value={data.offerTwoTitle}
              onChange={(e) => handleChange(e, "offerTwoTitle")}
              autoComplete="off"
            />
            <TextField
              label="Subtitle"
              name="offerTwoSubtitle"
              value={data.offerTwoSubtitle}
              onChange={(e) => handleChange(e, "offerTwoSubtitle")}
              autoComplete="off"
            />
            <TextField
              name="offerTwoQty"
              label="Quantity"
              type="number"
              value={data.offerTwoQty}
              onChange={(e) => handleChange(e, "offerTwoQty")}
              autoComplete="off"
              min={1}
            />
          </FormLayout.Group>
        )}
        {data.offerTab == "2" && (
          <FormLayout.Group title={`Offer #${data.offerTab + 1}`}>
            <TextField
              label="Title"
              name="offerThreeTitle"
              value={data.offerThreeTitle}
              onChange={(e) => handleChange(e, "offerThreeTitle")}
              autoComplete="off"
            />
            <TextField
              label="Subtitle"
              name="offerThreeSubtitle"
              value={data.offerThreeSubtitle}
              onChange={(e) => handleChange(e, "offerThreeSubtitle")}
              autoComplete="off"
            />
            <TextField
              name="offerThreeQty"
              label="Quantity"
              type="number"
              value={data.offerThreeQty}
              onChange={(e) => handleChange(e, "offerThreeQty")}
              autoComplete="off"
              min={1}
            />
          </FormLayout.Group>
        )}
      </LegacyTabs>
    </FormLayout>
  );
};

const FontSizeLayout = ({ data, handleChange }) => {
  const optionsHeaderFontStyle = [
    { label: "Bold", value: "bold" },
    { label: "Lighter", value: "lighter" },
    { label: "Normal", value: "normal" },
  ];
  return (
    <FormLayout>
      <Text variant="headingmd" fontWeight="bold" as="h6">
        Typography
      </Text>
      <Grid>
        <Grid.Cell columnSpan={{ xs: 6, sm: 3, md: 3, lg: 6, xl: 6 }}>
          <Text variant="headingXs" fontWeight="semibold" as="h6">
            Header
          </Text>
          <FormLayout.Group condensed>
            <TextField
              label="Size"
              name="headerFontSize"
              type="number"
              value={data.headerFontSize}
              onChange={(e) => handleChange(e, "headerFontSize")}
              autoComplete="off"
              min={1}
              max={28}
            />
            <Select
              name="headerFontStyle"
              label="Font style"
              options={optionsHeaderFontStyle}
              onChange={(e) => handleChange(e, "headerFontStyle")}
              value={data.headerFontStyle}
            />
          </FormLayout.Group>
        </Grid.Cell>
        <Grid.Cell columnSpan={{ xs: 6, sm: 3, md: 3, lg: 6, xl: 6 }}>
          <Text variant="headingXs" fontWeight="semibold" as="h6">
            Title & price
          </Text>
          <FormLayout.Group condensed>
            <TextField
              label="Size"
              name="titlePriceFontSize"
              type="number"
              value={data.titlePriceFontSize}
              onChange={(e) => handleChange(e, "titlePriceFontSize")}
              autoComplete="off"
              min={1}
              max={28}
            />
            <Select
              name="titlePriceFontStyle"
              label="Font style"
              options={optionsHeaderFontStyle}
              onChange={(e) => handleChange(e, "titlePriceFontStyle")}
              value={data.titlePriceFontStyle}
            />
          </FormLayout.Group>
        </Grid.Cell>
        <Grid.Cell columnSpan={{ xs: 6, sm: 3, md: 3, lg: 6, xl: 6 }}>
          <Text variant="headingXs" fontWeight="semibold" as="h6">
            Subtitle & compared price
          </Text>
          <FormLayout.Group condensed>
            <TextField
              label="Size"
              name="subHeaderFontSize"
              type="number"
              value={data.subHeaderFontSize}
              onChange={(e) => handleChange(e, "subHeaderFontSize")}
              autoComplete="off"
              min={1}
              max={28}
            />
            <Select
              name="subHeaderFontStyle"
              label="Font style"
              options={optionsHeaderFontStyle}
              onChange={(e) => handleChange(e, "subHeaderFontStyle")}
              value={data.subHeaderFontStyle}
            />
          </FormLayout.Group>
        </Grid.Cell>
      </Grid>
    </FormLayout>
  );
};

const ColorsLayout = ({ data, handleChange }) => {
  const [open, setOpen] = useState("");

  const handleOpen = (value) => {
    if (value === open) {
      setOpen("");
    } else {
      setOpen(value);
    }
  };

  return (
    <FormLayout>
      <Text variant="headingMd" fontWeight="bold" as="h6">
        Background
      </Text>
      <Grid>
        <Grid.Cell columnSpan={{ xs: 6, sm: 3, md: 3, lg: 6, xl: 6 }}>
          <InlineStack gap="300" align="start" blockAlign="center">
            <Button
              onClick={() => handleOpen("bundle")}
              variant="secondary"
              size="medium"
            >
              <Text variant="bodySm" as="span">
                <div
                  style={{
                    backgroundColor: hsbToHex(data.bundleBackColor),
                    width: "30px",
                    height: "20px",
                    borderRadius: "5px",
                  }}
                ></div>
              </Text>
            </Button>
            <Text variant="bodyMd" as="h3">
              Bundle
            </Text>
          </InlineStack>
          {open == "bundle" && (
            <div style={{ marginTop: "10px" }}>
              <ColorPicker
                onChange={(e) => handleChange(e, "bundleBackColor")}
                color={data.bundleBackColor}
                allowAlpha
              />
            </div>
          )}
        </Grid.Cell>
        <Grid.Cell columnSpan={{ xs: 6, sm: 3, md: 3, lg: 6, xl: 6 }}>
          <InlineStack gap="300" align="start" blockAlign="center">
            <Button
              onClick={() => handleOpen("border")}
              variant="secondary"
              size="medium"
            >
              <Text variant="bodySm" as="span">
                <div
                  style={{
                    backgroundColor: hsbToHex(data.borderColor),
                    width: "30px",
                    height: "20px",
                    borderRadius: "5px",
                  }}
                ></div>
              </Text>
            </Button>
            <Text variant="bodyMd" as="h3">
              Border
            </Text>
          </InlineStack>
          {open == "border" && (
            <div style={{ marginTop: "10px" }}>
              <ColorPicker
                onChange={(e) => handleChange(e, "borderColor")}
                color={data.borderColor}
                allowAlpha
              />
            </div>
          )}
        </Grid.Cell>
        <Grid.Cell columnSpan={{ xs: 6, sm: 3, md: 3, lg: 6, xl: 6 }}>
          <InlineStack gap="300" align="start" blockAlign="center">
            <Button
              onClick={() => handleOpen("selected_bundle")}
              variant="secondary"
              size="medium"
            >
              <Text variant="bodySm" as="span">
                <div
                  style={{
                    backgroundColor: hsbToHex(data.selectBundleBackColor),
                    width: "30px",
                    height: "20px",
                    borderRadius: "5px",
                  }}
                ></div>
              </Text>
            </Button>
            <Text variant="bodyMd" as="h3">
              Selected Bundle
            </Text>
          </InlineStack>
          {open == "selected_bundle" && (
            <div style={{ marginTop: "10px" }}>
              <ColorPicker
                onChange={(e) => handleChange(e, "selectBundleBackColor")}
                color={data.selectBundleBackColor}
                allowAlpha
              />
            </div>
          )}
        </Grid.Cell>
        <Grid.Cell columnSpan={{ xs: 6, sm: 3, md: 3, lg: 6, xl: 6 }}>
          <InlineStack gap="300" align="start" blockAlign="center">
            <Button
              onClick={() => handleOpen("border_selected_bundle")}
              variant="secondary"
              size="medium"
            >
              <Text variant="bodySm" as="span">
                <div
                  style={{
                    backgroundColor: hsbToHex(data.selectBorderColor),
                    width: "30px",
                    height: "20px",
                    borderRadius: "5px",
                  }}
                ></div>
              </Text>
            </Button>
            <Text variant="bodyMd" as="h3">
              Border selected bundle
            </Text>
          </InlineStack>
          {open == "border_selected_bundle" && (
            <div style={{ marginTop: "10px" }}>
              <ColorPicker
                onChange={(e) => handleChange(e, "selectBorderColor")}
                color={data.selectBorderColor}
                allowAlpha
              />
            </div>
          )}
        </Grid.Cell>
      </Grid>
      <Text variant="headingMd" fontWeight="bold" as="h6">
        Pricing
      </Text>
      <Grid>
        <Grid.Cell columnSpan={{ xs: 6, sm: 3, md: 3, lg: 6, xl: 6 }}>
          <InlineStack gap="300" align="start" blockAlign="center">
            <Button
              onClick={() => handleOpen("price")}
              variant="secondary"
              size="medium"
            >
              <Text variant="bodySm" as="span">
                <div
                  style={{
                    backgroundColor: hsbToHex(data.priceColor),
                    width: "30px",
                    height: "20px",
                    borderRadius: "5px",
                  }}
                ></div>
              </Text>
            </Button>
            <Text variant="bodyMd" as="h3">
              Price
            </Text>
          </InlineStack>
          {open == "price" && (
            <div style={{ marginTop: "10px" }}>
              <ColorPicker
                onChange={(e) => handleChange(e, "priceColor")}
                color={data.priceColor}
                allowAlpha
              />
            </div>
          )}
        </Grid.Cell>
        <Grid.Cell columnSpan={{ xs: 6, sm: 3, md: 3, lg: 6, xl: 6 }}>
          <InlineStack gap="300" align="start" blockAlign="center">
            <Button
              onClick={() => handleOpen("compared_price")}
              variant="secondary"
              size="medium"
            >
              <Text variant="bodySm" as="span">
                <div
                  style={{
                    backgroundColor: hsbToHex(data.comparedPriceColor),
                    width: "30px",
                    height: "20px",
                    borderRadius: "5px",
                  }}
                ></div>
              </Text>
            </Button>
            <Text variant="bodyMd" as="h3">
              Compared Price
            </Text>
          </InlineStack>
          {open == "compared_price" && (
            <div style={{ marginTop: "10px" }}>
              <ColorPicker
                onChange={(e) => handleChange(e, "comparedPriceColor")}
                color={data.comparedPriceColor}
                allowAlpha
              />
            </div>
          )}
        </Grid.Cell>
      </Grid>
      <Text variant="headingMd" fontWeight="bold" as="h6">
        Text
      </Text>
      <Grid>
        <Grid.Cell columnSpan={{ xs: 6, sm: 3, md: 3, lg: 6, xl: 6 }}>
          <InlineStack gap="300" align="start" blockAlign="center">
            <Button
              onClick={() => handleOpen("header")}
              variant="secondary"
              size="medium"
            >
              <Text variant="bodySm" as="span">
                <div
                  style={{
                    backgroundColor: hsbToHex(data.headerColor),
                    width: "30px",
                    height: "20px",
                    borderRadius: "5px",
                  }}
                ></div>
              </Text>
            </Button>
            <Text variant="bodyMd" as="h3">
              Header
            </Text>
          </InlineStack>
          {open == "header" && (
            <div style={{ marginTop: "10px" }}>
              <ColorPicker
                onChange={(e) => handleChange(e, "headerColor")}
                color={data.headerColor}
                allowAlpha
              />
            </div>
          )}
        </Grid.Cell>
        <Grid.Cell columnSpan={{ xs: 6, sm: 3, md: 3, lg: 6, xl: 6 }}>
          <InlineStack gap="300" align="start" blockAlign="center">
            <Button
              onClick={() => handleOpen("title")}
              variant="secondary"
              size="medium"
            >
              <Text variant="bodySm" as="span">
                <div
                  style={{
                    backgroundColor: hsbToHex(data.titleColor),
                    width: "30px",
                    height: "20px",
                    borderRadius: "5px",
                  }}
                ></div>
              </Text>
            </Button>
            <Text variant="bodyMd" as="h3">
              Title
            </Text>
          </InlineStack>
          {open == "title" && (
            <div style={{ marginTop: "10px" }}>
              <ColorPicker
                onChange={(e) => handleChange(e, "titleColor")}
                color={data.titleColor}
                allowAlpha
              />
            </div>
          )}
        </Grid.Cell>
        <Grid.Cell columnSpan={{ xs: 6, sm: 3, md: 3, lg: 6, xl: 6 }}>
          <InlineStack gap="300" align="start" blockAlign="center">
            <Button
              onClick={() => handleOpen("subTitle")}
              variant="secondary"
              size="medium"
            >
              <Text variant="bodySm" as="span">
                <div
                  style={{
                    backgroundColor: hsbToHex(data.subTitleColor),
                    width: "30px",
                    height: "20px",
                    borderRadius: "5px",
                  }}
                ></div>
              </Text>
            </Button>
            <Text variant="bodyMd" as="h3">
              Subtitle
            </Text>
          </InlineStack>
          {open == "subTitle" && (
            <div style={{ marginTop: "10px" }}>
              <ColorPicker
                onChange={(e) => handleChange(e, "subTitleColor")}
                color={data.subTitleColor}
                allowAlpha
              />
            </div>
          )}
        </Grid.Cell>
      </Grid>
    </FormLayout>
  );
};

export default function Bundle() {
  const { data } = useLoaderData();

  const initialForm = {
    title: "Bundle",
    text: "Bundle & save",
    alignment: "left",
    template: "royal",
    offerTab: 0,
    tab: 0,
    offerOneTitle: "Title 1",
    offerOneSubtitle: "Subtitle 1",
    offerOneQty: "1",
    offerTwoTitle: "Title 2",
    offerTwoSubtitle: "Subtitle 2",
    offerTwoQty: "1",
    offerThreeTitle: "Title 3",
    offerThreeSubtitle: "Subtitle 3",
    offerThreeQty: "1",
    headerFontSize: "16",
    headerFontStyle: "normal",
    titlePriceFontSize: "16",
    titlePriceFontStyle: "normal",
    subHeaderFontSize: "14",
    subHeaderFontStyle: "normal",
    bundleBackColor: {
      hue: 276,
      saturation: 0.025,
      brightness: 1,
      alpha: 0.11194029850746268,
    },
    borderColor: {
      hue: 282,
      saturation: 0.2046875,
      brightness: 0.88125,
      alpha: 1,
    },
    selectBundleBackColor: "",
    selectBorderColor: {
      hue: 295,
      saturation: 0.89375,
      brightness: 0.91875,
      alpha: 1,
    },
    priceColor: {
      hue: 0,
      saturation: 0.075,
      brightness: 0.07499999999999996,
      alpha: 1,
    },
    comparedPriceColor: {
      hue: 0,
      saturation: 0.8796875,
      brightness: 0.925,
      alpha: 1,
    },
    headerColor: {
      hue: 0,
      saturation: 0.075,
      brightness: 0.07499999999999996,
      alpha: 1,
    },
    titleColor: {
      hue: 0,
      saturation: 0.075,
      brightness: 0.07499999999999996,
      alpha: 1,
    },
    subTitleColor: {
      hue: 0,
      saturation: 0.08125,
      brightness: 0.4375,
      alpha: 1,
    },
    radio: "optionOne",
  };

  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (data) {
      setForm(data);
    } else {
      initialForm;
    }
  }, [data]);

  const handleChange = (value, name) => {
    setForm({ ...form, [name]: value });
  };

  const optionsTabs = [
    {
      id: "all-customers-1",
      content: "Block",
      accessibilityLabel: "All customers",
      panelID: "all-customers-content-1",
    },
    {
      id: "accepts-marketing-1",
      content: "Offers",
      panelID: "accepts-marketing-content-1",
    },
    {
      id: "repeat-customers-1",
      content: "Font & size",
      panelID: "repeat-customers-content-1",
    },
    {
      id: "prospects-1",
      content: "Colors",
      panelID: "prospects-content-1",
    },
  ];

  const fetcher = useFetcher();
  const handleSave = () => {
    setLoading(true);
    fetcher.submit(
      { type: "save", form: JSON.stringify(form) },
      { method: "POST" },
    );
  };

  useEffect(() => {
    if (fetcher.state === "idle" && fetcher.data) {
      setForm(fetcher.data);
      setLoading(false);
    }
  }, [fetcher.state]);
  return (
    <Page
      fullWidth
      title={form.title}
      primaryAction={{
        content: "Save",
        onAction: handleSave,
        loading: loading,
      }}
    >
      <Grid>
        <Grid.Cell columnSpan={{ xs: 6, sm: 3, md: 3, lg: 6, xl: 6 }}>
          <LegacyCard>
            <Tabs
              tabs={optionsTabs}
              selected={form.tab}
              onSelect={(e) => handleChange(e, "tab")}
              fitted
            >
              <LegacyCard.Section>
                <Form>
                  {form.tab == "0" && (
                    <BlockLayout data={form} handleChange={handleChange} />
                  )}
                  {form.tab == "1" && (
                    <OffersLayout data={form} handleChange={handleChange} />
                  )}
                  {form.tab == "2" && (
                    <FontSizeLayout data={form} handleChange={handleChange} />
                  )}
                  {form.tab == "3" && (
                    <ColorsLayout data={form} handleChange={handleChange} />
                  )}
                </Form>
              </LegacyCard.Section>
            </Tabs>
          </LegacyCard>
        </Grid.Cell>
        <Grid.Cell columnSpan={{ xs: 6, sm: 3, md: 3, lg: 6, xl: 6 }}>
          <LegacyCard title="Live Preview" sectioned>
            <LegacyCard.Section>
              <div>
                <Text variant="bodyMd" as="h6">
                  <div
                    style={{
                      textAlign: `${form.alignment}`,
                      fontSize: `${form.headerFontSize}px`,
                      fontWeight: form.headerFontStyle,
                      color: hsbToHex(form.headerColor),
                    }}
                  >
                    {form.text}
                  </div>
                </Text>
              </div>
              <div>
                <div
                  style={{
                    border: `${form.radio === "optionOne" ? `2px solid ${hsbToHex(form.selectBorderColor)}` : `2px solid ${hsbToHex(form.borderColor)}`}`,
                    padding: "12px 20px",
                    margin: "10px 0",
                    backgroundColor: `${form.radio === "optionOne" ? `${hsbToHex(form.selectBundleBackColor)}` : `${hsbToHex(form.bundleBackColor)}`}`,
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      width: "100%",
                      justifyContent: "space-between",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                      }}
                    >
                      <div>
                        <RadioButton
                          checked={form.radio === "optionOne"}
                          id="optionOne"
                          name="optionOne"
                          onChange={() => handleChange("optionOne", "radio")}
                        />
                      </div>
                      <div>
                        <div
                          style={{
                            fontSize: `${form.titlePriceFontSize}px`,
                            fontWeight: form.titlePriceFontStyle,
                            color: hsbToHex(form.titleColor),
                          }}
                        >
                          {form.offerOneTitle}
                        </div>
                        <div
                          style={{
                            fontSize: `${form.titlePriceFontSize}px`,
                            fontWeight: form.titlePriceFontStyle,
                            color: hsbToHex(form.priceColor),
                            marginTop: "7px",
                          }}
                        >
                          ₹{`${(885.95 * form.offerOneQty).toFixed(2)}`}
                        </div>
                      </div>
                    </div>
                    <div>
                      <div
                        style={{
                          fontSize: `${form.subHeaderFontSize}px`,
                          fontWeight: form.subHeaderFontStyle,
                          color: hsbToHex(form.subTitleColor),
                        }}
                      >
                        {form.offerOneSubtitle}
                      </div>
                      <div
                        style={{
                          fontSize: `${form.subHeaderFontSize}px`,
                          fontWeight: form.subHeaderFontStyle,
                          marginTop: "7px",
                          textDecoration: "line-through",
                          color: hsbToHex(form.comparedPriceColor),
                        }}
                      >
                        ₹1771.90
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  style={{
                    border: `${form.radio === "optionTwo" ? `2px solid ${hsbToHex(form.selectBorderColor)}` : `2px solid ${hsbToHex(form.borderColor)}`}`,
                    padding: "12px 20px",
                    margin: "10px 0",
                    backgroundColor: `${form.radio === "optionTwo" ? `${hsbToHex(form.selectBundleBackColor)}` : `${hsbToHex(form.bundleBackColor)}`}`,
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      width: "100%",
                      justifyContent: "space-between",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                      }}
                    >
                      <div>
                        <RadioButton
                          checked={form.radio === "optionTwo"}
                          id="optionTwo"
                          name="optionTwo"
                          onChange={() => handleChange("optionTwo", "radio")}
                        />
                      </div>
                      <div>
                        <div
                          style={{
                            fontSize: `${form.titlePriceFontSize}px`,
                            fontWeight: form.titlePriceFontStyle,
                            color: hsbToHex(form.titleColor),
                          }}
                        >
                          {form.offerTwoTitle}
                        </div>
                        <div
                          style={{
                            fontSize: `${form.titlePriceFontSize}px`,
                            fontWeight: form.titlePriceFontStyle,
                            marginTop: "7px",
                            color: hsbToHex(form.priceColor),
                          }}
                        >
                          ₹{`${(1594.71 * form.offerTwoQty).toFixed(2)}`}
                        </div>
                      </div>
                    </div>
                    <div>
                      <div
                        style={{
                          fontSize: `${form.subHeaderFontSize}px`,
                          fontWeight: form.subHeaderFontStyle,
                          color: hsbToHex(form.subTitleColor),
                        }}
                      >
                        {form.offerTwoSubtitle}
                      </div>
                      <div
                        style={{
                          fontSize: `${form.subHeaderFontSize}px`,
                          fontWeight: form.subHeaderFontStyle,
                          marginTop: "7px",
                          textDecoration: "line-through",
                          color: hsbToHex(form.comparedPriceColor),
                        }}
                      >
                        ₹1771.90
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  style={{
                    border: `${form.radio === "optionThree" ? `2px solid ${hsbToHex(form.selectBorderColor)}` : `2px solid ${hsbToHex(form.borderColor)}`}`,
                    padding: "12px 20px",
                    margin: "10px 0",
                    backgroundColor: `${form.radio === "optionThree" ? `${hsbToHex(form.selectBundleBackColor)}` : `${hsbToHex(form.bundleBackColor)}`}`,
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      width: "100%",
                      justifyContent: "space-between",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                      }}
                    >
                      <div>
                        <RadioButton
                          checked={form.radio === "optionThree"}
                          id="optionThree"
                          name="optionThree"
                          onChange={() => handleChange("optionThree", "radio")}
                        />
                      </div>
                      <div>
                        <div
                          style={{
                            fontSize: `${form.titlePriceFontSize}px`,
                            fontWeight: form.titlePriceFontStyle,
                            color: hsbToHex(form.titleColor),
                          }}
                        >
                          {form.offerThreeTitle}
                        </div>
                        <div
                          style={{
                            fontSize: `${form.titlePriceFontSize}px`,
                            fontWeight: form.titlePriceFontStyle,
                            marginTop: "7px",
                            color: hsbToHex(form.priceColor),
                          }}
                        >
                          ₹{`${(2126.28 * form.offerThreeQty).toFixed(2)}`}
                        </div>
                      </div>
                    </div>
                    <div>
                      <div
                        style={{
                          fontSize: `${form.subHeaderFontSize}px`,
                          fontWeight: form.subHeaderFontStyle,
                          color: hsbToHex(form.subTitleColor),
                        }}
                      >
                        {form.offerThreeSubtitle}
                      </div>
                      <div
                        style={{
                          fontSize: `${form.subHeaderFontSize}px`,
                          fontWeight: form.subHeaderFontStyle,
                          marginTop: "7px",
                          textDecoration: "line-through",
                          color: hsbToHex(form.comparedPriceColor),
                        }}
                      >
                        ₹1771.90
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </LegacyCard.Section>
          </LegacyCard>
        </Grid.Cell>
      </Grid>
    </Page>
  );
}
