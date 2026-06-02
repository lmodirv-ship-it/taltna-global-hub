import { createFileRoute } from "@tanstack/react-router";
import { ToolCategory } from "./tools.ai";
export const Route = createFileRoute("/tools/pdf")({ component: () => <ToolCategory cat="pdf" title="أدوات PDF" /> });
