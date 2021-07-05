module.exports = function(config) {
  config.set({
    mutator: "javascript",
    packageManager: "npm",
    reporters: ["html", "clear-text", "progress", "dashboard"],
    testRunner: "jest",
    transpilers: [],
    coverageAnalysis: "off",
    mutate: [
      'src/**/*.js',
      '!src/__tests__/*.js',
      '!src/**/*@(.test|.spec|Spec).js?(x)',
      '!src/registerServiceWorker.js',
      '!src/index.js',
      '!src/synchronization.js',
      '!src/store.js',
      '!src/config.js',
      '!src/setupTests.js'
    ],
    jest: {
      projectType: 'react',
    }
  });
};
