package com.suhwakhaeng.common.domain.trade.service;

import com.suhwakhaeng.common.domain.trade.dto.*;

import java.util.List;

public interface TradeService {
    TradeCreateResponse createTrade(Long userId, TradeCreateRequest request);
    TradeDetailResponse selectDetailTrade(Long tradeId);
    List<TradeListResponse> selectListTrade(Long userId, TradeSearchRequest tradeSearchRequest);
    void updateTrade(Long userId, Long tradeId, TradeUpdateRequest tradeUpdateRequest);
    void deleteTrade(Long userId, Long tradeId);
    Boolean selectIsLiked(Long userId, Long tradeId);
}