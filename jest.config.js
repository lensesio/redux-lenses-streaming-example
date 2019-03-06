module.exports = {
  setupFiles: ['<rootDir>/config/setup-enzyme.js'],
  modulePaths: ['<rootDir>/src'],
  moduleDirectories: ['node_modules'],
  testRegex: '(\\.(test|spec))\\.(jsx|js)$',
  moduleFileExtensions: ['js', 'jsx', 'json', 'node'],
  modulePathIgnorePatterns: ['<rootDir>/.*/__mocks__']
};
