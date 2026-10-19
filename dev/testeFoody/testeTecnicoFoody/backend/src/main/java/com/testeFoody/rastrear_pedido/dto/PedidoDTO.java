package com.testeFoody.rastrear_pedido.dto;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;

import java.util.List;

public class PedidoDTO {


    @NotBlank(message = "O endereço de entrega é obrigatório")
    private String enderecoEntrega;

    @NotEmpty(message = "O pedido deve conter pelo menos um item")
    @Valid
    private List<ItemPedidoDTO> itens;

    public PedidoDTO() {}

    public String getEnderecoEntrega() {
        return enderecoEntrega;
    }

    public void setEnderecoEntrega(String enderecoEntrega) {
        this.enderecoEntrega = enderecoEntrega;
    }

    public List<ItemPedidoDTO> getItens() {
        return itens;
    }

    public void setItens(List<ItemPedidoDTO> itens) {
        this.itens = itens;
    }
}
