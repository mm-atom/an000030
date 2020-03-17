const test = require('ava');

const { default: a } = require('../dist/index');

test('用户编号注册', async (t) => {
	const user = 'taoqiufeng';
	const password = 'taoqf001';
	const info = {
		nickname: 'taoqf',
		email: 'taoqiufeng@ifeidao.com',
		phone: '18937139411'
	};
	await a(user, password, info);
	t.pass();
});
