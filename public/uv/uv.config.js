/*global Ultraviolet*/
self.__uv$config = {
    prefix: '/p/',
    bare: '/bare/', // if you are using a static host, change to a online/free bare server, like this:  path: "https://example.bare.server/bare/"
    encodeUrl: Ultraviolet.codec.xor.encode,
    decodeUrl: Ultraviolet.codec.xor.decode,
    handler: '/uv/uv.handler.js',
    client: '/uv/uv.client.js',
    bundle: '/uv/uv.bundle.js',
    config: '/uv/uv.config.js',
    sw: '/uv.sw.js',
};
