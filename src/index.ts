import * as Generator from "yeoman-generator";

class ProductiveGenerator extends Generator {
  public constructor(args, opts) {
    super(args, opts);
  }

  public writingPackageJson() {
    this._copyWithPathPreservation("package.json");
  }

  public writingTsConfigJson() {
    this._copyWithPathPreservation("tsconfig.json");
  }

  public writingTsLintJson() {
    this._copyWithPathPreservation("tslint.json");
  }

  public writingIndexFile() {
    this._copyWithPathPreservation("src/index.ts");
  }

  public writingGitIgnore() {
    this._copyWithPathPreservation(".gitignore");
  }

  public writingUnitTestRelatedFiles() {
    this._copyWithPathPreservation("src/index.spec.ts");
  }

  public installingTypescript() {
    this.yarnInstall(["typescript"], { dev: true });
  }

  private _copyWithPathPreservation(path) {
    this.fs.copy(this.templatePath(path), this.destinationPath(path));
  }
}

export = ProductiveGenerator;
