package com.testeFoody.rastrear_pedido.exception;

public class PedidoNaoEncontradoException extends RuntimeException{

    public PedidoNaoEncontradoException(String mensagem) {
        super(mensagem);
    }
}
