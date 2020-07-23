'use strict';

const expect = require('expect.js');

const { parse } = require('../');

describe('parser', function () {

  it('should error when empty file', function () {
    expect(() => {
      parse('', '__filename');
    }).to.throwException(function (e) { // get the exception object
      expect(e).to.be.a(SyntaxError);
      expect(e.message).to.be(`Unexpected token: EOF. Expect START, but EOF`);
    });
  });

  it('should error when invalid end', function () {
    expect(() => {
      parse('/**', '__filename');
    }).to.throwException(function (e) { // get the exception object
      expect(e).to.be.a(SyntaxError);
      expect(e.message).to.be(`Unexpected token: EOF. expect "@xxx"`);
    });
  });

  it('should ok', function () {
    const anno = `/**
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
    `;
    const ast = parse(anno, '__filename');
    expect(ast).to.be.eql({
      'items': [
        {
          'text': {
            'tag': 3,
            'text': '创建资源栈\n\n通过 POST 方法调用 /stacks 来创建资源栈。\n\n## 说明\n- 用户指定模板和参数列表创建资源栈。\n- 模板内容在 HTTP 消息体中提交。\n- 资源栈名称由用户指定。资源栈创建成功后， ROS 返回资源栈 ID。后续操作以 ID 作为唯一标识。\n- 资源栈会创建在以用户 ID 为区分的空间下，所以同一个用户在同一个 region 中创建的资源栈名称不能重复。\n- 资源栈创建成功后，不支持重命名。\n- 不支持将资源栈转移到另一个用户下。\n- 需要指定地域 (x-acs-region-id)。\n- 资源栈中所有资源需要与资源栈在同一地域。\n\n示例\n请求示例\n```\nPOST http://ros.aliyuncs.com/stacks HTTP/1.1\nx-acs-signature-method: HMAC-SHA1\nAuthorization: acs <AccessKeyId>:<signature>\nDate: Fri, 11 Sep 2015 05:28:47 GMT\nContent-MD5: 4eCVDLNDI0GRJMiZ6mLmgw==\nx-acs-signature-version: 1.0\nAccept: application/octet-stream\nContent-Type: application/json;charset=utf-8\nx-acs-version: 2015-09-01\nCache-Control: no-cache\nPragma: no-cache\nx-acs-region-id:cn-beijing\nHost: ros.aliyuncs.com\nConnection: keep-alive\nContent-Length: 502\n{\n  "Name": "<stack name>",\n  "Parameters":\n  {\n    "key": "value"\n  },\n  "Template":<template text>,\n  "DisableRollback": true,\n  "TimeoutMins": 15\n}\n```\n返回示例\n```\nHTTP/1.1 201 Created\nDate: Fri, 11 Sep 2015 05:28:48 GMT\nContent-Type: application/json\nContent-Length: 155\nConnection: close\nAccess-Control-Allow-Origin: *\nAccess-Control-Allow-Methods: POST, GET, OPTIONS\nAccess-Control-Allow-Headers: X-Requested-With,* X-Sequence, _aop_secret, _aop_signature\nAccess-Control-Max-Age: 172800\nX-Acs-Request-Id: 14EB3BE2-B4A8-4F84-BD6E-52F222DDB66C\nServer: Jetty(7.2.2.v20101205)\n{\n    "Id":"b44afc3c-46a4-4087-a215-c333a1218316",\n    "Name":"myStack"\n}\n```\n\n'
          },
          'attrs': [],
          'type': 'description'
        },
        {
          'name': {
            'id': 'regionId',
            'tag': 5
          },
          'text': {
            'tag': 3,
            'text': '要创建资源栈的地域。参见 Region 列表中 ROS 地域列表。\n'
          },
          'attrs': [],
          'type': 'param'
        },
        {
          'name': {
            'id': 'stackName',
            'tag': 5
          },
          'text': {
            'tag': 3,
            'text': '资源栈名称，需符合该正则表达式 ^[a-zA-Z][a-zA-Z0-9_.-]*$。最长度超过 255 个字符。\n'
          },
          'attrs': [],
          'type': 'param'
        },
        {
          'name': {
            'id': 'stack',
            'tag': 5
          },
          'text': {
            'tag': 3,
            'text': '资源栈\n'
          },
          'attrs': [],
          'type': 'param'
        },
        {
          'text': {
            'tag': 3,
            'text': 'InternalError Server error. 500 服务器端出现未知异常。\n'
          },
          'attrs': [],
          'type': 'throws'
        },
        {
          'text': {
            'tag': 3,
            'text': 'StackNotFound The Stack (%(stack_name)s) could not be found.  404 资源栈不存在。\n'
          },
          'attrs': [],
          'type': 'throws'
        }
      ],
      'type': 'annotation'
    });
  });

  it('should ok with lang/locale', function () {
    const anno = `/**
     * @description[locale=zh_CN] 创建资源栈
     */
    `;
    const ast = parse(anno, '__filename');
    expect(ast).to.be.eql({
      'items': [
        {
          'text': {
            'tag': 3,
            'text': '创建资源栈\n'
          },
          'attrs': [
            {
              'name': {
                'id': 'locale',
                'tag': 5
              },
              'value': {
                'id': 'zh_CN',
                'tag': 5
              }
            }
          ],
          'type': 'description'
        }
      ],
      'type': 'annotation'
    });
  });

  it('should ok with multi-lang/locale', function () {
    const anno = `/**
     * @description[locale=zh_CN, lang=java] 创建资源栈
     */
    `;
    const ast = parse(anno, '__filename');
    expect(ast).to.be.eql({
      'items': [
        {
          'text': {
            'tag': 3,
            'text': '创建资源栈\n'
          },
          'attrs': [
            {
              'name': {
                'id': 'locale',
                'tag': 5
              },
              'value': {
                'id': 'zh_CN',
                'tag': 5
              }
            },
            {
              'name': {
                'id': 'lang',
                'tag': 5
              },
              'value': {
                'id': 'java',
                'tag': 5
              }
            }
          ],
          'type': 'description'
        }
      ],
      'type': 'annotation'
    });
  });

  it('should ok with @error', function () {
    const anno = `/**
     * @error code message
     */
    `;
    const ast = parse(anno, '__filename');
    expect(ast).to.be.eql({
      'items': [
        {
          'text': {
            'tag': 3,
            'text': 'message\n'
          },
          'attrs': [],
          'code': {
            'id': 'code',
            'tag': 5
          },
          'type': 'error'
        }
      ],
      'type': 'annotation'
    });
  });
});
