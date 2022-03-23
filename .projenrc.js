const { awscdk } = require('projen');

const PROJECT_NAME = 'cdk-cicd-pipeline-lambda';
const PROJECT_DESCRIPTION = 'CDK Demo for CICD pipeline deploying Lambda.';

const project = new awscdk.AwsCdkTypeScriptApp({
  name: PROJECT_NAME,
  description: PROJECT_DESCRIPTION,
  repository: 'https://github.com/baboopan/cdk-cicd-pipeline-lambda.git',
  authorName: 'Baboo Pan',
  authorEmail: 'lpig0818@gmail.com',
  keywords: ['aws', 'cicd', 'pipeline', 'lambda'],
  release: false,
  stability: 'experimental',
  autoDetectBin: false,
  dependabot: false,
  cdkVersion: '2.17.0',
  // Default release the main branch with major version 2.
  majorVersion: 2,
  defaultReleaseBranch: 'main',
  depsUpgradeOptions: {
    ignoreProjen: false,
    workflowOptions: {
      // The secret default name use  PROJEN_GITHUB_TOKEN, please add your PAT token in this repository secret.
      // ref: https://github.com/projen/projen/blob/e5899dd04a575209424a08fe90bde99e07ac6c7b/src/github/github.ts#L46-L53
      labels: ['auto-approve', 'auto-merge'],
    },
  },
  autoApproveOptions: {
    // deepcode ignore HardcodedNonCryptoSecret: Allow to preform GitHub Actions
    secret: 'GITHUB_TOKEN',
    allowedUsernames: ['baboopan'],
  },
  devDeps: [
    'esbuild',
  ],
  gitignore: [
    '.vscode',
    '.dccache',
    'cdk.out',
    'cdk.context.json',
    'yarn-error.log',
    'coverage',
    'venv',
  ],
});

project.synth();

