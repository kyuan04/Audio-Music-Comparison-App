package com.kyuan.MusicAppBackend.dao;

import com.kyuan.MusicAppBackend.entity.SearchCriteria;
import com.kyuan.MusicAppBackend.entity.UserEntity;
import org.springframework.data.jpa.domain.Specification;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

public class CustomQuerySpecificationBuilder {
    private final List<SearchCriteria> params;

    public CustomQuerySpecificationBuilder() {
        params = new ArrayList<SearchCriteria>();
    }

    public CustomQuerySpecificationBuilder with(String key, Object value) {
        params.add(new SearchCriteria(key, value));
        return this;
    }

    public <T> Specification<T> build() {
        if (params.size() == 0) {
            return null;
        }

        List<Specification> specs = params.stream()
                .map(CustomQuerySpecification::new)
                .collect(Collectors.toList());

        Specification result = specs.get(0);

        for (int i = 1; i < params.size(); i++) {
            result = Specification.where(result).and(specs.get(i));
        }
        return result;
    }
}
