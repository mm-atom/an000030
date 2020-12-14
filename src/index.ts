import { createHash } from 'crypto';
import { v4 } from 'uuid';
import an36 from '@mmstudio/an000036';
import anylogger from 'anylogger';

const logger = anylogger('@mmstudio/an000030');

/**
 * 用户注册
 */
export default async function user_regist(type: 'user' | 'phone', user: string, password: string, info: object) {
	logger.debug('user regist', type, user, password, info);
	if (!user) {
		logger.error('user could not be empty.');
		throw new Error('user could not be empty.');
	}
	if (!password) {
		logger.error('password could not be empty.');
		throw new Error('password could not be empty.');
	}
	const [ret] = await an36<{ cnt: bigint }>(['select count(id) as cnt from mm_user_auths where identity_type=$1 and identifier=$2', [type, user]]);
	if (ret[0].cnt !== 0n) {
		logger.error('user exists.', ret[0]);
		throw new Error('user exists.');
	}
	const userid = v4();
	await an36(['insert into mm_user_auths (id,user_id,identity_type,identifier,credential) values ($1,$2,$3,$4,$5)', [v4(), userid, type, user, md5(password)]], ['insert into mm_users (id,info) values($1,$2)', [userid, info]]);
	logger.debug('user regist sccess.', type, user);
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
