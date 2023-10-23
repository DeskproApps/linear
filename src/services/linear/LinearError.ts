import type { LinearAPIError } from "./types";

export type InitData = {
  status: number,
  data: LinearAPIError,
};

class LinearError extends Error {
  status: number;
  data: LinearAPIError;

  constructor({ status, data }: InitData) {
    const message = "Linear Api Error";
    super(message);

    this.data = data;
    this.status = status;
  }
}

export { LinearError };
