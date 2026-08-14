import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import * as ui from "../src/index";

const root = dirname(fileURLToPath(import.meta.url));

describe("package exports", () => {
  it("exposes the documented public API and not platform internals", () => {
    expect(ui.HubShell).toBeTypeOf("function");
    expect(ui.WeekView).toBeTypeOf("function");
    expect(ui.Navigation).toBeTypeOf("function");
    expect(ui.ActivityCard).toBeTypeOf("function");
    expect(ui.ErrorState).toBeTypeOf("function");
    expect("createPlatform" in ui).toBe(false);
    expect("createClient" in ui).toBe(false);
    expect("loadPackage" in ui).toBe(false);
  });

  it("points the published package at the ESM build and types", () => {
    const pkg = JSON.parse(readFileSync(join(root, "../package.json"), "utf8"));
    expect(pkg.name).toBe("@learning-platform/ui");
    expect(pkg.version).toBe("0.1.0");
    expect(pkg.exports["."].import).toBe("./dist/index.js");
    expect(pkg.exports["."].types).toBe("./dist/index.d.ts");
    expect(pkg.repository.url).toContain("Acerosa/-learning-platform-ui");
    expect(pkg.peerDependencies.react).toMatch(/\^19/);
    expect(readFileSync(join(root, "../dist/index.js"), "utf8")).toMatch(/HubShell/);
  });
});
