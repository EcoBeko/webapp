export enum UserGender {
  MALE = "male",
  FEMALE = "female",
}

export enum UserRole {
  USER = "user",
  MODERATOR = "moderator",
  admin = "admin",
}

export enum GenericStatus {
  ENABLED = "enabled",
  DISABLED = "disabled",
}

export enum PostType {
  ARTICLE = "article",
  POST = "post",
}

export enum AuthorType {
  USER = "user",
  COMMUNITY = "community",
}

export interface IUser {
  id: string;
  first_name?: string;
  last_name?: string;
  username: string;
  gender: UserGender;
  avatar: string;
  role: UserRole;
  status: GenericStatus;
  [key: string]: any;
}

declare module "vue/types/vue" {
  export interface Vue {
    $style: Record<string, string>;
  }
}

export type HandlerFunction<H extends Error = Error> = (
  error: H,
  ...args: any[]
) => any;

export interface ApiMessageObject {
  name___Ru: string;
  name___Kz: string;
  name?: string;
}

/**
 * @description Indexable dictionary type
 */
export type Dictionary = { [key: string]: any };

export interface BaseResponseData {
  message?: string;
}

export type SnackBarColor = "success" | "warning" | "error";

export interface SnackBarPayload {
  show?: boolean;
  message: string;
  color?: SnackBarColor;
  timeout?: number;
}

export interface MessageValue<T> {
  result: T;
  message?: string;
}
