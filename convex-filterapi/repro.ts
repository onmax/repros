/**
 * Reproduction: FilterApi filters out public mutations from clientApi
 *
 * When using R2's clientApi(), the exported mutations are incorrectly filtered out
 * by FilterApi<..., FunctionReference<any, "public">>.
 *
 * Run: npm i && npm run typecheck
 */

import { api } from "./convex/_generated/api";
import type { ClientApi } from "@convex-dev/r2";

// This should work - api.r2 should have the mutations from clientApi
export const r2Api: Pick<ClientApi, "generateUploadUrl" | "syncMetadata"> = api.r2;

// Error: Type '{ listImages: ... }' is missing properties:
// 'generateUploadUrl', 'syncMetadata'
