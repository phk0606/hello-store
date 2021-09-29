function saveAccessTokenToCookie(value) {
  document.cookie = `ecomm_accessToken=${value}` + ';path=/';
}

function saveRefreshTokenToCookie(value) {
  document.cookie = `ecomm_refreshToken=${value}` + ';path=/';
}

function saveUserToCookie(value) {
  document.cookie = `ecomm_user=${value}` + ';path=/';
}

function saveAuthorityToCookie(value) {
  document.cookie = `ecomm_authority=${value}` + ';path=/';
}

function saveCartProductCountToCookie(value) {
  document.cookie = `ecomm_cartProductCount=${value}` + ';path=/';
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

function getAuthorityFromCookie() {
  return document.cookie.replace(
    /(?:(?:^|.*;\s*)ecomm_authority\s*=\s*([^;]*).*$)|^.*$/,
    '$1',
  );
}

function getCartProductCountFromCookie() {
  return document.cookie.replace(
    /(?:(?:^|.*;\s*)ecomm_cartProductCount\s*=\s*([^;]*).*$)|^.*$/,
    '$1',
  );
}

function deleteCookie(value) {
  document.cookie = `${value}=; expires=Thu, 01 Jan 1970 00:00:01 GMT;path=/;`;
}

export {
  saveAccessTokenToCookie,
  saveRefreshTokenToCookie,
  saveUserToCookie,
  saveAuthorityToCookie,
  saveCartProductCountToCookie,
  getAccessTokenFromCookie,
  getRefreshTokenFromCookie,
  getUserFromCookie,
  deleteCookie,
  getAuthorityFromCookie,
  getCartProductCountFromCookie,
};
