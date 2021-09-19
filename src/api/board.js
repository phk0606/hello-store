import { board } from './index';

function getStyleShopListNotice(data) {
  console.log(data.username);
  return board.get(`/${data.username}`);
}

export { getStyleShopListNotice };
