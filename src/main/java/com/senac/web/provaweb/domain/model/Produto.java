package com.senac.web.provaweb.domain.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
@Entity
public class Produto {

    @EqualsAndHashCode.Include
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    @Size(max=20)
    private String codigo;

    @NotBlank(message = "O nome é obrigatório.")
    @Size(max = 60)
    private String nome;

    @NotNull
    private double preco;

    @Size(max = 255)
    @NotBlank(message = "A descrição é obrigatória.")
    private String descricao;

    @NotNull
    private int quantidade;

}
