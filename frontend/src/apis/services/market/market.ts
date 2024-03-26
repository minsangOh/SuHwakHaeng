import tokenInstance from '../../utils/tokenInstance';

const marketUrl = 'common/trades';

export const getMarketPostList = async (params: { tradeId: number; keyword: string; cate: string }) => {
  const response = await tokenInstance.get(`${marketUrl}/list?tradeId=${params.tradeId}&keyword=${params.keyword}&cate=${params.cate}`);
  return response.data;
};

export const registMarketPost = async (params: {
  cate: string;
  title: string;
  price: number;
  content: string;
  image1?: string;
  image2?: string;
  image3?: string;
  image4?: string;
  x?: number;
  y?: number;
  roadNameAddress?: string;
}) => {
  const response = await tokenInstance.post(`${marketUrl}`, params);
  return response.data;
};

export const getMarketPostDetail = async (params: { tradeId: number }) => {
  const response = await tokenInstance.get(`${marketUrl}/${params.tradeId}`);
  return response.data;
};

export const deleteMarketPost = async (params: { tradeId: number }) => {
  const response = await tokenInstance.delete(`${marketUrl}/${params.tradeId}`);
  return response.data;
};

export const modifyMarketPost = async (
  params: { tradeId: number },
  data: { cate: string; title: string; price: number; image1?: string; image2?: string; image3?: string; image4?: string; x?: number; y?: number; roadAddressName: string }
) => {
  const reponse = await tokenInstance.patch(`${marketUrl}/${params.tradeId}`, data);
  return reponse.data;
};

export const getIsLiked = async (params: { tradeId: number }) => {
  const response = await tokenInstance.get(`${marketUrl}/like/${params.tradeId}`);
  return response.data;
};

export const updateIsLiked = async (params: { tradeId: number }) => {
  const response = await tokenInstance.post(`${marketUrl}/like/${params.tradeId}`);
  return response.data;
};

export const deleteIsLiked = async (params: { tradeId: number }) => {
  const response = await tokenInstance.delete(`${marketUrl}/like/${params.tradeId}`);
  return response.data;
};