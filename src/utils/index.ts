//请求成功响应
export function HTTPsuccess(data, msg) {
  return {
    code: 0,
    data,
    msg,
  };
}

//请求失败响应
export function HTTPerror(data, msg) {
  return {
    code: -1,
    data,
    msg,
  };
}
