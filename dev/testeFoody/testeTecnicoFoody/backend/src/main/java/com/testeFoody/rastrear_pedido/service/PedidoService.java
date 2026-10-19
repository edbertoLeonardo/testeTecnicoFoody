package com.testeFoody.rastrear_pedido.service;

import com.testeFoody.rastrear_pedido.dto.PedidoDTO;
import com.testeFoody.rastrear_pedido.enums.StatusPedido;
import com.testeFoody.rastrear_pedido.exception.PedidoNaoEncontradoException;
import com.testeFoody.rastrear_pedido.model.ItemPedido;
import com.testeFoody.rastrear_pedido.model.Pedido;
import com.testeFoody.rastrear_pedido.model.User;
import com.testeFoody.rastrear_pedido.repository.PedidoRepository;
import com.testeFoody.rastrear_pedido.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;


import java.util.List;
import java.util.stream.Collectors;

@Service
public class PedidoService {

    @Autowired
    private PedidoRepository pedidoRepository;

    @Autowired
    private UserRepository userRepository;

    public Pedido criarPedido(PedidoDTO dto) {

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName();
        User cliente = userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new RuntimeException("Usuário autenticado não encontrado")
                );

        Pedido pedido = new Pedido();
        pedido.setCliente(cliente);
        pedido.setEnderecoEntrega(dto.getEnderecoEntrega());
        pedido.setStatus(StatusPedido.RECEBIDO);

        List<ItemPedido> itens = dto.getItens().stream()
                .map(itemDto -> {
                    ItemPedido item = new ItemPedido();
                    item.setNomeProduto(itemDto.getNomeProduto());
                    item.setQuantidade(itemDto.getQuantidade());
                    item.setPedido(pedido);
                    return item;
                })
                .collect(Collectors.toList());

        pedido.setItens(itens);

        return pedidoRepository.save(pedido);
    }

    public List<Pedido> listarTodos() {
        User usuario = getUsuarioAutenticado();
        return pedidoRepository.findByClienteId(usuario.getId());
    }

    public Pedido buscarPorId(Long id) {
        User usuario = getUsuarioAutenticado();
        return pedidoRepository.findByIdAndClienteId(id, usuario.getId())
                .orElseThrow(() ->
                        new PedidoNaoEncontradoException("Pedido não encontrado com o ID: " + id)
                );
    }


    @Transactional
    public Pedido atualizarStatus(Long id, StatusPedido novoStatus) {
        Pedido pedido = buscarPorId(id);
        pedido.setStatus(novoStatus);
        return pedidoRepository.save(pedido);
    }

    private User getUsuarioAutenticado() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName();
        return userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new RuntimeException("Usuário autenticado não encontrado")
                );
    }
}