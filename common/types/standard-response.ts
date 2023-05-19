

export type StandardResponse<T = undefined> = {
    status: "success" | "error";
    errors?: string[];
    data?: T;
}