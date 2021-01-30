import { BaseSuccessSchema, BaseFailSchema } from '@/types/model'
import 'reflect-metadata'

export function isObject(val: any): val is object {
  return Object.prototype.toString.call(val) === '[object Object]'
}

export function baseSuccessSchema(data: any): BaseSuccessSchema {
  return {
    status: 1,
    success: true,
    result: data
  }
}

export function baseFailSchema(msg: string | { status: number, message: string }): BaseFailSchema {
  const result = {
    success: false
  }
  if (isObject(msg)) {
    return {
      ...result,
      status: msg.status,
      message: msg.message
    }
  }
  return {
    ...result,
    status: 0,
    message: msg
  }
}

export function genParamsRequiredErr(msg: string = 'username is required') {
  return {
    status: 400,
    message: msg
  }
}
