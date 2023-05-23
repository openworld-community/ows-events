export type StandardResponse<T> =
  | {
      type: "success";
      data: T;
    }
  | {
      type: "error";
      errors?: string[];
    };
