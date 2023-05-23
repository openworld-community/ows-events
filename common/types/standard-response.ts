export type StandardResponse<T> =
  | {
      type: "success";
      status: "success";
      data: T;
    }
  | {
      type: "error";
      status: "error";
      errors?: string[];
    };
