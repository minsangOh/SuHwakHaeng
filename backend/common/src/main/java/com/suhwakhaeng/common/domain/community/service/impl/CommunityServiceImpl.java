package com.suhwakhaeng.common.domain.community.service.impl;

import com.suhwakhaeng.common.domain.community.dto.CommunityCreateRequest;
import com.suhwakhaeng.common.domain.community.dto.CommunityDetailResponse;
import com.suhwakhaeng.common.domain.community.dto.CommunitySearchRequest;
import com.suhwakhaeng.common.domain.community.dto.CommunityListResponse;
import com.suhwakhaeng.common.domain.community.entity.Community;
import com.suhwakhaeng.common.domain.community.repository.CommunitiyRepository;
import com.suhwakhaeng.common.domain.community.service.CommunityService;
import com.suhwakhaeng.common.domain.user.entity.User;
import com.suhwakhaeng.common.domain.user.exception.UserException;
import com.suhwakhaeng.common.domain.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

import static com.suhwakhaeng.common.domain.user.exception.UserErrorCode.*;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class CommunityServiceImpl implements CommunityService {
    private final CommunitiyRepository communitiyRepository;
    private final UserRepository userRepository;

    @Transactional
    @Override
    public Long createCommunity(Long userId, CommunityCreateRequest request) {
        Community community = request.toEntity();
        User writer = userRepository.findById(userId)
                .orElseThrow(() -> new UserException(NOT_EXIST_USER));

        community = community.toBuilder()
                .writer(writer)
                .build();

        communitiyRepository.save(community);
        return community.getId();
    }

    @Override
    public List<CommunityListResponse> selectCommunity(Long userId, CommunitySearchRequest request) {
        return communitiyRepository.searchCommunity(userId, request);
    }

    @Override
    public CommunityDetailResponse selectCommunityDetail(Long userId, Long communityId) {
        return communitiyRepository.selectCommunity(userId, communityId);
    }
}
