import { createHash } from 'crypto';
import an14 from '@mmstudio/an000014';
import { v4 } from 'uuid';

const db = 'sys';

/**
 * 用户注册
 */
export default async function user_regist(user: string, password: string, info: object) {
	if (!user) {
		throw new Error('user could not be empty.');
	}
	if (!password) {
		throw new Error('password could not be empty.');
	}
	const [ret] = await an14<{ cnt: string }>(db, [`select count(id) as cnt from user_auths where identity_type='usercode' and identifier='${user}'`, []]);
	if (ret[0].cnt !== '0') {
		throw new Error('user exists.');
	}
	const userid = v4();
	await an14(db, [`insert into user_auths (id,user_id,identity_type,identifier,credential) values ('${v4()}','${userid}','usercode','${user}','${md5(password)}')`, []], [`insert into users (id,info) values('${userid}','${JSON.stringify(info)}')`, []]);
}

/**
 * md5加密
 * @param algorithm 算法 md5
 * @see 文档：<http://nodejs.cn/api/crypto.html#crypto_crypto_createhash_algorithm_options>
 * @param content 内容
 */
function md5(content: string) {
	return createHash('md5').update(content).digest('hex');
}
