package com.suhwakhaeng.common.domain.community.service.impl;

import com.suhwakhaeng.common.domain.community.dto.*;
import com.suhwakhaeng.common.domain.community.entity.Community;
import com.suhwakhaeng.common.domain.community.entity.CommunityLike;
import com.suhwakhaeng.common.domain.community.entity.CommunityLikePK;
import com.suhwakhaeng.common.domain.community.exception.CommunityErrorCode;
import com.suhwakhaeng.common.domain.community.exception.CommunityException;
import com.suhwakhaeng.common.domain.community.repository.CommunityRepository;
import com.suhwakhaeng.common.domain.community.repository.CommunityCommentRepository;
import com.suhwakhaeng.common.domain.community.repository.CommunityLikeRepository;
import com.suhwakhaeng.common.domain.community.service.CommunityService;
import com.suhwakhaeng.common.domain.user.entity.User;
import com.suhwakhaeng.common.domain.user.exception.UserErrorCode;
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
    private final CommunityRepository communityRepository;
    private final CommunityLikeRepository likeRepository;
    private final CommunityCommentRepository commentRepository;
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

        communityRepository.save(community);
        return community.getId();
    }

    @Override
    public List<CommunityListResponse> selectCommunity(Long userId, CommunitySearchRequest request) {
        return communityRepository.searchCommunity(userId, request);
    }

    @Override
    public CommunityDetailResponse selectCommunityDetail(Long userId, Long communityId) {
        return communityRepository.selectCommunityDetail(userId, communityId);
    }

    @Transactional
    @Override
    public void createCommunityLike(Long userId, Long communityId) {
        Community community = communityRepository.findById(communityId).orElseThrow(() -> new CommunityException(CommunityErrorCode.NOT_EXIST_COMMUNITY));
        User user = userRepository.findById(userId).orElseThrow(() -> new UserException(UserErrorCode.NOT_EXIST_USER));

        likeRepository.save(
                CommunityLike.builder()
                        .communityLikePK(new CommunityLikePK(user, community))
                        .build());
    }

    @Transactional
    @Override
    public void deleteCommunityLike(Long userId, Long communityId) {
        Community community = communityRepository.findById(communityId).orElseThrow(() -> new CommunityException(CommunityErrorCode.NOT_EXIST_COMMUNITY));
        User user = userRepository.findById(userId).orElseThrow(() -> new UserException(UserErrorCode.NOT_EXIST_USER));

        likeRepository.delete(
                CommunityLike.builder()
                        .communityLikePK(new CommunityLikePK(user, community))
                        .build());
    }

    @Transactional
    @Override
    public void updateCommunity(Long userId, Long communityId, CommunityUpdateRequest request) {
        Community community = communityRepository.findById(communityId).orElseThrow(() -> new CommunityException(CommunityErrorCode.NOT_EXIST_COMMUNITY));
        if (!community.getWriter().getId().equals(userId)) {
            throw new CommunityException(CommunityErrorCode.NOT_MATCH_USER);
        }

        community.update(request.toEntity());
    }

    @Transactional
    @Override
    public void deleteCommunity(Long userId, Long communityId) {
        Community community = communityRepository.findById(communityId)
                .orElseThrow(() -> new CommunityException(CommunityErrorCode.NOT_EXIST_COMMUNITY));
        if (!community.getWriter().getId().equals(userId)) {
            throw new CommunityException(CommunityErrorCode.NOT_MATCH_USER);
        }

        likeRepository.deleteByCommunityId(communityId);
        commentRepository.deleteByCommunityId(communityId);
        communityRepository.delete(community);
    }

    @Override
    public List<CommunityListResponse> selectMyCommunity(Long userId, Long lastId) {
        return communityRepository.selectMyCommunity(userId, lastId);
    }
}
