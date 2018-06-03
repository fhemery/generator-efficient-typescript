import * as fs from "fs";
import * as path from "path";

export class TestHelpers {
  public static assertFileExists(filePath): boolean {
    return fs.existsSync(path.resolve("./", filePath));
  }

  public static doesFileContain(filePath: string, text: string): boolean {
    if (!this.assertFileExists(filePath)) {
      return false;
    }
    return (
      fs
        .readFileSync(filePath)
        .toString()
        .indexOf(text) > -1
    );
  }
}
