# 人生系统加密发布

`system.html` 是 StatiCrypt 3.5.4 生成的加密文件，原网址保持不变。没有密码只能看到解锁页；勾选“记住此设备”后，同一浏览器再次访问会自动解锁。页内“锁定”按钮清除该页凭据并回到解锁界面，不清除主题偏好。

公开仓库仅保存密文、公开随机盐和无内容的解锁模板。密码及派生解锁凭据不得提交、写入日志、加入 URL 或公开文档。明文编辑稿必须在仓库之外保存；加密文件本身可用密码恢复完整编辑稿，无需在公开仓库另存明文备份。

## 更新流程

需要 Node.js 16+。以下命令在仓库根目录执行；密码在本机提示中输入，勿用 `-p` 放进命令或 shell 历史。可以从私有密码管理器设置 `STATICRYPT_PASSWORD`，但不得提交 `.env`。

1. 解密至仓库之外的私人工作目录：

```sh
npx --yes staticrypt@3.5.4 system.html --decrypt --config tools/privacy/staticrypt.json -d ../life-system-private
```

2. 编辑 `../life-system-private/system.html`，保留锁定控件、锁定脚本及现有主题/导航功能。
3. 重新加密至公开发布文件：

```sh
npx --yes staticrypt@3.5.4 ../life-system-private/system.html --config tools/privacy/staticrypt.json -t tools/privacy/login-template.html --remember 0 -d .
node tools/privacy/check.cjs
```

4. 先实际验证错误密码无法解锁、正确密码成功、记住后刷新成功及锁定回到入口，再提交密文 `system.html`。检查差异，禁止提交私人工作目录或密码文件。

保持密码和 `tools/privacy/staticrypt.json` 中的盐不变，更新页面不会使已记住的设备失效。若更换密码，或怀疑凭据泄露，重新加密并生成新的随机盐；旧设备会回到解锁界面。此措施无法撤回别人已经拿到的旧密文及旧密码。

## 安全边界与历史状态

本页是浏览器端内容加密，不是服务器账号权限系统。公开端仍会提供密文，故必须使用长随机独立密码。记住设备会在当前域名的 localStorage 中保存可用于解密的派生凭据；同域脚本及能使用该浏览器的人可能读取它。不要加载不可信第三方脚本；不要在共用设备上开启记住设备。

**部署加密不代表旧内容已从公开历史消失。** 2026-10-08 检查时，33 个分支保留旧版明文 `system.html`，早期 `index.html` 含系统板块，已删除的 `opus.html` 历史也曾整合系统内容。历史隐私收尾尚未完成。

建议完成仓库层隔离：保留当前完整记录为私有存档，重新建立同名公开发布仓库，仅导入当前已检查的发布文件、不导入旧 `.git` 历史；继续启用该同名仓库的 Pages。原网址可保持不变。当前 GitHub 工具不提供仓库重命名/私有化/新建操作，需用户或获准的浏览器操作接续。重建前复核分叉状态；已经被下载或独立保留的副本无法撤回。不得在此步骤完成前声称旧人生系统已经全面私密。

不擅自加密其他独立理论页面；哪些内容应公开由用户另行决定。

StatiCrypt 项目及 MIT 许可见 https://github.com/robinmoisson/staticrypt ，许可证同时包含在模板及生成页面注释中。
