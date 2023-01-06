export function extractErrors(e) {
  if (e) {
    if (e.msgs) {
      return e.msgs;
    } else if (e.response && e.response.data && e.response.data.msgs) {
      return e.response.data.msgs;
    } else if (e.message) {
      return {
        status: e.status,
        '*': e.message,
      };
    }
  }

  return {};
}

export function extractGlobalError(e) {
  if (e) {
    if (e.msgs) {
      return e.msgs;
    } else if (e.response && e.response.data && e.response.data.msgs) {
      return e.response.data.msgs['*'] || e.response.data.msg || e.message;
    } else if (e.message) {
      return e.message;
    }
  }

  return {};
}
