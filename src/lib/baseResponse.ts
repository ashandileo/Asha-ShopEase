export function createBaseResponse(
  status: number,
  message: string,
  data?: any
) {
  return {
    status,
    message,
    ...((data && data) || {}),
  };
}
