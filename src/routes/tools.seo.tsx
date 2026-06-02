import { createFileRoute } from "@tanstack/react-router";
import { ToolCategory } from "./tools.ai";
export const Route = createFileRoute("/tools/seo")({ component: () => <ToolCategory cat="seo" title="أدوات تحسين محركات البحث" /> });
