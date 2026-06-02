import { createFileRoute } from "@tanstack/react-router";
import { ToolCategory } from "./tools.ai";
export const Route = createFileRoute("/tools/text")({ component: () => <ToolCategory cat="text" title="أدوات النصوص" /> });
