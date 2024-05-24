package com.uri.progweb.userdep.entities;

import jakarta.persistence.*;
import java.util.Date;

@Entity
@Table(name = "tb_tarefa")
public class Tarefa {

    @Id // Diz que esse campo é a chave primária do banco
    @GeneratedValue(strategy = GenerationType.IDENTITY) // é uma forma de gerar os IDs
    private Long id;

    private String descricao;

    private Date Criacao;

    private String Limite; // Alteração para String

    private boolean finalizada;

    public Tarefa() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDescricao() {
        return descricao;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public Date getCriacao() {
        return Criacao;
    }

    public void setCriacao(Date criacao) {
        Criacao = criacao;
    }

    // Alteração do tipo de retorno para String
    public String getLimite() {
        return Limite;
    }

    // Alteração do tipo do parâmetro para String
    public void setLimite(String limite) {
        Limite = limite;
    }

    public boolean isFinalizada() {
        return finalizada;
    }

    public void setFinalizada(boolean finalizada) {
        this.finalizada = finalizada;
    }
}
