package com.lhn.travel.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.lhn.travel.entity.Comment;
import com.lhn.travel.entity.Rate;

import java.util.List;
import java.util.Map;

/**
 * <p>
 * 服务类
 * </p>
 *
 * @author lhn
 * @since 2022-03-10
 */
public interface ICommentService extends IService<Comment> {
    Map getrateBySpot(Integer id);

    List<Rate> getUserRate(Integer userId);
}
