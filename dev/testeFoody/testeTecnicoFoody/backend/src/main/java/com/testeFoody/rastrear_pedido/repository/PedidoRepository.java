package com.testeFoody.rastrear_pedido.repository;

import com.testeFoody.rastrear_pedido.model.Pedido;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface PedidoRepository extends JpaRepository<Pedido, Long> {

    List<Pedido> findByClienteId(Long clienteId);

    Optional<Pedido> findByIdAndClienteId(Long id, Long clienteId);
}
