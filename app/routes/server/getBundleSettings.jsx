import prisma from "../../db.server";
import { authenticate } from "../../shopify.server";

const getBundleSettings = async (request) => {
  const { admin, session } = await authenticate.admin(request);

  try {
    const data = await prisma.BundleSettings.findFirst();
    return JSON.parse(data.settings);
  } catch (err) {
    return err;
  }
};

export default getBundleSettings;
