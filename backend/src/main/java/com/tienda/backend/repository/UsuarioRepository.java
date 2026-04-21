package com.tienda.backend.repository;

import com.tienda.backend.model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UsuarioRepository extends JpaRepository<Usuario, Long> {
    // Método para validar existencia por email si es necesario
    boolean existsByEmail(String email);
}
