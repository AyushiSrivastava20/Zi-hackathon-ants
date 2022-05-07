const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    plugins: [
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: 'manifest.json',
                    to: 'manifest.json',
                    transform(content, path) {
                        return modifyManifestJson(content);
                    },
                }
            ],
        }),
    ],
};

const modifyManifestJson = function (buffer) {
    const manifest = JSON.parse(buffer.toString());
    manifest.name = "Zi-Hackathon Ants";
    // pretty print to JSON with two spaces
    return JSON.stringify(manifest, null, 2);
};
