package com.lhn.travel.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.lhn.travel.entity.Spot;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

/**
 * <p>
 * Mapper 接口
 * </p>
 *
 * @author lhn
 * @since 2022-03-10
 */
@Mapper
public interface SpotMapper extends BaseMapper<Spot> {

    List findByUser(Integer id);


}
