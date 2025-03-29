module.export = {
    preset: [
        {
            '@babel/preset-env',
            {
                useBuiltIns: 'usage',
                corejs: '3.0'
            }
        }
    ]
};

function()