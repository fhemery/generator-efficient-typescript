import * as fs from "fs";
import * as path from "path";
import * as helpers from "yeoman-test";
import { TestHelpers } from "./test-helpers/test-helper";

describe("App generator", () => {
  describe("Default configuration", () => {
    beforeEach(() => {
      return helpers.run(path.join(__dirname, "../generators/app")).inTmpDir();
    });

    it("should be a npm module with a package.json", () => {
      expect(TestHelpers.assertFileExists("package.json")).toBe(true);
    });

    it("should contain and index.ts file", () => {
      expect(TestHelpers.assertFileExists("src/index.ts")).toBe(true);
    });

    describe("regarding setup details", () => {
      let packageJson;

      beforeEach(() => {
        packageJson = JSON.parse(fs.readFileSync("package.json").toString());
      });
      describe("typescript setup", () => {
        it("should install Typescript as a Dev dependency", () => {
          expect(packageJson.devDependencies.typescript).toBe("^2.8.3");
        });

        it("should have a tsconfig.json", () => {
          expect(TestHelpers.assertFileExists("tsconfig.json")).toBe(true);
        });

        it("should contain a start script", () => {
          expect(packageJson.scripts.start).toContain("tsc");
          expect(packageJson.scripts.start).toContain("node build/index.js");
        });
      });

      describe("linting setup", () => {
        it("should install types as a dev dependency", () => {
          expect(packageJson.devDependencies["@types/node"]).toBe("^10.1.4");
        });

        it("should install tslint", () => {
          expect(packageJson.devDependencies.tslint).toBe("^5.10.0");
        });

        it("should have a tslint file", () => {
          expect(TestHelpers.assertFileExists("tslint.json")).toBe(true);
        });

        describe("configuration file", () => {
          let tslint;
          beforeEach(() => {
            tslint = JSON.parse(fs.readFileSync("tslint.json").toString());
          });

          it("should inherit from recommended", () => {
            expect(tslint.extends.length).toBe(1);
            expect(tslint.extends[0]).toBe("tslint:recommended");
          });

          it("should deactivate the rule about console", () => {
            expect(tslint.rules["no-console"]).toBe(false);
          });
        });
      });

      describe("unit test setup", () => {
        it("should install @types/jest to help the linter", () => {
          expect(packageJson.devDependencies["@types/jest"]).toBe("^22.2.3");
        });

        it("should install jest and ts-jest as a Dev dependency", () => {
          expect(packageJson.devDependencies.jest).toBe("^22.4.4");
          expect(packageJson.devDependencies["ts-jest"]).toBe("^22.4.6");
        });

        it("should add some transformation regarding jest in package.json", () => {
          expect(packageJson.jest).not.toBeNull();
        });

        it("should contain an index.spec.ts file", () => {
            expect(TestHelpers.assertFileExists("src/index.spec.ts")).toBe(true);
        });

        it("should contain a jest command", () => {
          expect(packageJson.scripts.test).toBe("jest");
        });
      });

      describe("git setup", () => {
        it("should have a .gitignore file", () => {
            expect(TestHelpers.assertFileExists(".gitIgnore")).toBe(true);
        });

        it("should ignore node_modules", () => {
            expect(TestHelpers.doesFileContain(".gitignore", "node_modules/")).toBe(true);
        });

        it("should ignore build folder as well", () => {
            expect(TestHelpers.doesFileContain(".gitignore", "build/")).toBe(true);
        });
      });
    });
  });
});
