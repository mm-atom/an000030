# 用户注册

使用用户名/密码注册用户。

## 注意

需要在配置文件中配置名称为`sys`的数据库(postgres)

```json
{
	"dbs": {
		"sys": {
			"type": "postgres",
			"source": "postgres://mmstudio:Mmstudio123@127.0.0.1:5432/mmstudio"
		}
	}
}
```

## 表结构

表结构和数据库启动脚本见[用户名密码登陆](https://npmjs.com/package/@mmstudio/an000029)

手机号和邮箱可以为空
