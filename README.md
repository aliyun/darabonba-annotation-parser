# Darabonba Annotation Parser

[![NPM version][npm-image]][npm-url]
[![build status][travis-image]][travis-url]
[![codecov][cov-image]][cov-url]
[![David deps][david-image]][david-url]
[![npm download][download-image]][download-url]

[npm-image]: https://img.shields.io/npm/v/@darabonba/typescript-generator.svg?style=flat-square
[npm-url]: https://npmjs.org/package/@darabonba/typescript-generator
[travis-image]: https://img.shields.io/travis/aliyun/darabonba-typescript-generator.svg?style=flat-square
[travis-url]: https://travis-ci.org/aliyun/darabonba-typescript-generator
[cov-image]: https://codecov.io/gh/aliyun/darabonba-typescript-generator/branch/master/graph/badge.svg
[cov-url]: https://codecov.io/gh/aliyun/darabonba-typescript-generator
[david-image]: https://img.shields.io/david/aliyun/darabonba-typescript-generator.svg?style=flat-square
[david-url]: https://david-dm.org/aliyun/darabonba-typescript-generator
[download-image]: https://img.shields.io/npm/dm/@darabonba/typescript-generator.svg?style=flat-square
[download-url]: https://npmjs.org/package/@darabonba/typescript-generator

## 安装

Darabonba Annotation Parser 只能在 Node.js 环境下运行。建议使用 [NPM](https://www.npmjs.com/) 包管理工具安装。在终端输入以下命令进行安装:

```shell
npm install @darabonba/annotation-parser
```

## 使用说明

支持如下的注解：

```
/**
 * 创建资源栈
 *
 * 通过 POST 方法调用 /stacks 来创建资源栈。
 *
 * ## 说明
 * - 用户指定模板和参数列表创建资源栈。
 * - 模板内容在 HTTP 消息体中提交。
 * - 资源栈名称由用户指定。资源栈创建成功后， ROS 返回资源栈 ID。后续操作以 ID 作为唯一标识。
 * - 资源栈会创建在以用户 ID 为区分的空间下，所以同一个用户在同一个 region 中创建的资源栈名称不能重复。
 * - 资源栈创建成功后，不支持重命名。
 * - 不支持将资源栈转移到另一个用户下。
 * - 需要指定地域 (x-acs-region-id)。
 * - 资源栈中所有资源需要与资源栈在同一地域。
 *
 * 示例
 * 请求示例
 * \`\`\`
 * POST http://ros.aliyuncs.com/stacks HTTP/1.1
 * x-acs-signature-method: HMAC-SHA1
 * Authorization: acs <AccessKeyId>:<signature>
 * Date: Fri, 11 Sep 2015 05:28:47 GMT
 * Content-MD5: 4eCVDLNDI0GRJMiZ6mLmgw==
 * x-acs-signature-version: 1.0
 * Accept: application/octet-stream
 * Content-Type: application/json;charset=utf-8
 * x-acs-version: 2015-09-01
 * Cache-Control: no-cache
 * Pragma: no-cache
 * x-acs-region-id:cn-beijing
 * Host: ros.aliyuncs.com
 * Connection: keep-alive
 * Content-Length: 502
 * {
 *   "Name": "<stack name>",
 *   "Parameters":
 *   {
 *     "key": "value"
 *   },
 *   "Template":<template text>,
 *   "DisableRollback": true,
 *   "TimeoutMins": 15
 * }
 * \`\`\`
 * 返回示例
 * \`\`\`
 * HTTP/1.1 201 Created
 * Date: Fri, 11 Sep 2015 05:28:48 GMT
 * Content-Type: application/json
 * Content-Length: 155
 * Connection: close
 * Access-Control-Allow-Origin: *
 * Access-Control-Allow-Methods: POST, GET, OPTIONS
 * Access-Control-Allow-Headers: X-Requested-With,* X-Sequence, _aop_secret, _aop_signature
 * Access-Control-Max-Age: 172800
 * X-Acs-Request-Id: 14EB3BE2-B4A8-4F84-BD6E-52F222DDB66C
 * Server: Jetty(7.2.2.v20101205)
 * {
 *     "Id":"b44afc3c-46a4-4087-a215-c333a1218316",
 *     "Name":"myStack"
 * }
 * \`\`\`
 *
 * @param regionId 要创建资源栈的地域。参见 Region 列表中 ROS 地域列表。
 * @param stackName 资源栈名称，需符合该正则表达式 ^[a-zA-Z][a-zA-Z0-9_.-]*$。最长度超过 255 个字符。
 * @param stack 资源栈
 * @throws InternalError Server error. 500 服务器端出现未知异常。
 * @throws StackNotFound The Stack (%(stack_name)s) could not be found.  404 资源栈不存在。
 */
```
## 问题反馈

[Opening an Issue](https://github.com/aliyun/darabonba-annotation-parser/issues/new/choose), Issues not conforming to the guidelines may be closed immediately.

## 许可证
[Apache-2.0](/LICENSE)

Copyright (c) 2009-present, Alibaba Cloud All rights reserved.

