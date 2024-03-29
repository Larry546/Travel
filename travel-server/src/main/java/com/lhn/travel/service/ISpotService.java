package com.lhn.travel.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.lhn.travel.entity.Spot;

import java.util.List;

/**
 * <p>
 * 服务类
 * </p>
 *
 * @author lhn
 * @since 2022-03-10
 */
public interface ISpotService extends IService<Spot> {

    List findByUser(Integer uid);

}
