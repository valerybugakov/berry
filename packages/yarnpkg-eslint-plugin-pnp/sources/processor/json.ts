import semver           from "semver";
import * as jsonService from "vscode-json-languageservice";
import {
  ASTNode,
  Diagnostic,
  ObjectASTNode,
  PropertyASTNode,
} from "vscode-json-languageservice";

interface CodeBlock {
  text: string;
  filename: string;
}

interface JSONDocument {
  root?: ASTNode;
  syntaxErrors?: Diagnostic[];
}

var jsonServiceHandle = jsonService.getLanguageService({});
jsonServiceHandle.configure({
  validate: false,
});

/** [dependencyName, version] */
type Dependency = [string, string];

interface DependencyNode {
  node: PropertyASTNode;
  dependency: Dependency;
}

const getDependencyNodes = (
  type:
  | "dependencies"
  | "devDependencies"
  | "peerDependencies"
  | "optionalDependencies",
  packageJSONAST: ObjectASTNode
): DependencyNode[] => {
  try {
    const dependencyNode = packageJSONAST.properties.find(
      prop => prop.keyNode.value === type
    );

    if (
      dependencyNode &&
      dependencyNode.valueNode &&
      dependencyNode.valueNode.type === "object"
    ) {
      const deps = dependencyNode.valueNode.properties.reduce(
        (depsAcc: DependencyNode[], nextDep: PropertyASTNode): DependencyNode[] => {
          // Only resolve fully formed dependencies
          if (
            nextDep.keyNode &&
            nextDep.valueNode &&
            nextDep.valueNode.type === "string" &&
            semver.valid(nextDep.valueNode.value)
          ) {
            depsAcc.push({
              node: nextDep,
              dependency: [nextDep.keyNode.value, nextDep.valueNode.value],
            });
          }
          return depsAcc;
        },
        []
      );
      return deps;
    }
  } catch (err) {
  }
  return [];
};

function resolveModuleFromPackageJSON(dependency: string, pathToPackageJson: string) {
  try {
    return require.resolve(dependency, {paths: [pathToPackageJson]});
  } catch (error) {
    return undefined;
  }
}

function resolvePeerDependecies(pathToPackageJson: string, peerDependencies: string[]) {
  return peerDependencies.map(depName => ({
    depName,
    path: resolveModuleFromPackageJSON(depName, pathToPackageJson),
  }));
}

// Jump out if the filename isn't package.json
// Parse the package json file to get the top level packages and their nodes
// -> If error then return message sorry couldn't parse package.json like the import plugin
// Get the dependency nodes, devDependency nodes, peerDepdency nodes
// -> If has no dependencies || devDependencies || peerDependencies then return nul

// Get dependencies into a list
// If no dependencies
// -> return []
// Else for each [...dependency, ...devDepdendency, ...peerDependency]
// dependencies.map(dep => getMissingPeerDependencyErrors(dep)))
// for each peerDependencies createRequire(pathToPackageJsonBeingLinted)
// Loop over peerDependencies with `.resolve('${dependencyName}/package.json')
// Return error message if can't resolve the peerDependency
// {
//   ruleId,
//   severity,
//   message,
//   line,
//   column,
//   endLine,
//   endColumn,
//   source
// }

// function checkDependency(dep: Dependency, fileName: string) {
//   // for each
//   try {
//     createRequire(pathToPackageJsonBeingLinted)(
//       "${dependencyName}/package.json"
//     );
//     const _require = createRequire(`${fileName}/package.json`);
//     JSON.parse();
//   } catch (error) {}
// }

// function getErrors(deps: DependencyNode[], fileName: string) {}

// let errors;

export function preprocess(text: string, fileName: string): Dependency[] {
  if (!fileName.includes("package.json")) return [];

  const packageJSON = jsonService.TextDocument.create(
    fileName,
    "json",
    1,
    text
  );
  const parsed: JSONDocument = jsonServiceHandle.parseJSONDocument(packageJSON);
  // let deps: DependencyNode[];
  // let devDeps: DependencyNode[];
  let peerDeps: DependencyNode[] = [];
  if (parsed.root && parsed.root.type === "object")
    // deps = getDependencyNodes("dependencies", parsed.root);
    // devDeps = getDependencyNodes("devDependencies", parsed.root);
    peerDeps = getDependencyNodes("peerDependencies", parsed.root);


  // let depErrors = getErrors(deps, fileName);

  return peerDeps.map(dep => dep.dependency);
}

export function postprocess(_messages, fileName) {
  return require.resolve("no-deps", {paths:[fileName]});
}
