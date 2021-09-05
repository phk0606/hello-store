function saveAccessTokenToCookie(value) {
  document.cookie = `ecomm_accessToken=${value}` + ';path=/';
}

function saveRefreshTokenToCookie(value) {
  document.cookie = `ecomm_refreshToken=${value}` + ';path=/';
}

function saveUserToCookie(value) {
  document.cookie = `ecomm_user=${value}` + ';path=/';
}

function getAccessTokenFromCookie() {
  return document.cookie.replace(
    /(?:(?:^|.*;\s*)ecomm_accessToken\s*=\s*([^;]*).*$)|^.*$/,
    '$1',
  );
}

function getRefreshTokenFromCookie() {
  return document.cookie.replace(
    /(?:(?:^|.*;\s*)ecomm_refreshToken\s*=\s*([^;]*).*$)|^.*$/,
    '$1',
  );
}

function getUserFromCookie() {
  return document.cookie.replace(
    /(?:(?:^|.*;\s*)ecomm_user\s*=\s*([^;]*).*$)|^.*$/,
    '$1',
  );
}

function deleteCookie(value) {
  document.cookie = `${value}=; expires=Thu, 01 Jan 1970 00:00:01 GMT;`;
}

export {
  saveAccessTokenToCookie,
  saveRefreshTokenToCookie,
  saveUserToCookie,
  getAccessTokenFromCookie,
  getRefreshTokenFromCookie,
  getUserFromCookie,
  deleteCookie,
};
