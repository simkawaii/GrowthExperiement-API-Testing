const { action, assert, utils } = require('api-testing/index');

describe ('Homepage settings', function () {
    let user = action.getAnon();

    before (async () => {
        //Create an account and login
        user = await user.account('User-');
    });

    it ('should be disable successful', async () => {
        const postResult = await user.action(
            'options',
            {
                optionname: growthexperiments-homepage-enable,
                optionvalue: 0,
                token: await user.token()
            },
            'POST',
        );
        assert.equal(postResult.options, 'success');

        const getResult = await user.action(
            'query',
            {
                meta: userinfo,
                uiprop: options
            }
        );

        assert.equal(getResult.query.userinfo.options["growthexperiments-homepage-enable"], 0);
    });

    it ('should be enable successful', async () => {
        const postResult = await user.action(
            'options',
            {
                optionname: growthexperiments-homepage-enable,
                optionvalue: 1,
                token: await user.token()
            },
            'POST',
        );
        assert.equal(postResult.options, 'success');

        const getResult = await user.action(
            'query',
            {
                meta: userinfo,
                uiprop: options
            }
        );

        assert.equal(getResult.query.userinfo.options["growthexperiments-homepage-enable"], 1);
    });

    it ('should be disable as default link successful', async () => {
        const postResult = await user.action(
            'options',
            {
                optionname: growthexperiments-homepage-pt-link,
                optionvalue: 0,
                token: await user.token()
            },
            'POST',
        );
        assert.equal(postResult.options, 'success');

        const getResult = await user.action(
            'query',
            {
                meta: userinfo,
                uiprop: options
            }
        );

        assert.equal(getResult.query.userinfo.options["growthexperiments-homepage-pt-link"], 0);
    });

    it ('should be enable as default link successful', async () => {
        const postResult = await user.action(
            'options',
            {
                optionname: growthexperiments-homepage-pt-link,
                optionvalue: 1,
                token: await user.token()
            },
            'POST',
        );
        assert.equal(postResult.options, 'success');

        const getResult = await user.action(
            'query',
            {
                meta: userinfo,
                uiprop: options
            }
        );

        assert.equal(getResult.query.userinfo.options["growthexperiments-homepage-pt-link"], 1);
    });
});
