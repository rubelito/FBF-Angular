const PROXY_CONFIG = [
    {
        context: [
            "/maintenance",
            "/account",
            "/item",
            "/history",
            "/dr",
            "/returnhistory"
        ],
        target: "http://192.168.232.133:81",
        secure: false
    }
]

module.exports = PROXY_CONFIG;