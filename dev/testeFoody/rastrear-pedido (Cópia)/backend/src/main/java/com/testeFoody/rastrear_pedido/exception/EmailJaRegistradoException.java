package com.testeFoody.rastrear_pedido.exception;

public class EmailJaRegistradoException extends RuntimeException{

    public EmailJaRegistradoException(String mensagem) {
        super(mensagem);
    }
}
