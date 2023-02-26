module.exports = {
    presets: [
        ['@babel/preset-env', { targets: { node: 'current' } }],
        '@babel/preset-typescript'
    ],
    plugins: [
        ['module-resolver', {
            alias: {
                "@Modules": "./src/Modules",
                "@Shared": "./src/Shared"
            }
        }],
        "babel-plugin-transform-typescript-metadata",
        ["@babel/plugin-proposal-decorators", { "legacy": true }],
        ["@babel/plugin-proposal-class-properties", { "loose": true }],
    ],
}