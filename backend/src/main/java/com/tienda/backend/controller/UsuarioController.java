package com.tienda.backend.controller;

import com.tienda.backend.model.Usuario;
import com.tienda.backend.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/usuarios")
@CrossOrigin(origins = "*") // Permite conexión temporal desde Frontend en dev
public class UsuarioController {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @PostMapping("/registro")
    public ResponseEntity<?> registrarUsuario(@RequestBody Usuario usuario) {
        // Validación básica
        if (usuario.getEmail() == null || usuario.getPassword() == null) {
            return ResponseEntity.badRequest().body("{\"mensaje\": \"Faltan datos obligatorios\"}");
        }
        if (usuarioRepository.existsByEmail(usuario.getEmail())) {
            return ResponseEntity.badRequest().body("{\"mensaje\": \"El email ya está registrado\"}");
        }

        // Guarda el usuario (sin encriptar, por simplicidad en esta fase)
        Usuario nuevoUsuario = usuarioRepository.save(usuario);
        
        return ResponseEntity.ok("{\"mensaje\": \"Registro exitoso\", \"id\": " + nuevoUsuario.getIdUsuario() + "}");
    }
}
