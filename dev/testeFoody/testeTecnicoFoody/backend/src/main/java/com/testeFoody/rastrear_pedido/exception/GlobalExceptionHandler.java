package com.testeFoody.rastrear_pedido.exception;

import com.testeFoody.rastrear_pedido.enums.StatusPedido;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.method.annotation.MethodArgumentTypeMismatchException;

import java.util.Arrays;
import java.util.HashMap;
import java.util.Map;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(RecursoNaoEncontradoException.class)
    public ResponseEntity<Map<String, String>> tratarRecursoNaoEncontrado(
            RecursoNaoEncontradoException ex) {

        Map<String, String> erro = Map.of(
                "erro", ex.getMessage()
        );

        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(erro);
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<Map<String, Object>> tratarErroValidacao(
            MethodArgumentNotValidException ex) {

        Map<String, String> erros = new HashMap<>();

        ex.getBindingResult().getFieldErrors().forEach(erro -> {
            erros.put(erro.getField(), erro.getDefaultMessage());
        });

        Map<String, Object> resposta = new HashMap<>();
        resposta.put("status", HttpStatus.BAD_REQUEST.value());
        resposta.put("erro", "Erro de validação");
        resposta.put("mensagens", erros);

        return ResponseEntity.badRequest().body(resposta);
    }

    @ExceptionHandler(PedidoNaoEncontradoException.class)
    public ResponseEntity<Map<String, String>> tratarPedidoNaoEncontrado(
            PedidoNaoEncontradoException ex) {

        Map<String, String> erro = Map.of(
                "erro", ex.getMessage()
        );

        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(erro);
    }

    @ExceptionHandler(MethodArgumentTypeMismatchException.class)
    public ResponseEntity<Map<String, Object>> tratarErroTipoParametro(
            MethodArgumentTypeMismatchException ex) {

        Map<String, Object> resposta = new HashMap<>();

        resposta.put("status", HttpStatus.BAD_REQUEST.value());
        resposta.put("erro", "Parâmetro inválido");

        if ("novoStatus".equals(ex.getName())) {
            resposta.put(
                    "mensagem",
                    "Status inválido. Informe um dos valores permitidos: "
                            + Arrays.toString(StatusPedido.values())
            );
        } else {
            resposta.put("mensagem", "O valor informado para o parâmetro é inválido");
        }

        return ResponseEntity.badRequest().body(resposta);
    }

    @ExceptionHandler(EmailJaRegistradoException.class)
    public ResponseEntity<Map<String, Object>> tratarEmailJaRegistrado(
            EmailJaRegistradoException ex) {

        Map<String, Object> resposta = new HashMap<>();

        resposta.put("status", HttpStatus.CONFLICT.value());
        resposta.put("erro", "E-mail já registado");
        resposta.put("mensagem", ex.getMessage());

        return ResponseEntity.status(HttpStatus.CONFLICT).body(resposta);
    }

}