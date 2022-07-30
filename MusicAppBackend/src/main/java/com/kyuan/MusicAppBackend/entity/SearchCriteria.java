package com.kyuan.MusicAppBackend.entity;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SearchCriteria {
        private String key;
        private String operation;
        private Object value;

        public SearchCriteria(String key, Object value) {
                this.key = key;
                this.operation = "=";
                this.value = value;
        }
}
