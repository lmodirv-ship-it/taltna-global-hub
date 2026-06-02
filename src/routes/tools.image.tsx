import { createFileRoute } from "@tanstack/react-router";
import { ToolCategory } from "./tools.ai";
export const Route = createFileRoute("/tools/image")({ component: () => <ToolCategory cat="image" title="أدوات الصور" /> });
