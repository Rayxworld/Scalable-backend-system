package com.example.productservice.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;
import java.math.BigDecimal;

@Entity
@Table(name = "products")
@Data
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @NotBlank(message = "Product name is required")
    private String name;

    private String description;

    @Min(value = 0, message = "Price must be positive")
    private BigDecimal price;

    private Integer stockQuantity;
}
