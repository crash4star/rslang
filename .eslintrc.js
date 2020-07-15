module.exports = {
    "env": {
        "browser": true,
        "es6": true
    },
        "extends": [
            "airbnb-base",
            "prettier"
        ],
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    "parserOptions": {
        "ecmaVersion": 2018,
        "sourceType": "module"
    },
    "rules": {
        "import/no-cycle": "off",
        "no-undef": "off",
        "prefer-destructuring": ["error", {"object": false, "array": false}],
        "no-param-reassign": ["error", { "props": false }],
        "no-plusplus": "off",
        "class-methods-use-this": "off",
        "no-inner-declarations": "off"
    }
};
