import { parse } from "sh-syntax";

export default async () => {
  const file = await parse("echo hi");
  return { statements: file.stmts.length };
};
