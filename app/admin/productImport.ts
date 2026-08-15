import type { ManagedBrand, ProductInsightBlock } from "../content/types";

export type ProductImportResult = {
  brand: string;
  title: string;
  category: string;
  family: number | null;
  detail: string;
  reference: string;
  price: string;
  visible: boolean | null;
  contentTitle: string;
  contentCopy: string;
  insightBlocks: ProductInsightBlock[];
  uncertainFields: string[];
  warnings: string[];
};

const schemaMarker = "SWISS_PERPETUAL_PRODUCT_V1";
const endMarker = "END_PRODUCT";
type SectionName = "CONTENT_COPY" | "CURATOR_INSIGHT" | "UNCERTAIN_FIELDS";

const cleanTitle = (value: string) => value.replace(/\s*\((?:19|20)\d{2}\)\s*$/, "").trim();
const normalize = (value: string) => value.trim().toLocaleLowerCase().replace(/[^a-z0-9]+/g, " ").trim();

function readSection(text: string, name: SectionName) {
  const expression = new RegExp(`${name}_START\\s*\\r?\\n([\\s\\S]*?)\\r?\\n${name}_END`, "i");
  return text.match(expression)?.[1]?.trim() ?? "";
}

function readFields(text: string) {
  const fields = new Map<string, string>();
  const lines = text.replace(/\r/g, "").split("\n");
  const known = new Set(["BRAND", "TITLE", "CATEGORY", "MODEL_DETAIL", "REFERENCE", "PRICE_CURRENCY", "PRICE_AMOUNT", "VISIBLE", "CONTENT_TITLE"]);
  for (let index = 0; index < lines.length; index += 1) {
    const match = lines[index].match(/^([A-Z_]+):\s*(.*)$/);
    if (!match || !known.has(match[1])) continue;
    let value = match[2].trim();
    if (!value && match[1] === "CONTENT_TITLE") {
      const next = lines[index + 1]?.trim() ?? "";
      if (next && !/^[A-Z_]+(?::|_START|_END)$/.test(next)) value = next;
    }
    fields.set(match[1], value);
  }
  return fields;
}

function formatPrice(currency: string, amount: string) {
  if (!amount.trim()) return "";
  const numeric = Number(amount.replace(/[^0-9.]/g, ""));
  const formatted = Number.isFinite(numeric) ? new Intl.NumberFormat("en-US", { maximumFractionDigits: 2 }).format(numeric) : amount.trim();
  return [currency.trim().toUpperCase(), formatted].filter(Boolean).join(" ");
}

export function parseProductImport(text: string, currentBrand: ManagedBrand): ProductImportResult {
  const source = text.trim();
  if (!source.includes(schemaMarker)) throw new Error(`Missing ${schemaMarker}.`);
  if (!source.includes(endMarker)) throw new Error(`Missing ${endMarker}.`);

  const fields = readFields(source);
  const warnings: string[] = [];
  const importedBrand = fields.get("BRAND") ?? "";
  if (importedBrand && normalize(importedBrand) !== normalize(currentBrand.name)) warnings.push(`The pasted brand is ${importedBrand}, but you are editing ${currentBrand.name}.`);

  const category = fields.get("CATEGORY") ?? "";
  let family: number | null = null;
  if (category && normalize(category) !== "watch") {
    const categoryIndex = currentBrand.families.findIndex((item) => normalize(item) === normalize(category));
    if (categoryIndex >= 0) family = categoryIndex;
    else warnings.push(`Category "${category}" does not exist for ${currentBrand.name}; the current category will be kept.`);
  } else if (category) warnings.push("Generic category 'Watch' was ignored; the current category will be kept.");

  const curatorText = readSection(source, "CURATOR_INSIGHT");
  const curatorLines = curatorText.split("\n").map((line) => line.trim()).filter(Boolean);
  const insightBlocks: ProductInsightBlock[] = curatorLines.map((line, index) => {
    const separator = line.indexOf("|");
    if (separator === -1) {
      if (curatorLines.length === 1) warnings.push("Curator Insight was imported as one block. Use 'Label | Value' lines to create separate blocks.");
      return { id: crypto.randomUUID(), label: curatorLines.length === 1 ? "Curator Insight" : `Insight ${index + 1}`, value: line };
    }
    return { id: crypto.randomUUID(), label: line.slice(0, separator).trim(), value: line.slice(separator + 1).trim() };
  }).filter((block) => block.label && block.value);

  const detail = (fields.get("MODEL_DETAIL") ?? "").replace(/\s*,\s*/g, " / ");
  const uncertainFields = readSection(source, "UNCERTAIN_FIELDS").split("\n").map((line) => line.trim()).filter(Boolean);
  if (uncertainFields.length) warnings.push(`Review uncertain fields: ${uncertainFields.join(", ")}`);

  const visibleValue = (fields.get("VISIBLE") ?? "").toUpperCase();
  return {
    brand: importedBrand,
    title: cleanTitle(fields.get("TITLE") ?? ""),
    category,
    family,
    detail,
    reference: fields.get("REFERENCE") ?? "",
    price: formatPrice(fields.get("PRICE_CURRENCY") ?? "", fields.get("PRICE_AMOUNT") ?? ""),
    visible: visibleValue === "YES" ? true : visibleValue === "NO" ? false : null,
    contentTitle: fields.get("CONTENT_TITLE") ?? "",
    contentCopy: readSection(source, "CONTENT_COPY"),
    insightBlocks,
    uncertainFields,
    warnings,
  };
}
