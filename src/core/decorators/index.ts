import { AxiosError } from "axios";
import { HandlerFunction } from "@/@types";
import { BaseModule } from "@/modules";

export function Catch(handler?: HandlerFunction<any>) {
  return (_target: any, _key: string, descriptor: PropertyDescriptor) => {
    const method = descriptor.value as Function;

    descriptor.value = async function(...args: any[]) {
      try {
        const result = await method.apply(this, args);
        return result;
      } catch (error) {
        if (!handler) return;

        return await handler.apply(this, [error, ...args]);
      }
    };
  };
}

export function CatchSync(handler?: HandlerFunction<any>) {
  return (_target: any, _key: string, descriptor: PropertyDescriptor) => {
    const method = descriptor.value as Function;

    descriptor.value = function(...args: any[]) {
      try {
        const result = method.apply(this, args);
        return result;
      } catch (error) {
        if (!handler) return;

        return handler.apply(this, [error, ...args]);
      }
    };
  };
}

export const ApiCatch = Catch((e: AxiosError) => e.response?.data);

export function SetLoading() {
  return (_target: any, _key: string, descriptor: PropertyDescriptor) => {
    const method = descriptor.value as Function;

    descriptor.value = async function(...args: any[]) {
      try {
        BaseModule.setLoadingStatus(true);
        const result = await method.apply(this, args);
        return result;
      } finally {
        BaseModule.setLoadingStatus(false);
      }
    };
  };
}

export function SetLoadingSync() {
  return (_target: any, _key: string, descriptor: PropertyDescriptor) => {
    const method = descriptor.value as Function;

    descriptor.value = function(...args: any[]) {
      try {
        BaseModule.setLoadingStatus(true);
        const result = method.apply(this, args);
        return result;
      } finally {
        BaseModule.setLoadingStatus(false);
      }
    };
  };
}
