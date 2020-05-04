const { action, assert, utils } = require('api-testing/index');

describe('Setting mentors', function () {

    const userName = utils.title('User-');
    const mentor1Name = utils.title('Mentor1-');
    const mentor2Name = utils.title('Mentor2-');
    const password = 'abc13579';

    const user = action.getAnon();
    const mentor1 = action.getAnon();
    const mentor2 = action.getAnon();
    const admin = action.getAnon();

    before (async () => {
        await user.createAccount({username: userName, password: password});
        await mentor1.createAccount({username: mentor1Name, password: password});
        await mentor2.createAccount({username: mentor2Name, password: password});

        //Log in Admin account
        await admin.login('Admin', 'vagrant');
    });

    it('should be successful', async () => {
        //Set Mentor1 as the mentor
        const result = await admin.action(
            'growthsetmentor',
            {mentee: userName, mentor: mentor1Name},
            'POST');

        //Verify response status
        assert.equal(result.growthsetmentor.status, 'ok');
        //Verify the mentee
        assert.equal(result.growthsetmentor.mentee, userName);
        //Verify the new mentor
        assert.equal(result.growthsetmentor.newMentor, mentor1Name);
    });

    it('should be changed successfully', async () => {
        //Set Mentor2 as the mentor
        const result = await admin.action(
            'growthsetmentor',
            {mentee: userName, mentor: mentor2Name},
            'POST');

        //Verify response status
        assert.equal(result.growthsetmentor.status, 'ok');
        //Verify the new mentor
        assert.equal(result.growthsetmentor.newMentor, mentor2Name);
        //Verify the old mentor
        assert.equal(result.growthsetmentor.oldMentor, mentor1Name);
    });

});
