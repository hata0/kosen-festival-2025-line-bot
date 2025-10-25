export const isStatusOk = (res: { status: number }): boolean => {
  return res.status >= 200 && res.status < 300;
};
