const { action, assert, utils } = require('api-testing/index');

describe ('Posting and Getting Questions', function () {
    let user = action.getAnon();
    let helpPanelQuestion = utils.title('Help Panel Question ');
    let mentorshipQuestion = utils.title('Mentorship Question ');

    before (async () => {
        //Create an account and login
        user = await user.account('User-');
    });

    it ('should post a question via the help panel successfully', async () => {
        const postResult = await user.action(
            'helppanelquestionposter',
            {
                body: helpPanelQuestion,
                source: helppanel,
                token: await user.token()
            },
            'POST',
        );
        assert.equal(postResult.helppanelquestionposter.result, 'success');

        const getResult = await user.action(
            'homepagequestionstore',
            {
                storage: growthexperiments-helppanel-questions
            }
        );

        assert.equal(getResult.homepagequestionstore.questions[0].questionText, helpPanelQuestion);
    });

    it ('should post a question via the mentorship successfully', async () => {
        const postResult = await user.action(
            'helppanelquestionposter',
            {
                body: mentorshipQuestion,
                source: homepage-mentorship,
                token: await user.token()
            },
            'POST',
        );
        assert.equal(postResult.helppanelquestionposter.result, 'success');

        const getResult = await user.action(
            'homepagequestionstore',
            {
                storage: growthexperiments-mentor-questions
            }
        );

        assert.equal(getResult.homepagequestionstore.questions[0].questionText, mentorshipQuestion);
    });
});
