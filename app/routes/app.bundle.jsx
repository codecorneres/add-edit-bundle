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
  Box,
} from "@shopify/polaris";
import { useEffect, useState } from "react";
import { useFetcher, useLoaderData } from "@remix-run/react";
import actions from "./action/actions";
import getBundleSettings from "./server/getBundleSettings";
import { useAppBridge } from "@shopify/app-bridge-react";
import styles from "./_index/styles.module.css";

export const loader = async ({ request }) => {
  const data = await getBundleSettings(request);

  return { data };
};

export const action = async ({ request }) => {
  const data = await actions(request);

  return data;
};

const BlockLayout = ({ data, handleChange }) => {
  console.log(data, "data");
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
          <div style={{ marginTop: "20px" }}>
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
          </div>
        )}
        {data.offerTab == "1" && (
          <div style={{ marginTop: "20px" }}>
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
          </div>
        )}
        {data.offerTab == "2" && (
          <div style={{ marginTop: "20px" }}>
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
          </div>
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
      <div className="options" style={{ marginTop: "20px" }}>
        <div
          className="colorLayoutTitle"
          style={{
            borderBottom: "1px solid #E1E1E1",
            paddingBottom: "10px",
            marginBottom: "20px",
          }}
        >
          <Text variant="headingLg" fontWeight="bold" as="h2">
            Background
          </Text>
        </div>
        <Grid>
          <Grid.Cell columnSpan={{ xs: 6, sm: 3, md: 3, lg: 3, xl: 3 }}>
            <div className={styles.themeColorOption}>
              <Box gap="300" align="start" blockAlign="center">
                <div
                  variant="secondary"
                  size="medium"
                  style={{
                    padding: "10px 10px 8px",
                    borderRadius: "10px",
                    backgroundColor: "#fff",
                    boxShadow: "0px 4px 10px 0px rgba(0,0,0,0.15)",
                  }}
                >
                  <div className={styles.colorBox}>
                    <div
                      onClick={() => handleOpen("bundle")}
                      style={{
                        backgroundColor: hsbToHex(data.bundleBackColor),
                        width: "100%",
                        height: "110px",
                        borderRadius: "12px",
                        cursor: "pointer",
                        border: `1px solid rgba(0,0,0,0.06)`,
                      }}
                    ></div>
                    <div className={styles.colorCode}>
                      <Text variant="bodyXs" as="h3" fontWeight="bold">
                        {hsbToHex(data.bundleBackColor)}
                      </Text>
                    </div>
                  </div>

                  <div style={{ marginTop: "8px" }}>
                    <Text
                      variant="bodyMd"
                      as="h3"
                      alignment="center"
                      fontWeight="bold"
                    >
                      Bundle Background
                    </Text>
                  </div>
                </div>
              </Box>
              {open == "bundle" && (
                <div
                  style={{ marginTop: "10px" }}
                  className={styles.colorPicker}
                >
                  <ColorPicker
                    onChange={(e) => handleChange(e, "bundleBackColor")}
                    color={data.bundleBackColor}
                    allowAlpha
                  />
                </div>
              )}
            </div>
          </Grid.Cell>
          <Grid.Cell columnSpan={{ xs: 6, sm: 3, md: 3, lg: 3, xl: 3 }}>
            <div className={styles.themeColorOption}>
              <Box gap="300" align="start" blockAlign="center">
                <div
                  variant="secondary"
                  size="medium"
                  style={{
                    padding: "10px 10px 8px",
                    borderRadius: "10px",
                    backgroundColor: "#fff",
                    boxShadow: "0px 4px 10px 0px rgba(0,0,0,0.15)",
                  }}
                >
                  <div className={styles.colorBox}>
                    <div
                      onClick={() => handleOpen("border")}
                      style={{
                        backgroundColor: hsbToHex(data.borderColor),
                        width: "100%",
                        height: "110px",
                        borderRadius: "12px",
                        cursor: "pointer",
                        border: `1px solid rgba(0,0,0,0.06)`,
                      }}
                    ></div>
                    <div className={styles.colorCode}>
                      <Text variant="bodyXs" as="h3" fontWeight="bold">
                        {hsbToHex(data.borderColor)}
                      </Text>
                    </div>
                  </div>

                  <div style={{ marginTop: "8px" }}>
                    <Text
                      variant="bodyMd"
                      as="h3"
                      alignment="center"
                      fontWeight="bold"
                    >
                      Border
                    </Text>
                  </div>
                </div>
              </Box>
              {open == "border" && (
                <div
                  style={{ marginTop: "10px" }}
                  className={styles.colorPicker}
                >
                  <ColorPicker
                    onChange={(e) => handleChange(e, "borderColor")}
                    color={data.borderColor}
                    allowAlpha
                  />
                </div>
              )}
            </div>
          </Grid.Cell>
          <Grid.Cell columnSpan={{ xs: 6, sm: 3, md: 3, lg: 3, xl: 3 }}>
            <div className={styles.themeColorOption}>
              <Box gap="300" align="start" blockAlign="center">
                <div
                  variant="secondary"
                  size="medium"
                  style={{
                    padding: "10px 10px 8px",
                    borderRadius: "10px",
                    backgroundColor: "#fff",
                    boxShadow: "0px 4px 10px 0px rgba(0,0,0,0.15)",
                  }}
                >
                  <div className={styles.colorBox}>
                    <div
                      onClick={() => handleOpen("selected_bundle")}
                      style={{
                        backgroundColor: hsbToHex(data.selectBundleBackColor),
                        width: "100%",
                        height: "110px",
                        borderRadius: "12px",
                        cursor: "pointer",
                        border: `1px solid rgba(0,0,0,0.06)`,
                      }}
                    ></div>
                    <div className={styles.colorCode}>
                      <Text variant="bodyXs" as="h3" fontWeight="bold">
                        {hsbToHex(data.selectBundleBackColor)}
                      </Text>
                    </div>
                  </div>

                  <div style={{ marginTop: "8px" }}>
                    <Text
                      variant="bodyMd"
                      as="h3"
                      alignment="center"
                      fontWeight="bold"
                    >
                      Selected Bundle
                    </Text>
                  </div>
                </div>
              </Box>
              {open == "selected_bundle" && (
                <div
                  style={{ marginTop: "10px" }}
                  className={styles.colorPicker}
                >
                  <ColorPicker
                    onChange={(e) => handleChange(e, "selectBundleBackColor")}
                    color={data.selectBundleBackColor}
                    allowAlpha
                  />
                </div>
              )}
            </div>
          </Grid.Cell>
          <Grid.Cell columnSpan={{ xs: 6, sm: 3, md: 3, lg: 3, xl: 3 }}>
            <div className={styles.themeColorOption}>
              <Box gap="300" align="start" blockAlign="center">
                <div
                  variant="secondary"
                  size="medium"
                  style={{
                    padding: "10px 10px 8px",
                    borderRadius: "10px",
                    backgroundColor: "#fff",
                    boxShadow: "0px 4px 10px 0px rgba(0,0,0,0.15)",
                  }}
                >
                  <div className={styles.colorBox}>
                    <div
                      onClick={() => handleOpen("border_selected_bundle")}
                      style={{
                        backgroundColor: hsbToHex(data.selectBorderColor),
                        width: "100%",
                        height: "110px",
                        borderRadius: "12px",
                        cursor: "pointer",
                        border: `1px solid rgba(0,0,0,0.06)`,
                      }}
                    ></div>
                    <div className={styles.colorCode}>
                      <Text variant="bodyXs" as="h3" fontWeight="bold">
                        {hsbToHex(data.selectBorderColor)}
                      </Text>
                    </div>
                  </div>

                  <div style={{ marginTop: "8px" }}>
                    <Text
                      variant="bodyMd"
                      as="h3"
                      alignment="center"
                      fontWeight="bold"
                    >
                      Border selected bundle
                    </Text>
                  </div>
                </div>
              </Box>
              {open == "border_selected_bundle" && (
                <div
                  style={{ marginTop: "10px" }}
                  className={styles.colorPicker}
                >
                  <ColorPicker
                    onChange={(e) => handleChange(e, "selectBorderColor")}
                    color={data.selectBorderColor}
                    allowAlpha
                  />
                </div>
              )}
            </div>
          </Grid.Cell>
        </Grid>
      </div>

      <div className="options" style={{ marginTop: "20px" }}>
        <div
          className="colorLayoutTitle"
          style={{
            borderBottom: "1px solid #E1E1E1",
            paddingBottom: "10px",
            marginBottom: "20px",
          }}
        >
          <Text variant="headingLg" fontWeight="bold" as="h2">
            Pricing
          </Text>
        </div>

        <Grid>
          <Grid.Cell columnSpan={{ xs: 6, sm: 3, md: 3, lg: 3, xl: 3 }}>
            <div className={styles.themeColorOption}>
              <Box gap="300" align="start" blockAlign="center">
                <div
                  variant="secondary"
                  size="medium"
                  style={{
                    padding: "10px 10px 8px",
                    borderRadius: "10px",
                    backgroundColor: "#fff",
                    boxShadow: "0px 4px 10px 0px rgba(0,0,0,0.15)",
                  }}
                >
                  <div className={styles.colorBox}>
                    <div
                      onClick={() => handleOpen("price")}
                      style={{
                        backgroundColor: hsbToHex(data.priceColor),
                        width: "100%",
                        height: "110px",
                        borderRadius: "12px",
                        cursor: "pointer",
                        border: `1px solid rgba(0,0,0,0.06)`,
                      }}
                    ></div>
                    <div className={styles.colorCode}>
                      <Text variant="bodyXs" as="h3" fontWeight="bold">
                        {hsbToHex(data.priceColor)}
                      </Text>
                    </div>
                  </div>

                  <div style={{ marginTop: "8px" }}>
                    <Text
                      variant="bodyMd"
                      as="h3"
                      alignment="center"
                      fontWeight="bold"
                    >
                      Price
                    </Text>
                  </div>
                </div>
              </Box>
              {open == "price" && (
                <div
                  style={{ marginTop: "10px" }}
                  className={styles.colorPicker}
                >
                  <ColorPicker
                    onChange={(e) => handleChange(e, "priceColor")}
                    color={data.priceColor}
                    allowAlpha
                  />
                </div>
              )}
            </div>
          </Grid.Cell>
          <Grid.Cell columnSpan={{ xs: 6, sm: 3, md: 3, lg: 3, xl: 3 }}>
            <div className={styles.themeColorOption}>
              <Box gap="300" align="start" blockAlign="center">
                <div
                  variant="secondary"
                  size="medium"
                  style={{
                    padding: "10px 10px 8px",
                    borderRadius: "10px",
                    backgroundColor: "#fff",
                    boxShadow: "0px 4px 10px 0px rgba(0,0,0,0.15)",
                  }}
                >
                  <div className={styles.colorBox}>
                    <div
                      onClick={() => handleOpen("compared_price")}
                      style={{
                        backgroundColor: hsbToHex(data.comparedPriceColor),
                        width: "100%",
                        height: "110px",
                        borderRadius: "12px",
                        cursor: "pointer",
                        border: `1px solid rgba(0,0,0,0.06)`,
                      }}
                    ></div>
                    <div className={styles.colorCode}>
                      <Text variant="bodyXs" as="h3" fontWeight="bold">
                        {hsbToHex(data.comparedPriceColor)}
                      </Text>
                    </div>
                  </div>

                  <div style={{ marginTop: "8px" }}>
                    <Text
                      variant="bodyMd"
                      as="h3"
                      alignment="center"
                      fontWeight="bold"
                    >
                      Compared Price
                    </Text>
                  </div>
                </div>
              </Box>
              {open == "compared_price" && (
                <div
                  style={{ marginTop: "10px" }}
                  className={styles.colorPicker}
                >
                  <ColorPicker
                    onChange={(e) => handleChange(e, "comparedPriceColor")}
                    color={data.comparedPriceColor}
                    allowAlpha
                  />
                </div>
              )}
            </div>
          </Grid.Cell>
        </Grid>
      </div>

      <div className="options" style={{ marginTop: "20px" }}>
        <div
          className="colorLayoutTitle"
          style={{
            borderBottom: "1px solid #E1E1E1",
            paddingBottom: "10px",
            marginBottom: "20px",
          }}
        >
          <Text variant="headingLg" fontWeight="bold" as="h2">
            Text
          </Text>
        </div>
        <Grid>
          <Grid.Cell columnSpan={{ xs: 6, sm: 3, md: 3, lg: 3, xl: 3 }}>
            <div className={styles.themeColorOption}>
              <Box gap="300" align="start" blockAlign="center">
                <div
                  variant="secondary"
                  size="medium"
                  style={{
                    padding: "10px 10px 8px",
                    borderRadius: "10px",
                    backgroundColor: "#fff",
                    boxShadow: "0px 4px 10px 0px rgba(0,0,0,0.15)",
                  }}
                >
                  <div className={styles.colorBox}>
                    <div
                      onClick={() => handleOpen("header")}
                      style={{
                        backgroundColor: hsbToHex(data.headerColor),
                        width: "100%",
                        height: "110px",
                        borderRadius: "12px",
                        cursor: "pointer",
                        border: `1px solid rgba(0,0,0,0.06)`,
                      }}
                    ></div>
                    <div className={styles.colorCode}>
                      <Text variant="bodyXs" as="h3" fontWeight="bold">
                        {hsbToHex(data.headerColor)}
                      </Text>
                    </div>
                  </div>

                  <div style={{ marginTop: "8px" }}>
                    <Text
                      variant="bodyMd"
                      as="h3"
                      alignment="center"
                      fontWeight="bold"
                    >
                      Header
                    </Text>
                  </div>
                </div>
              </Box>
              {open == "header" && (
                <div
                  style={{ marginTop: "10px" }}
                  className={styles.colorPicker}
                >
                  <ColorPicker
                    onChange={(e) => handleChange(e, "headerColor")}
                    color={data.headerColor}
                    allowAlpha
                  />
                </div>
              )}
            </div>
          </Grid.Cell>
          <Grid.Cell columnSpan={{ xs: 6, sm: 3, md: 3, lg: 3, xl: 3 }}>
            <div className={styles.themeColorOption}>
              <Box gap="300" align="start" blockAlign="center">
                <div
                  variant="secondary"
                  size="medium"
                  style={{
                    padding: "10px 10px 8px",
                    borderRadius: "10px",
                    backgroundColor: "#fff",
                    boxShadow: "0px 4px 10px 0px rgba(0,0,0,0.15)",
                  }}
                >
                  <div className={styles.colorBox}>
                    <div
                      onClick={() => handleOpen("title")}
                      style={{
                        backgroundColor: hsbToHex(data.titleColor),
                        width: "100%",
                        height: "110px",
                        borderRadius: "12px",
                        cursor: "pointer",
                        border: `1px solid rgba(0,0,0,0.06)`,
                      }}
                    ></div>
                    <div className={styles.colorCode}>
                      <Text variant="bodyXs" as="h3" fontWeight="bold">
                        {hsbToHex(data.titleColor)}
                      </Text>
                    </div>
                  </div>

                  <div style={{ marginTop: "8px" }}>
                    <Text
                      variant="bodyMd"
                      as="h3"
                      alignment="center"
                      fontWeight="bold"
                    >
                      Title
                    </Text>
                  </div>
                </div>
              </Box>
              {open == "title" && (
                <div
                  style={{ marginTop: "10px" }}
                  className={styles.colorPicker}
                >
                  <ColorPicker
                    onChange={(e) => handleChange(e, "titleColor")}
                    color={data.titleColor}
                    allowAlpha
                  />
                </div>
              )}
            </div>
          </Grid.Cell>
          <Grid.Cell columnSpan={{ xs: 6, sm: 3, md: 3, lg: 3, xl: 3 }}>
            <div className={styles.themeColorOption}>
              <Box gap="300" align="start" blockAlign="center">
                <div
                  variant="secondary"
                  size="medium"
                  style={{
                    padding: "10px 10px 8px",
                    borderRadius: "10px",
                    backgroundColor: "#fff",
                    boxShadow: "0px 4px 10px 0px rgba(0,0,0,0.15)",
                  }}
                >
                  <div className={styles.colorBox}>
                    <div
                      onClick={() => handleOpen("subTitle")}
                      style={{
                        backgroundColor: hsbToHex(data.subTitleColor),
                        width: "100%",
                        height: "110px",
                        borderRadius: "12px",
                        cursor: "pointer",
                        border: `1px solid rgba(0,0,0,0.06)`,
                      }}
                    ></div>
                    <div className={styles.colorCode}>
                      <Text variant="bodyXs" as="h3" fontWeight="bold">
                        {hsbToHex(data.subTitleColor)}
                      </Text>
                    </div>
                  </div>

                  <div style={{ marginTop: "8px" }}>
                    <Text
                      variant="bodyMd"
                      as="h3"
                      alignment="center"
                      fontWeight="bold"
                    >
                      Subtitle
                    </Text>
                  </div>
                </div>
              </Box>
              {open == "subTitle" && (
                <div
                  style={{ marginTop: "10px" }}
                  className={styles.colorPicker}
                >
                  <ColorPicker
                    onChange={(e) => handleChange(e, "subTitleColor")}
                    color={data.subTitleColor}
                    allowAlpha
                  />
                </div>
              )}
            </div>
          </Grid.Cell>
        </Grid>
      </div>
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
  const fetcher = useFetcher();
  const shopify = useAppBridge();

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
      shopify.toast.show("Saved");
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
        <Grid.Cell columnSpan={{ xs: 6, sm: 3, md: 3, lg: 7, xl: 7 }}>
          <LegacyCard>
            <Tabs
              tabs={optionsTabs}
              selected={form.tab}
              onSelect={(e) => handleChange(e, "tab")}
              fitted
            >
              <div className={styles.tabLayout} style={{ overflow: "auto" }}>
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
              </div>
            </Tabs>
          </LegacyCard>
        </Grid.Cell>
        <Grid.Cell columnSpan={{ xs: 6, sm: 3, md: 3, lg: 5, xl: 5 }}>
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
                  onClick={() => handleChange("optionOne", "radio")}
                  style={{
                    border: `${form.radio === "optionOne" ? `1px solid ${hsbToHex(form.selectBorderColor)}` : `1px solid ${hsbToHex(form.borderColor)}`}`,
                    padding: "15px 20px",
                    margin: "10px 0",
                    backgroundColor: `${form.radio === "optionOne" ? `${hsbToHex(form.selectBundleBackColor)}` : `${hsbToHex(form.bundleBackColor)}`}`,
                    borderRadius: "12px",
                    cursor: "pointer",
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
                      {/* <div>
                        <RadioButton
                          checked={form.radio === "optionOne"}
                          id="optionOne"
                          name="optionOne"
                          onChange={() => handleChange("optionOne", "radio")}
                        />
                      </div> */}
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
                    <div style={{ textAlign: "right" }}>
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
                  onClick={() => handleChange("optionTwo", "radio")}
                  style={{
                    border: `${form.radio === "optionTwo" ? `1px solid ${hsbToHex(form.selectBorderColor)}` : `1px solid ${hsbToHex(form.borderColor)}`}`,
                    padding: "15px 20px",
                    margin: "10px 0",
                    backgroundColor: `${form.radio === "optionTwo" ? `${hsbToHex(form.selectBundleBackColor)}` : `${hsbToHex(form.bundleBackColor)}`}`,
                    borderRadius: "12px",
                    cursor: "pointer",
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
                      {/* <div>
                        <RadioButton
                          checked={form.radio === "optionTwo"}
                          id="optionTwo"
                          name="optionTwo"
                          onChange={() => handleChange("optionTwo", "radio")}
                        />
                      </div> */}
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
                    <div style={{ textAlign: "right" }}>
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
                  onClick={() => handleChange("optionThree", "radio")}
                  style={{
                    border: `${form.radio === "optionThree" ? `1px solid ${hsbToHex(form.selectBorderColor)}` : `1px solid ${hsbToHex(form.borderColor)}`}`,
                    padding: "15px 20px",
                    margin: "10px 0",
                    backgroundColor: `${form.radio === "optionThree" ? `${hsbToHex(form.selectBundleBackColor)}` : `${hsbToHex(form.bundleBackColor)}`}`,
                    borderRadius: "12px",
                    cursor: "pointer",
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
                      {/* <div>
                        <RadioButton
                          checked={form.radio === "optionThree"}
                          id="optionThree"
                          name="optionThree"
                          onChange={() => handleChange("optionThree", "radio")}
                        />
                      </div> */}
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
                    <div style={{ textAlign: "right" }}>
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
