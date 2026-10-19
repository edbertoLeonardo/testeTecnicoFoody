package com.testeFoody.rastrear_pedido.controller;

import com.testeFoody.rastrear_pedido.dto.UserDTO;
import com.testeFoody.rastrear_pedido.model.User;
import com.testeFoody.rastrear_pedido.service.UserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/register")
    public ResponseEntity<User> registar(@RequestBody @Valid UserDTO dto) {
        User novoUser = userService.registar(dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(novoUser);
    }
}